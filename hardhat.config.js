require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  solidity: "0.8.13",
  // paths: {
  //   artifacts: "./artifacts",
  //   sources: "./contracts",
  //   cache: "./cache",
  //   tests: "./test"
  // },
  networks: {

	// ganache: {
	// 	url: "http://127.0.0.1:8545",
	// 	accounts: [`${process.env.PRIVATE_KEY_GANACHE1}`, `${process.env.PRIVATE_KEY_GANACHE2}`]
	// },
  	ropsten: {
  		url: `https://ropsten.infura.io/v3/${process.env.INFURA_ID}`,
  		accounts: [`${process.env.PRIVATE_KEY}`]
  	}
  }
};