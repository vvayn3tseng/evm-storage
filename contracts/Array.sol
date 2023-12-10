// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract FixedArray {
    uint256[3] values;

    constructor() {
        values[0] = 0xdeadbeef;
        values[1] = 0xdeadc0de;
        values[2] = 0xfee1dead;
    }
}

contract DynamicArray {
    uint256 placeholder;
    uint256[] values;

    constructor() {
        values.push(0xdeadbeef);
        values.push(0xdeadc0de);
        values.push(0xfee1dead);
    }
}