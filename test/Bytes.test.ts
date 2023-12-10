import { expect } from "chai";
import { ethers } from "hardhat";
import { align, deployContract } from "./utils";
import { Addressable, BigNumberish } from "ethers";

describe("All", async function () {
  describe("string and bytes lt 32", async function () {
    it("should get the correct value from storage", async function () {
      const dynamics = await deployContract("BytesLT31Bytes");
      const slot0 = await ethers.provider.getStorage(dynamics.target, 0);
      const slot1 = await ethers.provider.getStorage(dynamics.target, 1);
      const slot2 = await ethers.provider.getStorage(dynamics.target, 2);
      console.log(`Slot 0: ${slot0}`);
      console.log(`Slot 1: ${slot1}`);
      console.log(`Slot 2: ${slot2}`);
    });
  });
  describe("string and bytes gt 32", async function () {
    async function getStorageAt(
      address: string | Addressable,
      loc: BigNumberish,
      length: BigNumberish
    ) {
      let lenLeft = BigInt(length);
      const storageLoc = BigInt(loc);
      let out = "";
      let i = 0n;
      while (lenLeft > 0n) {
        const value = await ethers.provider.getStorage(address, storageLoc + i);

        out += value.slice(2);

        i++;
        lenLeft -= 64n;
      }
      return "0x" + out.slice(0, (length as number) - 1);
    }

    it("should get the correct value from storage", async function () {
      const dynamics = await deployContract("BytesGT32Bytes");
      const slot0Len = await ethers.provider.getStorage(dynamics.target, 0);
      const slot1Len = await ethers.provider.getStorage(dynamics.target, 1);
      console.log(`Slot 0 length: ${slot0Len}`);
      console.log(`Slot 1 length: ${slot1Len}`);

      const slot0Loc = ethers.keccak256("0x" + align("0", 64));
      const slot1Loc = ethers.keccak256("0x" + align("1", 64));

      console.log("location of slot 0: ", slot0Loc);
      console.log("location of slot 1: ", slot1Loc);

      const slot0Value = await getStorageAt(
        dynamics.target,
        slot0Loc,
        slot0Len
      );
      const slot1Value = await getStorageAt(
        dynamics.target,
        slot1Loc,
        slot1Len
      );

      console.log(`Slot 0 value: ${slot0Value}`);
      console.log(`Slot 1 value: ${slot1Value}`);

      expect(ethers.toUtf8String(slot0Value)).to.equal(
        "deadbeef000000000000000000000000beefc0de"
      );
      expect(ethers.toUtf8String(slot1Value)).to.equal(
        "deadbeef000000000000000000000000fee1dead"
      );
    });
  });
});
