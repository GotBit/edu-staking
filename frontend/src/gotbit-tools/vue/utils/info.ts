import { providers } from 'ethers'

import type { ChainTag } from './pure'
import { node, getConfig } from './node'
import type { ChainId } from './types'

import contracts from '@contracts/contracts.json'

export function getChainTag(chainId: ChainId): ChainTag {
  return contracts[chainId][0].name as ChainTag
}

export function getChainRpc(chainId: ChainId): string {
  return node(getChainTag(chainId)).rpc
}

export function getChainName(chainId: ChainId): string {
  return node(getChainTag(chainId)).name
}

export function getChainHex(chainId: ChainId): string {
  return '0x' + node(getChainTag(chainId)).chainId.toString(16)
}

export function getChainScanner(chainId: ChainId): string {
  return node(getChainTag(chainId)).scanner
}

export function getProvider(chainId: ChainId): providers.JsonRpcProvider {
  return new providers.JsonRpcProvider(getChainRpc(chainId))
}

export function getContractsInfo(chainId: ChainId) {
  return contracts[chainId][0].contracts
}

export function getChainDescription(chainId: ChainId) {
  return getConfig(getChainTag(chainId))
}

export const scannersLink = {
  getTx: (chainId: ChainId, tx: string) => getChainScanner(chainId) + 'tx/' + tx,
  getBlock: (chainId: ChainId, block: string) =>
    getChainScanner(chainId) + 'block/' + block,
  getAddress: (chainId: ChainId, address: string) =>
    getChainScanner(chainId) + 'address/' + address,
}
