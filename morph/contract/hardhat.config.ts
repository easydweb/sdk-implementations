require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.24",
  networks: {
    morph: {
      url: process.env.MORPH_RPC_URL || "https://rpc-holesky.morphl2.io",
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};

