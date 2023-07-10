const secp = require("ethereum-cryptography/secp256k1");
const keccak = require("ethereum-cryptography/keccak")
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = secp.secp256k1.utils.randomPrivateKey();
console.log("rando private key: ", toHex(privateKey));

const publicKey = secp.secp256k1.getPublicKey(privateKey);

console.log("public key: ", toHex(publicKey));

//Ethereum public addy
const keccakHash = keccak.keccak256(publicKey);
const publicAddress = keccakHash.subarray(-20); //get last 20 bytes from uint8array, then hex
console.log("public address: ", toHex(publicAddress));

