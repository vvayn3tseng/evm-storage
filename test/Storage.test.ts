import { expect } from "chai";
import { ethers } from "hardhat";
import { align, deployContract } from "./utils";

describe("All", async function () {
  describe("just 32 bytes", async function () {
    it("should get the correct value from storage", async function () {
      const signer = (await ethers.getSigners())[0];
      console.log("signer: ", signer.address);
      const equal32Bytes = await deployContract("Equal32Bytes");

      const expectedValue = [
        align("deadbeef", 64),
        align("deadc0de", 64),
        align("f39Fd6e51aad88F6F4ce6aB8827279cffFb92266".toLowerCase(), 64),
      ];
      for (let i = 0; i < 3; i++) {
        const slot = await ethers.provider.getStorage(equal32Bytes.target, i);
        console.log(`Slot ${i}: ${slot}`);

        expect(slot).to.equal("0x" + expectedValue[i]);
      }
    });
  });

  describe("less than 32 bytes", async function () {
    async function deployContract() {
      const LessThan32Bytes = await ethers.getContractFactory(
        "LessThan32Bytes"
      );
      const lessThan32Bytes = await LessThan32Bytes.deploy();
      await lessThan32Bytes.waitForDeployment();

      return lessThan32Bytes;
    }

    it("should get the correct value from storage", async function () {
      const lessThan32Bytes = await deployContract();

      const expectedValue = [
        align("deadc0de", 32) + align("deadbeef", 32),
        align("", 16) +
          align("c0de", 16) +
          align("beef", 16) +
          align("dead", 16),
        align("", 16) + align("f00d", 16) + align("fee1dead", 32),
      ];
      for (let i = 0; i < 3; i++) {
        const slot = await ethers.provider.getStorage(
          lessThan32Bytes.target,
          i
        );
        console.log(`Slot ${i}: ${slot}`);
        expect(slot).to.equal("0x" + expectedValue[i]);
      }
    });
  });
});
