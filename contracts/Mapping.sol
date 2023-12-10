// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Mapping {
    mapping(uint256 => uint256) public values1;
    mapping(uint256 => uint256) public values2;

    constructor() {
        values1[0xdeadbeef] = 0xdeadc0de;
        values2[0xdeadbeef] = 0xdeadc0de;
    }
}

contract Mapping2 {
    mapping(address => mapping(uint256 => uint256)) public values1;

    constructor() {
        values1[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266][0xdeadbeef] = 0xdeadc0de;
    }
}