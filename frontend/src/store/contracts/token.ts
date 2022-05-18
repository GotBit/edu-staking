import { ContractTransaction, BigNumber, ethers } from 'ethers'

import type {
  IContractActions,
  IContractState,
  ISigner,
  INotNullSigner,
} from '@/gotbit-tools/vue/types'
import {
  defineContractStore,
  useWeb3,
  isLogin,
  useContracts,
  safeWrite,
  safeRead,
} from '@/gotbit-tools/vue'

export interface ITokenState extends IContractState {
  balance: BigNumber
  allowances: { [spender: string]: boolean }
}
export interface ITokenActions extends IContractActions {
  _approve: (
    spender: string,
    amount: BigNumber,
    signer: INotNullSigner
  ) => Promise<ContractTransaction | null>
  _transfer: (
    user: string,
    amount: BigNumber,
    signer: INotNullSigner
  ) => Promise<ContractTransaction | null>
  _allowance: (owner: string, spender: string) => Promise<BigNumber>
  _balanceOf: (user: string) => Promise<BigNumber>
  hasAllowance: (owner: string, spender: string) => Promise<boolean>
  approveMax: (
    spender: string,
    signer: INotNullSigner
  ) => Promise<ContractTransaction | null>
  approveIf: (owner: string, spender: string, signer: INotNullSigner) => Promise<boolean>
}

export const useToken = defineContractStore<ITokenState, ITokenActions>('token', {
  state: () => ({
    loading: false,
    balance: BigNumber.from(0),
    allowances: {},
  }),
  actions: {
    async loadBefore() {
      return true
    },
    async loadAfter() {
      const web3 = useWeb3()
      if (!isLogin()) return false

      const { staking } = useContracts()
      const spenders: string[] = [staking.address]
      this.loading = true

      this.balance = await this._balanceOf(web3.wallet)

      const preAllowances = await Promise.all(
        spenders.map(async (spender) => ({
          spender,
          allowance: await this.hasAllowance(web3.wallet, spender),
        }))
      )
      preAllowances.forEach(
        ({ spender, allowance }) => (this.allowances[spender] = allowance)
      )

      this.loading = false
      return true
    },
    async approveIf(owner, spender, signer) {
      if (await this.hasAllowance(owner, spender)) return true
      if (await this.approveMax(spender, signer)) {
        this.allowances[spender] = true
        return true
      }
      return false
    },
    async hasAllowance(owner, spender) {
      if (this.allowances[spender]) return true

      const allowance = await this._allowance(owner, spender)
      if (allowance.gte(ethers.constants.MaxUint256.div(2))) return true

      return false
    },
    async approveMax(spender, signer) {
      return this._approve(spender, ethers.constants.MaxUint256, signer)
    },
    async _approve(spender, amount, signer) {
      const { token } = useContracts(signer)
      const [tx] = await safeWrite(token.approve(spender, amount))
      return tx
    },
    async _transfer(user, amount, signer) {
      const { token } = useContracts(signer)
      const [tx] = await safeWrite(token.transfer(user, amount))
      return tx
    },
    async _allowance(owner, spender) {
      const { token } = useContracts()
      return await safeRead(token.allowance(owner, spender), BigNumber.from(0))
    },
    async _balanceOf(user) {
      const { token } = useContracts()
      return await safeRead(token.balanceOf(user), BigNumber.from(0))
    },
  },
})
