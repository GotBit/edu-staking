import secrets from '../secrets-config'
import { Node, Config, ChainTag, chainIds } from '../types'

export const types: Record<ChainTag, 'mainnet' | 'testnet'> = {
  localhost: 'testnet',

  eth_mainnet: 'mainnet',
  bsc_mainnet: 'mainnet',
  polygon_mainnet: 'mainnet',
  avax_mainnet: 'mainnet',
  ftm_mainnet: 'mainnet',
  arbitrum_mainnet: 'mainnet',

  rinkeby: 'testnet',
  ropsten: 'testnet',
  goerli: 'testnet',
  bsc_testnet: 'testnet',
  polygon_testnet: 'testnet',
  avax_testnet: 'testnet',
  ftm_testnet: 'testnet',
  arbitrum_testnet: 'testnet',
}

export const names: Record<ChainTag, string> = {
  localhost: 'Localhost',

  eth_mainnet: 'Ethereum',
  bsc_mainnet: 'Binance Smart Chain',
  polygon_mainnet: 'Polygon Mainnet',
  avax_mainnet: 'Avalanche Mainnet',
  ftm_mainnet: 'Fantom Mainnet',
  arbitrum_mainnet: 'Arbitrum Mainnet',

  rinkeby: 'Rinkeby',
  ropsten: 'Ropsten',
  goerli: 'Goerli',
  bsc_testnet: 'Binance Smart Chain Testnet',
  polygon_testnet: 'Polygon Mumbai Testnet',
  avax_testnet: 'Avalanche Fuji Testnet',
  ftm_testnet: 'Fantom Testnet',
  arbitrum_testnet: 'Arbitrum Testnet',
}

export const symbols: Record<ChainTag, string> = {
  localhost: 'LOC',

  eth_mainnet: 'ETH',
  bsc_mainnet: 'BNB',
  polygon_mainnet: 'MATIC',
  avax_mainnet: 'AVAX',
  ftm_mainnet: 'FTM',
  arbitrum_mainnet: 'ETH',

  rinkeby: 'ETH',
  ropsten: 'ETH',
  goerli: 'ETH',
  bsc_testnet: 'BNB',
  polygon_testnet: 'MATIC',
  avax_testnet: 'AVAX',
  ftm_testnet: 'FTM',
  arbitrum_testnet: 'ETH',
}

export const rpcs: Record<ChainTag, string> = {
  localhost: 'http://127.0.0.1:8545/',

  eth_mainnet: 'https://rpc.ankr.com/eth',
  bsc_mainnet: 'https://bsc-dataseed.binance.org',
  polygon_mainnet: 'https://polygon-rpc.com',
  avax_mainnet: 'https://api.avax.network/ext/bc/C/rpc',
  ftm_mainnet: 'https://rpc.ftm.tools',
  arbitrum_mainnet: 'https://arb1.arbitrum.io/rpc',

  rinkeby: 'https://rinkey.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  ropsten: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  goerli: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  bsc_testnet: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  polygon_testnet: 'https://rpc-mumbai.maticvigil.com',
  avax_testnet: 'https://api.avax-test.network/ext/bc/C/rpc',
  ftm_testnet: 'https://rpc.testnet.fantom.network/',
  arbitrum_testnet: 'https://rinkeby.arbitrum.io/rpc',
}

export const scanners: Record<ChainTag, string> = {
  localhost: '/',
  eth_mainnet: 'https://etherscan.io/',
  bsc_mainnet: 'https://bscscan.com/',
  polygon_mainnet: 'https://polygonscan.com/',
  avax_mainnet: 'https://snowtrace.io/',
  ftm_mainnet: 'https://ftmscan.com/',
  arbitrum_mainnet: 'https://arbiscan.io/',
  rinkeby: 'https://rinkeby.etherscan.io/',
  ropsten: 'https://ropsten.etherscan.io/',
  goerli: 'https://goerli.etherscan.io/',
  bsc_testnet: 'https://testnet.bscscan.com/',
  polygon_testnet: 'https://mumbai.polygonscan.com/',
  avax_testnet: 'https://testnet.snowtrace.io/',
  ftm_testnet: 'https://testnet.ftmscan.com/',
  arbitrum_testnet: 'https://testnet.arbiscan.io/',
}

export const moralisPath: Record<ChainTag, string> = {
  localhost: '/',

  eth_mainnet: '/eth/mainnet',
  bsc_mainnet: '/bsc/mainnet',
  polygon_mainnet: '/polygon/mainnet',
  avax_mainnet: '/avalanche/mainnet',
  ftm_mainnet: '/fantom/mainnet',
  arbitrum_mainnet: '/arbitrum/mainnet',
  rinkeby: '/eth/rinkeby',
  ropsten: '/eth/ropsten',
  goerli: '/eth/goerli',
  bsc_testnet: '/bsc/testnet',
  polygon_testnet: '/polygon/mumbai',
  avax_testnet: '/avalanche/testnet',
  ftm_testnet: '/fantom/tesnet',
  arbitrum_testnet: '/arbitrum/testnet',
}

export function node(name: ChainTag): Node {
  if (name === 'ftm_testnet') {
    return {
      rpc: 'https://rpc.testnet.fantom.network/',
      chainId: chainIds[name],
      scanner: scanners[name],
      name: names[name],
      short: name,
      type: types[name],
    }
  }
  if (name === 'localhost') {
    return {
      rpc: 'http://127.0.0.1:8545/',
      chainId: chainIds[name],
      scanner: scanners[name],
      name: names[name],
      short: name,
      type: types[name],
    }
  }
  if (Object.keys(names).includes(name)) {
    return {
      rpc: 'https://speedy-nodes-nyc.moralis.io/' + secrets.moralis + moralisPath[name],
      chainId: chainIds[name],
      scanner: scanners[name],
      name: names[name],
      short: name,
      type: types[name],
    }
  }

  return {} as Node
}

export function getConfig(name: ChainTag): Config {
  if (Object.keys(names).includes(name)) {
    return {
      name: names[name],
      rpc: rpcs[name],
      chainId: chainIds[name],
      symbol: symbols[name],
      scanner: scanners[name],
    }
  }

  return {} as Config
}
