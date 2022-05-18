import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

import { ethers } from 'hardhat'
import { Token } from '../../typechain'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments } = hre
  const { deploy } = deployments
  const [deployer] = await ethers.getSigners()

  const token = (await ethers.getContract('Token')) as Token

  await deploy('Staking', {
    from: deployer.address,
    args: [token.address],
    log: true,
  })
}
export default func

func.tags = ['Staking']
func.dependencies = ['Token']
func.skip = async (hre) => !hre.network.tags.localhost
