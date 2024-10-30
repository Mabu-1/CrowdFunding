import "@nomiclabs/hardhat-ethers";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

const config = {
  solidity: "0.8.20",
  networks: {
    polygonMainnet: {
      url: import.meta.env.INFURA_URL,
      accounts: [`0x${import.meta.env.INFURA_PRIVATE_KEY}`],
    },
    polygonMumbai: {
      url: import.meta.env.INFURA_URL_TESTNET,
      accounts: [`0x${import.meta.env.INFURA_PRIVATE_KEY}`],
    },
  },
};

export default config;
