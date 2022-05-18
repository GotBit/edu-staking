import { BaseContract, Contract } from 'ethers'

import type { INotNullSigner } from './stores/pureTypes'

import type { ChainId } from './types'
import { getContractsInfo, getProvider } from './info'

import type { IWeb3Store } from './stores/types'
import { useWeb3 } from './stores/web3'

import { contracts as definedContracts } from '@/gotbit.config'

export function addContract<T extends BaseContract>(
  name: keyof ReturnType<typeof getContractsInfo>
): (chainId: ChainId) => T {
  return (chainId: ChainId) => {
    const contractsInfo = getContractsInfo(chainId)
    const provider = getProvider(chainId)
    return new Contract(
      contractsInfo[name].address,
      contractsInfo[name].abi,
      provider
    ) as T
  }
}

export function addContractWithAddress<T extends BaseContract>(
  name: keyof ReturnType<typeof getContractsInfo>
): (chainId: ChainId) => (address: string) => T {
  return (chainId: ChainId) => {
    const contractsInfo = getContractsInfo(chainId)
    const provider = getProvider(chainId)
    return (address: string) =>
      new Contract(address, contractsInfo[name].abi, provider) as T
  }
}

export function useContracts(signer?: INotNullSigner, chainId?: ChainId) {
  const web3 = useWeb3()

  type Keys = keyof typeof definedContracts
  type ChainedContracts = {
    [key in Keys]: ReturnType<typeof definedContracts[key]>
  }

  const chainedContracts = {} as ChainedContracts
  for (let [key, value] of Object.entries(definedContracts)) {
    if (!chainId) chainId = web3.chainId
    if (signer) {
      if (typeof value(chainId) === 'function') {
        // @ts-ignore
        chainedContracts[key] = (address: string) =>
          // @ts-ignore
          value(chainId)(address).connect(signer)
      } else {
        // @ts-ignore
        chainedContracts[key] = value(chainId).connect(signer)
      }
    } else {
      // @ts-ignore
      chainedContracts[key] = value(chainId)
    }
  }
  return chainedContracts
}

export function isLogin(web3?: IWeb3Store): boolean {
  if (web3) {
    if (web3.login) return true
  } else {
    if (useWeb3().login) return true
  }

  console.warn('User is not connected')
  return false
}
