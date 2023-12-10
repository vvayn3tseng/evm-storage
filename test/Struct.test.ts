import { expect } from "chai";
import { ethers } from "hardhat";
import { align, deployContract } from "./utils";

describe("All", async function () {
  describe("struct", async function () {
    it("should get the correct value from storage", async function () {
      const contract = await deployContract("Struct");

      const expectedValue = [align("deadbeef", 64), align("deadc0de", 64)];

      for (let i = 0; i < 2; i++) {
        const slot = await ethers.provider.getStorage(contract.target, i);
        console.log(`Slot ${i}: ${slot}`);

        expect(slot).to.equal("0x" + expectedValue[i]);
      }
    });
  });
});
