import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-contract-sizer";
import "hardhat-gas-reporter";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-abi-exporter";

dotenv.config();

const env = {
  privateKey:
    process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
};

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      accounts: {
        accountsBalance: "100000000000000000000000", // 100,000 ETH
      },
    },
    dev: {
      url: "http://localhost:8545",
    },
  },
  contractSizer: {
    runOnCompile: true,
  },
  gasReporter: {
    enabled: true,
  },
};

export default config;
