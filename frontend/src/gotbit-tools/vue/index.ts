import { safe, safeRead, safeWrite } from './utils/safe'
export { safe, safeRead, safeWrite }

import { defineConfig, displayStore, chainIds } from './utils/pure'
export { defineConfig, displayStore, chainIds }

import { getContracts, debugInfo, debugOn, getFakeSigner } from './utils/dev'
export { getContracts, debugInfo, debugOn, getFakeSigner }

import {
  types,
  names,
  symbols,
  rpcs,
  scanners,
  moralisPath,
  node,
  getConfig,
} from './utils/node'
export { types, names, symbols, rpcs, scanners, moralisPath, node, getConfig }
import {
  getChainTag,
  getChainRpc,
  getChainName,
  getChainHex,
  getChainScanner,
  getProvider,
  getContractsInfo,
  getChainDescription,
  scannersLink,
} from './utils/info'
export {
  getChainTag,
  getChainRpc,
  getChainName,
  getChainHex,
  getChainScanner,
  getProvider,
  getContractsInfo,
  getChainDescription,
  scannersLink,
}

import wallets, { registerWallets } from './utils/wallets'
export { wallets, registerWallets }

import {
  load,
  loadBefore,
  loadAfter,
  defineContractStore,
  web3Getters,
} from './utils/store'
export { load, loadBefore, loadAfter, defineContractStore, web3Getters }

import { useWeb3 } from './utils/stores/web3'
export { useWeb3 }

import { defineContracts, defineContractStores } from './utils/defines'
export { defineContracts, defineContractStores }

import {
  addContract,
  addContractWithAddress,
  useContracts,
  isLogin,
} from './utils/contracts'
export { addContract, addContractWithAddress, useContracts, isLogin }

import ContractsInfo from './components/ContractsInfo.vue'
import KeyHandler from './components/KeyHandler.vue'
import { useWallet } from './composables/wallet'

const contractsInfoPath = {
  path: '/contracts-info',
  name: 'contracts-info',
  component: ContractsInfo,
}

export { ContractsInfo, KeyHandler, contractsInfoPath, useWallet }
