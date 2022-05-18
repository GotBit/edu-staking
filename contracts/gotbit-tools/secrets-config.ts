import process from 'process'
import { ChainTag } from './types'

const secrets = {
  API: {
    ETH: process.env.API_ETH,
    BSC: process.env.API_BSC,
    POLYGON: process.env.API_POLYGON,
    AVAX: process.env.API_AVAX,
    FTM: process.env.API_FTM,
    ARBITRUM: process.env.API_ARBITRUM,
  },
  MORALIS_ID: process.env.MORALIS_ID,
  PRIVATE: {
    TEST: process.env.PRIVATE_TEST ? process.env.PRIVATE_TEST?.split(',') : [],
    MAIN: process.env.PRIVATE_MAIN ? process.env.PRIVATE_MAIN?.split(',') : [],
  },
}

export default {
  moralis: secrets.MORALIS_ID,
  chains: {
    eth_mainnet: {
      keys: secrets.PRIVATE.MAIN,
      api: secrets.API.ETH,
    },
    rinkeby: {
      keys: secrets.PRIVATE.TEST,
      api: secrets.API.ETH,
    },
    ropsten: {
      keys: secrets.PRIVATE.TEST,
      api: secrets.API.ETH,
    },
    goerli: {
      keys: secrets.PRIVATE.TEST,
      api: secrets.API.ETH,
    },
    bsc_mainnet: {
      keys: secrets.PRIVATE.MAIN,
      api: secrets.API.BSC,
    },
    bsc_testnet: {
      keys: secrets.PRIVATE.TEST,
      api: secrets.API.BSC,
    },
    polygon_mainnet: {
      keys: secrets.PRIVATE.MAIN,
      api: secrets.API.POLYGON,
    },
    polygon_testnet: {
      keys: secrets.PRIVATE.TEST,
      api: secrets.API.POLYGON,
    },
    avax_mainnet: {
      keys: secrets.PRIVATE.MAIN,
      api: secrets.API.AVAX,
    },
    avax_testnet: {
      keys: secrets.PRIVATE.TEST,
      api: secrets.API.AVAX,
    },
    ftm_mainnet: {
      keys: secrets.PRIVATE.MAIN,
      api: secrets.API.FTM,
    },
    ftm_testnet: {
      keys: secrets.PRIVATE.TEST,
      api: secrets.API.FTM,
    },
    arbitrum_mainnet: {
      keys: secrets.PRIVATE.MAIN,
      api: secrets.API.ARBITRUM,
    },
    arbitrum_testnet: {
      keys: secrets.PRIVATE.TEST,
      api: secrets.API.ARBITRUM,
    },
  },
} as {
  moralis: string
  chains: Record<ChainTag, { keys: string[]; api: string }>
}
