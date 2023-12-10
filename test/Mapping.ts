import { expect } from "chai";
import { ethers } from "hardhat";
import { align, deployContract } from "./utils";

describe("All", async function () {
  describe("mapping1", async function () {
    it("should get the correct value from storage", async function () {
      const contract = await deployContract("Mapping");

      // keccak256(bytes32(key) + bytes32(position))
      const v1Deadbeef = ethers.keccak256(
        "0x" + align("deadbeef", 64) + align("", 64)
      );
      const v2Deadbeef = ethers.keccak256(
        "0x" + align("deadbeef", 64) + align("1", 64)
      );

      const v1Value = await ethers.provider.getStorage(
        contract.target,
        v1Deadbeef
      );
      const v2Value = await ethers.provider.getStorage(
        contract.target,
        v2Deadbeef
      );
      console.log(`v1 value at ${v1Deadbeef}: ${v1Value}`);
      console.log(`v2 value at ${v2Deadbeef}: ${v2Value}`);
      expect(v1Value).to.equal("0x" + align("deadc0de", 64));
      expect(v2Value).to.equal("0x" + align("deadc0de", 64));
    });
  });
  describe("mapping2", async function () {
    it("should get the correct value from storage", async function () {
      const contract = await deployContract("Mapping2");
      const firstKey = ethers.keccak256(
        "0x" +
          align("f39Fd6e51aad88F6F4ce6aB8827279cffFb92266", 64) +
          align("", 64)
      );
      const secondKey = ethers.keccak256(
        "0x" + align("deadbeef", 64) + firstKey.slice(2)
      );

      const value = await ethers.provider.getStorage(
        contract.target,
        secondKey
      );
      console.log(`value at ${secondKey}: ${value}`);
      expect(value).to.equal("0x" + align("deadc0de", 64));
    });
  });
});
