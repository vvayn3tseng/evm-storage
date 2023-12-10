// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Struct {
    struct Data {
        uint256 value1;
        uint256 value2;
    }

    Data value;

    constructor() {
        value = Data(0xdeadbeef, 0xdeadc0de);
    }
}