import type contracts from '@contracts/contracts.json'

export const chainIds = {
  localhost: 31337,
  eth_mainnet: 1,
  bsc_mainnet: 56,
  polygon_mainnet: 137,
  avax_mainnet: 43114,
  ftm_mainnet: 250,
  arbitrum_mainnet: 42161,
  rinkeby: 4,
  ropsten: 3,
  goerli: 5,
  bsc_testnet: 97,
  polygon_testnet: 80001,
  avax_testnet: 43113,
  ftm_testnet: 4002,
  arbitrum_testnet: 421611,
}
export type ChainTag = keyof typeof chainIds

type LegalChains = readonly (keyof typeof contracts)[]

export type GotBitConfig<Chains extends LegalChains> =
  | {
      DEBUG: boolean
      chainIds: Chains
      DEFAULT_CHAINID: GotBitConfig<Chains>['chainIds'][number]
      MORALIS_ID: string
      rpc?: (tag: ChainTag) => string
    }
  | {
      DEBUG: boolean
      chainIds: Chains
      DEFAULT_CHAINID: GotBitConfig<Chains>['chainIds'][number]
      MORALIS_ID?: string
      rpc: (tag: ChainTag) => string
    }

export function defineConfig<Chains extends LegalChains>(config: GotBitConfig<Chains>) {
  return config
}

export function displayStore(
  name: string,
  status: 'loading' | 'done' | 'problem' | 'busy',
  type: 'before' | 'after'
) {
  if (status === 'problem') {
    console.warn(`Problem to load ${type} store:`, name)
    return
  }
  if (status === 'busy') {
    console.warn('Busy store:', name)
    return
  }
  console.log(
    `${status} %c${type}%c store: %c${name}`,
    `
      color: ${type === 'before' ? 'red' : '#0a9396'};
      background: black;
    `,
    '',
    'color: #f77f00; font-weight: bold; background: black;'
  )
}
