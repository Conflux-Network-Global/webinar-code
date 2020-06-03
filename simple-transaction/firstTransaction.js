const { Conflux, util } = require("js-conflux-sdk");
require("dotenv").config();

const cfx = new Conflux({
  url: "http://testnet-jsonrpc.conflux-chain.org:12537",
  defaultGasPrice: 100, // The default gas price of your following transactions
  defaultGas: 1000000, // The default gas of your following transactions
  logger: console,
});

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const account = cfx.Account(PRIVATE_KEY); // create account instance
const receiver = "0x15fd1E4F13502b1a8BE110F100EC001d0270552d"; //sending to self

let txParams = {
  from: account, // from account instance and will by sign by account.privateKey
  // nonce
  // gasPrice
  // gas
  to: receiver, // accept address string or account instance
  value: util.unit.fromCFXToDrip(0.125), // use unit to transfer from 0.125 CFX to Drip
  // storageLimit
  // epochHeight
  // data
};

async function main() {
  const txHash = await cfx.sendTransaction(txParams);
  console.log(txHash);
}

main().catch(e => console.error(e));
