const axios = require('axios');

const ALCHEMY_URL = "https://eth-mainnet.g.alchemy.com/v2/1SO4gwtpF1makgZAUl8XZH8-MY0Zc_SL";

axios.post(ALCHEMY_URL, {
    jsonrpc : "2.0",
    id : "1",
    method: "eth_getBalance",
    params: ["0xe6a7a1d47ff21b6321162aea7c6cb457d5476bca", "latest"]
}).then((response) => {
    console.log(BigInt(response.data.result));
})