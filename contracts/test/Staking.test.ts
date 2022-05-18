import { expect } from 'chai'
import { ethers, deployments, time } from 'hardhat'
import { Staking, Token } from '../typechain'

const setup = deployments.createFixture(async () => {
  await deployments.fixture()
  return {
    token: (await ethers.getContract('Token')) as Token,
    staking: (await ethers.getContract('Staking')) as Staking,
  }
})

describe('Staking', () => {
  it('should be nice setup', async () => {
    const { token, staking } = await setup()
    const [deployer] = await ethers.getSigners()
    expect(await staking.token()).to.eq(token.address)
  })
  describe('user flow', () => {
    it('should stake, harvest and unstake', async () => {
      const { token, staking } = await setup()
      const [, user] = await ethers.getSigners()

      // give user tokens
      await token.transfer(user.address, '1000'.toBigNumber())

      const stakeAmount = '10'.toBigNumber(18)
      // stake by user
      await token.connect(user).approve(staking.address, stakeAmount)
      await expect(() => staking.connect(user).stake(stakeAmount)).changeTokenBalance(
        token,
        user,
        stakeAmount.mul(-1)
      )

      let userStake = await staking.stakes(user.address)
      expect(userStake.amount).to.eq(stakeAmount)
      expect(userStake.reward).to.eq(0)

      const period = 1000
      await time.increaseTime(period)
      await time.mine()

      const reward = await staking.getReward(user.address)
      await expect(() => staking.connect(user).harvest()).changeTokenBalance(
        token,
        user,
        reward
      )

      userStake = await staking.stakes(user.address)
      expect(userStake.reward).to.eq(reward)

      const calcReward = stakeAmount
        .mul(await staking.rate())
        .mul(Math.floor(period / 10))
        .div(100)
      expect(reward).to.eq(calcReward)

      await expect(staking.connect(user).harvest()).to.be.reverted
      await expect(() => staking.connect(user).unstake()).changeTokenBalance(
        token,
        user,
        stakeAmount
      )

      userStake = await staking.stakes(user.address)
      expect(userStake.startTimestamp).to.eq(0)
      expect(userStake.amount).to.eq(0)
      expect(userStake.reward).to.eq(0)
    })
  })
})
