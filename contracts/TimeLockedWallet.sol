// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TimeLockedWallet {
    address public owner;
    uint256 public unlockTime;

    constructor(uint256 _unlockTime) payable {
        require(_unlockTime > block.timestamp, "Unlock time should be in the future");
        owner = msg.sender;
        unlockTime = _unlockTime;
    }

    function deposit() public payable {}

    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        require(block.timestamp >= unlockTime, "Cannot withdraw before unlock time");
        payable(owner).transfer(address(this).balance);
    }
}
