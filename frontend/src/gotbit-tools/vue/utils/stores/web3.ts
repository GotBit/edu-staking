import type { providers } from 'ethers'
import { defineStore } from 'pinia'

import { loadBefore, loadAfter, web3Getters } from '../store'
import { registerWallets } from '../wallets'
import { getFakeSigner } from '../dev'

import type { ISigner } from './pureTypes'
import type { ChainId } from '../types'
import type { WalletHandler, WalletType } from '../wallets/types'

import { config, contractStores } from '@/gotbit.config'

export const useWeb3 = defineStore('web3', {
  state: () => {
    return {
      wallet: '',
      _signer: () => null as ISigner,
      chainId: config.DEFAULT_CHAINID as ChainId,
      login: false,
      loading: false,
      walletHandler: null as WalletHandler | null,
    }
  },
  getters: {
    ...web3Getters(contractStores.stores),
  },
  actions: {
    async _connect(wallet: string, signer: ISigner, chainId: ChainId, login = true) {
      this.loading = true

      console.log(`%cConnected: ${wallet} on ${chainId}`, 'font-weight: bold')

      this.wallet = wallet
      this._signer = () => signer
      this.login = login
      this.chainId = chainId

      await this.loadBefore()
      if (login) await this.loadAfter()

      this.loading = false
    },
    pretend(address: string, chainId: ChainId = config.DEFAULT_CHAINID) {
      this._connect(address, getFakeSigner(address, chainId), chainId)
    },
    async init() {
      await this.loadBefore()
      window.pretend = (address: string, chainId?: string) =>
        this.pretend(address, chainId as ChainId)
    },
    loadBefore: async () => {
      await loadBefore(contractStores.stores)
      contractStores.loadBefore?.()
    },
    loadAfter: async () => {
      await loadAfter(contractStores.stores)
      contractStores.loadAfter?.()
    },

    async connect(walletType: WalletType) {
      const connectFunction = async (
        wallet: string,
        signer: providers.JsonRpcSigner | null,
        chainId: ChainId,
        login?: boolean
      ) => await this._connect(wallet, signer, chainId, login)

      this.walletHandler = new registerWallets[walletType](connectFunction)
      await this.walletHandler.connect(config.chainIds, config.DEFAULT_CHAINID)
    },
    async switchChain(chainId: ChainId): Promise<boolean> {
      return Boolean(await this.walletHandler?.switchChain(chainId))
    },
    async disconnect(): Promise<boolean> {
      return Boolean(await this.walletHandler?.disconnect())
    },
  },
})
