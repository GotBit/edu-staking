import {
  defineConfig,
  defineContracts,
  defineContractStores,
  addContract,
} from '@/gotbit-tools/vue'

export const config = defineConfig({
  DEBUG: import.meta.env.VITE_DEBUG === 'true',
  chainIds: ['97'] as const,
  DEFAULT_CHAINID: '97',
  MORALIS_ID: import.meta.env.VITE_MORALIS_ID,
})

import { Token, Staking } from '@contracts/typechain'
export const contracts = defineContracts({
  token: addContract<Token>('Token'),
  staking: addContract<Staking>('Staking'),
})

import { useToken } from '@/store/contracts/token'
import { useStaking } from '@/store/contracts/staking'
export const contractStores = defineContractStores([useToken, useStaking])
