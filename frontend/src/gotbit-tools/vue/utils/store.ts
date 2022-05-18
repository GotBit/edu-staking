import { defineStore, DefineStoreOptions, _GettersTree } from 'pinia'

import type {
  IContractState,
  IContractActions,
  IContractStoreDefinition,
} from './stores/pureTypes'
import type { IWeb3State } from './stores/types'

import { displayStore } from './pure'

export async function load(
  store: IContractStoreDefinition,
  func: () => Promise<boolean>,
  type: 'before' | 'after'
) {
  if (!store().loading) {
    displayStore(store.$id, 'loading', type)
    const response = await func()
    if (response) displayStore(store.$id, 'done', type)
    else displayStore(store.$id, 'problem', type)
  } else displayStore(store.$id, 'busy', type)
}

export async function loadBefore(registerContracts: IContractStoreDefinition[]) {
  console.group('Before loading')
  await Promise.all(
    registerContracts.map(async (store) => load(store, store().loadBefore, 'before'))
  )
  console.groupEnd()
}

export async function loadAfter(registerContracts: IContractStoreDefinition[]) {
  console.group('After loading')
  await Promise.all(
    registerContracts.map(async (store) => load(store, store().loadAfter, 'after'))
  )
  console.groupEnd()
}

export function defineContractStore<
  IState extends IContractState,
  IActions extends IContractActions
>(name: string, options: Omit<DefineStoreOptions<string, IState, {}, IActions>, 'id'>) {
  return defineStore<string, IState, {}, IActions>(name, options)
}

export const web3Getters = (contracts: IContractStoreDefinition[]) => ({
  globalLoading: (state: IWeb3State) =>
    contracts.map((c) => c().loading).some((v) => v) || state.loading,
  signer: (state: IWeb3State) => state._signer(),
  walletLabel: (state: IWeb3State) =>
    state.wallet ? state.wallet.shortAddress() : 'Connect',
})
