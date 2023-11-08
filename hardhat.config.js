require("@nomicfoundation/hardhat-toolbox");
require('@nomicfoundation/hardhat-ethers');

module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.6.4',
        settings: {
          optimizer: { enabled: true, runs: 200 },
        },
      },
      {
        version: '0.8.22',
        settings: {
          evmVersion: 'shanghai',
          optimizer: { enabled: true, runs: 200 },
          viaIR: true
        }
      }
    ],
  },
};

require('debug')('compilation')(JSON.stringify(module.exports.solidity.compilers, null, 2))
