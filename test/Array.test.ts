import { expect } from "chai";
import { ethers } from "hardhat";
import { align, deployContract } from "./utils";

describe("All", async function () {
  describe("fixed array", async function () {
    it("should get the correct value from storage", async function () {
      const fixedArray = await deployContract("FixedArray");

      const expectedValue = [
        align("deadbeef", 64),
        align("deadc0de", 64),
        align("fee1dead", 64),
      ];

      for (let i = 0; i < 3; i++) {
        const slot = await ethers.provider.getStorage(fixedArray.target, i);
        console.log(`Slot ${i}: ${slot}`);
        expect(slot).to.equal("0x" + expectedValue[i]);
      }
    });
  });

  describe("dynamic array", async function () {
    it("should get the correct value from storage", async function () {
      const dynamicArray = await deployContract("DynamicArray");

      const length = await ethers.provider.getStorage(dynamicArray.target, 1);
      console.log(`Length: ${length}`);

      // keccak256(position)
      const slotLocBase = ethers.keccak256("0x" + align("01", 64));
      console.log("slotBase: ", slotLocBase);
      for (let i = 0; i < 3; i++) {
        const slotLoc = BigInt(slotLocBase) + BigInt(i);
        const slot = await ethers.provider.getStorage(
          dynamicArray.target,
          slotLoc
        );
        console.log(`Slot ${i}: ${slot}`);
      }
    });
  });
});
