const ethers = require("ethers");
require('dotenv').config();

async function main(){
    let artifacts = await hre.artifacts.readArtifact("Faucet");

    //set up node provider
    const url = process.env.GOERLI_URL;
    const provider = new ethers.providers.JsonRpcProvider(url);

    //set up wallet
    let privateKey = process.env.PRIVATE_KEY;
    let wallet = new ethers.Wallet(privateKey, provider);

    //create contract instance
    let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);
    
    let faucet = await factory.deploy();

    console.log("Faucet deployed at: ", faucet.address);
    await faucet.deployed();
}

main()
.then(() => process.exit(0))
.catch(error => {
    console.error(error);
    process.exit(1);
})