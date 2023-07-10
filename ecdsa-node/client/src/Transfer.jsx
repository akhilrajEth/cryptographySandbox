import { useState } from "react";
import server from "./server";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";
import * as secp from "ethereum-cryptography/secp256k1";

//need to add a signing method, in beginning of transfer to authenticate+authorize sender

function Transfer({ address, setBalance, privateKey}) {
  //Signature: Hash the message's bytes, privateKey, get recoveryBit option
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    const msgHash = toHex(keccak256(utf8ToBytes(sendAmount)));
    const signature = secp.secp256k1.sign(msgHash, privateKey);
    const signatureHex = `${signature.r.toString(16)}${signature.s.toString(16)}`;
    console.log("Sender:", address);
    console.log("Signature:", signatureHex);
    console.log("msgHash:", msgHash);
    //need to figure out how to pass Signature object to server
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        msgHash,
        signature: signatureHex,
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
