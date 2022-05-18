//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';

contract Staking {
    using SafeERC20 for IERC20;

    struct Stake {
        uint256 startTimestamp;
        uint256 amount;
        uint256 reward;
    }

    IERC20 public token;
    uint256 public rate = 15;
    uint256 public MAX_REWARD = 1000 ether;

    mapping(address => Stake) public stakes;

    constructor(IERC20 token_) {
        token = token_;
    }

    function stake(uint256 amount) external {
        require(stakes[msg.sender].startTimestamp == 0, 'You have had already stake');
        require(
            token.balanceOf(address(this)) > MAX_REWARD,
            'Not enough tokens on contract'
        );

        token.safeTransferFrom(msg.sender, address(this), amount);

        stakes[msg.sender] = Stake({
            startTimestamp: block.timestamp,
            amount: amount,
            reward: 0
        });
    }

    function harvest() public {
        uint256 reward_ = getReward(msg.sender);
        require(reward_ > 0, 'You dont have any reward');
        stakes[msg.sender].reward += reward_;
        token.safeTransfer(msg.sender, reward_);
    }

    function unstake() external {
        // harvest(); // mistake
        if (getReward(msg.sender) > 0) harvest();
        uint256 amount = stakes[msg.sender].amount;
        stakes[msg.sender] = Stake({startTimestamp: 0, amount: 0, reward: 0});
        token.safeTransfer(msg.sender, amount);
    }

    function getReward(address user) public view returns (uint256) {
        if (stakes[user].startTimestamp == 0) return 0;
        uint256 period = (block.timestamp - stakes[user].startTimestamp) / 10;
        uint256 reward = (rate * period * stakes[user].amount) / 100;
        return (reward > MAX_REWARD ? MAX_REWARD : reward) - stakes[user].reward;
    }
}
