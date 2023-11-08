const { ethers } = require('hardhat');
const fs         = require('fs');
const path       = require('path');

require('dotenv').config();

const OUTPUT = "./deployments";

(async () => {
  const signer = new ethers.Wallet(process.env.PK);

  // Base
  for (const [ name, opts ] of Object.entries({
    GenericFactory: {
      gasLimit: 472196n,
      gasPrice: ethers.parseUnits('11', 'gwei')
    },
    GenericFactory_shanghai: {
      gasLimit: 472320n,
      gasPrice: ethers.parseUnits('100', 'gwei')
    },
  })) {
    await ethers.getContractFactory(name)
    .then(factory => signer.signTransaction({
        data:     factory.bytecode,
        type:     0,
        nonce:    0n,
        value:    0n,
        ...opts,
      })
        .then(ethers.Transaction.from)
        .then(tx => ({
          version:  name,
          address:  ethers.getCreateAddress(tx),
          deployer: tx.from,
          cost:     (tx.gasLimit * tx.gasPrice).toString(), // JSON.stringify doesn't support bigint
          tx:       tx.serialized,
          abi:      JSON.parse(factory.interface.formatJson()),
        })
      )
    )
    .then(details => {
      fs.mkdirSync(OUTPUT, { recursive: true });
      fs.writeFileSync(path.join(OUTPUT, name + '.json'), JSON.stringify(details));
    });
  }
})().catch(console.error);
