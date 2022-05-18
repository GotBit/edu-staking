import { providers } from 'ethers'

import {
  getChainHex,
  getChainDescription,
  getChainName,
  getChainScanner,
  getChainTag,
} from '../info'
import type { ChainId } from '../types'
import { getConfig } from '../node'
import type {
  ConnectFunction,
  ChangeChainCallbackFunction,
  ChangeWalletCallbackFunction,
  WalletHandler,
} from './types'

import { config } from '@/gotbit.config'

export class Metamask implements WalletHandler {
  constructor(
    public connectFunction: ConnectFunction,
    public changeWalletCallback?: ChangeWalletCallbackFunction,
    public preventDefaultChangeWallet?: boolean,
    public changeChainCallback?: ChangeChainCallbackFunction,
    public preventDefaultChangeChain?: boolean
  ) {}

  async connect(chainIds: readonly ChainId[], defaultChainId: ChainId): Promise<boolean> {
    try {
      console.log('Connecting to metamask...')
      if (!(window as any).ethereum) throw new Error('Please set up MetaMask properly')

      const wallet = (
        await (window as any).ethereum.request?.({
          method: 'eth_requestAccounts',
        })
      )[0] as string

      const provider = new providers.Web3Provider(
        ((window as any).ethereum as any) || (window as any).web3
      )
      const signer = provider.getSigner()
      const chainId = (await provider?.getNetwork())?.chainId

      const chainIdString = chainId.toString()

      if (!chainIds.includes(chainIdString as ChainId))
        return await this.switchChain(defaultChainId)

      await this.connectFunction(wallet, signer, chainIdString as ChainId)

      // HANDLERS
      ;((window as any).ethereum as any).once('chainChanged', async (chainId: string) => {
        if (!this.preventDefaultChangeChain) await this.connect(chainIds, defaultChainId)
        if (this.changeChainCallback) this.changeChainCallback(chainId)
      })
      ;((window as any).ethereum as any).once(
        'accountsChanged',
        async (addresses: string[]) => {
          if (!this.preventDefaultChangeWallet)
            await this.connect(chainIds, defaultChainId)
          if (this.changeWalletCallback) this.changeWalletCallback(addresses[0])
        }
      )

      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  async switchChain(chainId: ChainId): Promise<boolean> {
    try {
      await (window as any).ethereum.request?.({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: getChainHex(chainId) }],
      })
      await this.connect([chainId], chainId)
      return true
    } catch (error) {
      if ((error as any).code === 4902) {
        try {
          const param = {
            chainId: getChainHex(chainId),
            chainName: getChainName(chainId),
            nativeCurrency: {
              name: getChainDescription(chainId).symbol,
              symbol: getChainDescription(chainId).symbol,
              decimals: 18,
            },
            rpcUrls: [getConfig(getChainTag(chainId)).rpc],
            blockExplorerUrls: [getChainScanner(chainId)],
          }
          console.log(param)

          await (window as any).ethereum.request?.({
            method: 'wallet_addEthereumChain',
            params: [param],
          })
          return true
        } catch (addError) {
          return false
        }
      }
      return false
    }
  }

  async disconnect(): Promise<boolean> {
    this.connectFunction('', null, config.DEFAULT_CHAINID, false)
    return true
  }
}
