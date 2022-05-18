import type { addContract, addContractWithAddress } from './contracts'
import type { IContractStoreDefinition } from './stores/pureTypes'

export function defineContracts<
  Contract extends
    | ReturnType<typeof addContract>
    | ReturnType<typeof addContractWithAddress>,
  Contracts extends { [key: string]: Contract }
>(contracts: Contracts) {
  return contracts
}

export function defineContractStores<T extends IContractStoreDefinition[]>(
  contractStore: T,
  loadBefore?: () => void,
  loadAfter?: () => void
) {
  return { stores: contractStore, loadBefore, loadAfter }
}
