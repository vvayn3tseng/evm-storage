// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Equal32Bytes {
    uint256 value1;
    uint256 value2;
    address value3;

    constructor() {
        value1 = 0xdeadbeef;
        value2 = 0xdeadc0de;
        value3 = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
    }
}

contract LessThan32Bytes {
    uint128 value1;
    uint128 value2;

    uint64 value3;
    uint64 value4;
    uint64 value5;

    uint128 value6;
    uint64 value7;

    constructor() {
        value1 = 0xdeadbeef;
        value2 = 0xdeadc0de;
        value3 = 0xdead;
        value4 = 0xbeef;
        value5 = 0xc0de;
        value6 = 0xfee1dead;
        value7 = 0xf00d;
    }
}
