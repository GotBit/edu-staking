import { providers } from 'ethers'

import { getChainRpc } from '../info'
import type { ChainId } from '../types'

import type {
  ConnectFunction,
  ChangeChainCallbackFunction,
  ChangeWalletCallbackFunction,
  WalletHandler,
} from './types'

export class Walletconnect implements WalletHandler {
  constructor(
    public connectFunction: ConnectFunction,
    public changeWalletCallback?: ChangeWalletCallbackFunction,
    public preventDefaultChangeWallet?: boolean,
    public changeChainCallback?: ChangeChainCallbackFunction,
    public preventDefaultChangeChain?: boolean
  ) {}

  async connect(chainIds: readonly ChainId[], defaultChainId: ChainId): Promise<boolean> {
    try {
      console.log('Connecting to walletconnect...')

      const rpc = {
        [parseInt(defaultChainId)]: getChainRpc(defaultChainId),
      }

      const WalletConnectProvider = (window as any).WalletConnectProvider.default
      const wc = new WalletConnectProvider({
        rpc,
        chainId: parseInt(defaultChainId),
        qrcode: true,
      })

      await wc.enable()
      const provider = new providers.Web3Provider(wc)
      const signer = provider.getSigner()
      const wallet = await signer.getAddress()

      await this.connectFunction(wallet, signer, defaultChainId)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  async switchChain(chainId: ChainId): Promise<boolean> {
    return false
  }

  async disconnect(): Promise<boolean> {
    return false
  }
}
