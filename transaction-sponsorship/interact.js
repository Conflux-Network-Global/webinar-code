/* eslint-disable */

const { Conflux, Account } = require("js-conflux-sdk");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

async function main() {
  const cfx = new Conflux({
    url: "http://testnet-jsonrpc.conflux-chain.org:12537",
    defaultGasPrice: 100,
    defaultGas: 1000000,
    // logger: console,
  });

  console.log(cfx.defaultGasPrice); // 100
  console.log(cfx.defaultGas); // 1000000

  // ================================ Account =================================
  const account = Account.random(); //create random account
  // const account = cfx.Account().random(); // create new account instance
  console.log(account.address);

  const balance = await cfx.getBalance(account.address);
  console.log("Balance ", Number(balance));

  // ================================ Contract ================================
  // create contract instance
  const contract = cfx.Contract({
    abi: require("./contract/abi.json"), //can be copied from remix
    address: "0x8272bc455a2afd32040945d95646b166859e3b70",
  });

  // // interact with contract
  // const receipt0 = await contract
  //   .setValue(20)
  //   .sendTransaction({ from: account });
  // console.log(receipt0);

  // check value from contract
  const receipt1 = await contract.value().call({ from: account });
  console.log(Number(receipt1));
}

main().catch((e) => console.error(e));
