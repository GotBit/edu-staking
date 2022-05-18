import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

import { ethers } from 'hardhat'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments } = hre
  const { deploy } = deployments
  const [deployer] = await ethers.getSigners()

  await deploy('Token', {
    from: deployer.address,
    args: ['Token', 'TKN', 18],
    log: true,
  })
}
export default func

func.tags = ['Token']
func.skip = async (hre) => !hre.network.tags.testnet
