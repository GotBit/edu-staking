import type { providers, Wallet } from 'ethers'

export interface IContractState {
  loading: boolean
}
export interface IContractActions {
  loadBefore: () => Promise<boolean>
  loadAfter: () => Promise<boolean>
}

export type ISigner = providers.JsonRpcSigner | Wallet | null
export type INotNullSigner = providers.JsonRpcSigner | Wallet

export type IContractStore = IContractState & IContractActions
export type IContractStoreDefinition = (() => IContractStore) & {
  $id: string
}
