const {Alchemy, Network, Wallet, Utils} = require('alchemy-sdk');
require('dotenv').config();

const {TEST_PRIVATE_KEY, TEST_API_KEY} = process.env;

const settings = {
    apiKey: TEST_API_KEY,
    network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(settings);

let wallet = new Wallet(TEST_PRIVATE_KEY);

async function main(){
    const nonce = await alchemy.core.getTransactionCount(
        wallet.address,
        'latest',
    );

    let transaction = {
        to: "0xeb26a2503158f80561c0231424c6e88fd8c252b5",
        value: Utils.parseEther('.001'),
        gasLimit: "21000",
        maxPriorityFeePerGas: Utils.parseUnits('5', 'gwei'),
        maxFeePerGas: Utils.parseUnits('20', 'gwei'),
        nonce: nonce,
        type: 2,
        chainId: 5, // Goerli testnet id
    };

    let rawTransaction = await wallet.signTransaction(transaction);
    console.log('Raw Transaction: ', rawTransaction);
    let tx = await alchemy.core.sendTransaction(rawTransaction);
    console.log(`https://goerli.etherscan.io/tx/${tx.hash}`);
}

main();