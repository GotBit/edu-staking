import { providers, Wallet } from 'ethers'
import type { Deferrable } from '@ethersproject/properties'

import { getProvider } from './info'
import type { ChainId } from './types'

import { config } from '@/gotbit.config'

import contracts from '@contracts/contracts.json'

function header(msg: string) {
  console.log(
    '%c' + msg,
    `
      padding: 1rem;
      border-radius: .5rem;
      font-weight: bold;
    `
  )
}

export function getContracts() {
  const allContracts: {
    [key: string]: { contracts: { [key: string]: string }; chainId: string }
  } = {}

  for (const chainId of Object.keys(contracts)) {
    const contractInfo = (contracts as any)[chainId][0].contracts
    const chainName = (contracts as any)[chainId][0].name
    const table: { [key: string]: string } = {}

    for (const contr of Object.keys(contractInfo))
      table[contr] = contractInfo[contr].address

    allContracts[chainName] = { contracts: table, chainId }
  }
  return allContracts
}

export function debugInfo(always = false) {
  if (config.DEBUG || always) {
    console.clear()
    header('DEBUG mode: ON')

    const contractsAll = getContracts()
    for (const chainName of Object.keys(contractsAll)) {
      const chainId = contractsAll[chainName].chainId
      const table = contractsAll[chainName].contracts
      console.group(
        `%c${chainId}) ${chainName}`,
        `
          color: #${'f'.repeat(6 - chainId.length)}${chainId}; 
          background: #${'0'.repeat(6 - chainId.length)}${chainId}; 
        `
      )
      console.table(table)
      console.groupEnd()
    }

    console.log('')
    console.log("Pretend user: \n%cprentend('user address')", 'font-family: monospace')
    console.log('')
  }
}

export function debugOn() {
  console.log = console.logAlways
  console.error = console.errorAlways
  console.warn = console.warnAlways
  console.table = console.tableAlways
  console.group = console.groupAlways
  console.groupEnd = console.groupEndAlways

  debugInfo(true)
}

window.debugOn = debugOn

export function getFakeSigner(address: string, chainId: ChainId): Wallet {
  console.log('Pretend', address)
  const fakeSigner = Wallet.createRandom().connect(getProvider(chainId))
  fakeSigner.sendTransaction = async (
    transaction: Deferrable<providers.TransactionRequest>
  ) => {
    console.log(
      JSON.stringify({ ...transaction, from: address, to: transaction.to }, null, 2)
    )
    return {} as providers.TransactionResponse
  }
  return fakeSigner
}
