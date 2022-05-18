import { storeToRefs } from 'pinia'
import { useWeb3 } from '../utils/stores/web3'

export function useWallet() {
  const web3 = useWeb3()
  const { wallet, walletLabel, login, globalLoading } = storeToRefs(web3)

  return {
    wallet,
    walletLabel,
    login,
    globalLoading,
    connectMetamask: () => web3.connect('metamask'),
    connectWalletconnect: () => web3.connect('walletconnect'),
    disconnect: web3.disconnect,
  }
}
