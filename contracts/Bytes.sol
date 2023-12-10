// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract BytesLT31Bytes {
    string value1;
    bytes value2;
    bytes value3;

    constructor() {
        value1 = "deadbeef";
        value2 = hex"deadc0de";
        value3 = "abcdefghijklmnopqrstuvwxyzABCDE";
    }
}

contract BytesGT32Bytes {
    string value1;
    bytes value2;

    constructor() {
        value1 = "deadbeef000000000000000000000000beefc0de";
        value2 = "deadbeef000000000000000000000000fee1dead";
    }
}