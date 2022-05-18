import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

import { ethers } from 'hardhat'
import { Staking, Token } from '../../typechain'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const token = (await ethers.getContract('Token')) as Token
  const staking = (await ethers.getContract('Staking')) as Staking

  await token.transfer(staking.address, '10000'.toBigNumber(18))
}
export default func

func.tags = ['Staking.setup']
func.dependencies = ['Staking']
func.runAtTheEnd = true
func.skip = async (hre) => !hre.network.tags.testnet
