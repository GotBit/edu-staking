import {
  useWeb3,
  defineContractStore,
  useContracts,
  safeRead,
  isLogin,
  safe,
  safeWrite,
  scannersLink,
} from '@/gotbit-tools/vue'
import {
  IContractState,
  IContractActions,
  INotNullSigner,
} from '@/gotbit-tools/vue/types'
import { useToken } from '@/store/contracts/token'
import { BigNumber, ContractTransaction } from 'ethers'

export interface Stake {
  startTimestamp: BigNumber
  amount: BigNumber
  reward: BigNumber
}

export interface IStakingState extends IContractState {
  rate: number
  userStake: null | Stake
  reward: BigNumber
  isStaked: boolean
}
export interface IStakingActions extends IContractActions {
  stake: (amount: number) => Promise<string>
  harvest: (amount: number) => Promise<string>
  unstake: (amount: number) => Promise<string>
  updateReward: () => Promise<void>

  _getReward: (user: string) => Promise<BigNumber>
  _rate: () => Promise<BigNumber>
  _stakes: (user: string) => Promise<Stake | null>
  _stake: (
    amount: BigNumber,
    signer: INotNullSigner
  ) => Promise<ContractTransaction | null>
  _harvest: (signer: INotNullSigner) => Promise<ContractTransaction | null>
  _unstake: (signer: INotNullSigner) => Promise<ContractTransaction | null>
}

export const useStaking = defineContractStore<IStakingState, IStakingActions>('staking', {
  state: () => ({
    loading: false,
    rate: 0,
    userStake: null,
    reward: BigNumber.from(0),
    isStaked: false,
  }),
  actions: {
    async loadBefore() {
      this.loading = true

      this.rate = (await this._rate()).toNumber()

      this.loading = false
      return true
    },
    async loadAfter() {
      const web3 = useWeb3()
      if (!isLogin()) return false

      this.loading = true

      this.userStake = await this._stakes(web3.wallet)
      this.reward = await this._getReward(web3.wallet)

      if (this.userStake?.startTimestamp.gt(0)) this.isStaked = true
      else this.isStaked = false

      this.loading = false
      return true
    },
    async updateReward() {
      const web3 = useWeb3()
      if (!isLogin()) return
      this.reward = await this._getReward(web3.wallet)
    },
    async stake(amount: number) {
      const web3 = useWeb3()

      if (!isLogin()) return ''

      this.loading = true

      const { staking } = useContracts()
      const token = useToken()
      await token.approveIf(web3.wallet, staking.address, web3.signer!)
      const tx = await this._stake(amount.toString().toBigNumber(18), web3.signer!)

      this.loading = false

      await web3.loadAfter()
      if (tx) {
        const link = scannersLink.getTx(web3.chainId, tx.hash)
        return link
      }
      return ''
    },
    async harvest(): Promise<string> {
      const web3 = useWeb3()

      if (!isLogin()) return ''

      this.loading = true
      const tx = await this._harvest(web3.signer!)
      this.loading = false

      await web3.loadAfter()
      if (tx) return scannersLink.getTx(web3.chainId, tx.hash)
      return ''
    },
    async unstake(): Promise<string> {
      const web3 = useWeb3()

      if (!isLogin()) return ''

      this.loading = true
      const tx = await this._unstake(web3.signer!)
      this.loading = false

      await web3.loadAfter()
      if (tx) return scannersLink.getTx(web3.chainId, tx.hash)
      return ''
    },

    async _getReward(user) {
      const { staking } = useContracts()
      return await safeRead(staking.getReward(user), BigNumber.from(0))
    },
    async _rate() {
      const { staking } = useContracts()
      return await safeRead(staking.rate(), BigNumber.from(0))
    },
    async _stakes(user) {
      const { staking } = useContracts()
      const userStake = await safeRead(staking.stakes(user), null)
      return userStake
    },
    async _stake(amount, signer) {
      const { staking } = useContracts(signer)
      const [tx] = await safeWrite(staking.stake(amount))
      return tx
    },
    async _harvest(signer) {
      const { staking } = useContracts(signer)
      const [tx] = await safeWrite(staking.harvest())
      return tx
    },
    async _unstake(signer) {
      const { staking } = useContracts(signer)
      const [tx] = await safeWrite(staking.unstake())
      return tx
    },
  },
})
