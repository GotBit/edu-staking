import type { providers } from 'ethers'
import type { ChainId } from '../types'
import type { registerWallets } from '.'

export type ConnectFunction = (
  wallet: string,
  signer: providers.JsonRpcSigner | null,
  chainId: ChainId,
  login?: boolean
) => Promise<void>

export type ChangeWalletCallbackFunction = (wallet: string) => void
export type ChangeChainCallbackFunction = (chainId: string) => void
export type WalletType = keyof typeof registerWallets

export abstract class WalletHandler {
  constructor(
    public connectFunction: ConnectFunction,
    public changeWalletCallback?: ChangeWalletCallbackFunction,
    public preventDefaultChangeWallet?: boolean,
    public changeChainCallback?: ChangeChainCallbackFunction,
    public preventDefaultChangeChain?: boolean
  ) {}

  abstract connect(
    chainIds: readonly ChainId[],
    defaultChainId: ChainId
  ): Promise<boolean>
  abstract disconnect(): Promise<boolean>
  abstract switchChain(chainId: ChainId): Promise<boolean>
}
