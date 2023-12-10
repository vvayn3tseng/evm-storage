import { ethers } from "hardhat";

export function align(str: string, length: number): string {
  return "0".repeat(length - str.length) + str;
}

export async function deployContract(name: string) {
  const Contract = await ethers.getContractFactory(name);
  const contract = await Contract.deploy();
  await contract.waitForDeployment();

  return contract;
}
