// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Storage {
  mapping(address=>string[]) public ipfsHashes;

  constructor() {
        console.log("Deploying a Storage");
    }

  function add(string memory x) public {
    ipfsHashes[msg.sender].push(x);
  }

  function get() public view returns (string[] memory) {
    return ipfsHashes[msg.sender];
  }
}
