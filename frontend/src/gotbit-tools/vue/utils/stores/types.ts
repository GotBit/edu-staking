import type { Store, StoreDefinition, _GettersTree } from 'pinia'

import type { ChainId } from '../types'
import type { ISigner } from './pureTypes'
import type { WalletHandler, WalletType } from '../wallets/types'

export interface IWeb3State {
  wallet: string
  _signer: () => ISigner
  chainId: ChainId
  login: boolean
  loading: boolean
  walletHandler: WalletHandler | null
}

export interface IWeb3Getters {
  globalLoading: (state: IWeb3State) => boolean
  signer: (state: IWeb3State) => ISigner
  walletLabel: (state: IWeb3State) => string
}

export interface IWeb3Actions {
  _connect: (wallet: string, signer: ISigner, chainId: ChainId) => Promise<void>
  init: () => Promise<void>
  pretend: (address: string, chainId: ChainId) => void
  loadBefore: () => Promise<void>
  loadAfter: () => Promise<void>
  connect: (walletType: WalletType) => Promise<void>
  switchChain: (chainId: ChainId) => Promise<boolean>
  disconnect: (chainId: ChainId) => Promise<boolean>
}

export type IWeb3StoreDefinition = StoreDefinition<
  'web3',
  IWeb3State,
  IWeb3Getters,
  IWeb3Actions
>
export type IWeb3Store = Store<'web3', IWeb3State, IWeb3Getters, IWeb3Actions>
