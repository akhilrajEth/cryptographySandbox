const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");

app.use(cors());
app.use(express.json());

const balances = {
  "03f5554beac661e2f2924424851cc907aa9ea5e178bd553d1315c7249af160c782": 100,
  "0279cd45ceeb14858c4dec2d8c99df1834ea43ce2c804c41d0dd0ef4299b8a5260": 50,
  "03e9385721eb355a1a7517b83dde47a56523a0ddb9f5ae7c0a209807044c3008d2": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {

  //recover public addy from signature sent through req, and set sender to that
  const { sender, amount, msgHash, signature, recipient} = req.body;
  const isValid = secp.secp256k1.verify(signature, msgHash, sender);
  if (isValid){
    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  }
  else{
    res.status(400).send({message : "ur not him bruh!"})
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
