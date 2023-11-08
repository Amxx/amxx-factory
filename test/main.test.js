const { ethers } = require('hardhat');
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');

async function fixture() { /* empty */}

describe('Generic factory', function () {
    const code = ethers.randomBytes(2048);
    const salt = ethers.randomBytes(32);
    const call = ethers.randomBytes(256);

    beforeEach(async function () {
        await loadFixture(fixture);
    });

    for (const name of ['GenericFactory', 'GenericFactory_shanghai']) {
        it(name, async function () {
            const factory = await ethers.getContractFactory('GenericFactory').then(factory => factory.deploy());
            console.log('factory:', await factory.getAddress());
            console.log('predict:', await factory.predictAddressWithCall(code, salt, call));
            // console.log(await factory.deploymentTransaction().wait())
        });
    }
});
