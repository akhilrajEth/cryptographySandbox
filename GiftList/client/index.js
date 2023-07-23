const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const readline = require("readline");

const serverUrl = 'http://localhost:1225';

async function main() {
  //Construct Merkle Proof
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  const name = await new Promise((resolve) => {
    rl.question("please enter your name: ", (input) => {
      resolve(input);
    });
  });

  const merkleTree = new MerkleTree(niceList);
  console.log(merkleTree.getRoot())
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
        proof,
        name,
  });

  console.log({ gift });
 
}

main();