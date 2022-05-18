import { HardhatUserConfig, task } from 'hardhat/config'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import 'hardhat-gas-reporter'
import 'solidity-coverage'
import 'hardhat-contract-sizer'
import 'hardhat-deploy'

import * as dotenv from 'dotenv'
dotenv.config()

import './gotbit-tools/types/bignumber'
import './gotbit-tools/types/global'

import './gotbit-tools/extensions'

import { secrets, networkGenerator } from './gotbit-tools'

task('secrets', 'Prints secret config', async (taskArgs, hre) => {
  console.log(JSON.stringify(secrets, null, 2))
})

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()
  for (const account of accounts) {
    console.log(account.address)
  }
})

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.11',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.6.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      tags: ['localhost'],
      // tags: ['fork'],
      // forking: {
      //   url: 'https://bsc-dataseed1.defibit.io/',
      // },
    },
    ...networkGenerator(),
    // place here any network you like (for overiding `networkGenerator`)
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
  },
}

export default config
