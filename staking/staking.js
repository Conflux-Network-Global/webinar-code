const { Conflux, util } = require("js-conflux-sdk");
require("dotenv").config();
const staking = require("./staking.json");

async function main() {
  //conflux initialization
  const cfx = new Conflux({
    url: "http://testnet-jsonrpc.conflux-chain.org:12537",
    defaultGasPrice: 100, // The default gas price of your following transactions
    defaultGas: 1000000, // The default gas of your following transactions
    logger: console
  });

  //account initialization
  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  const account = cfx.Account(PRIVATE_KEY); // create account instance

  //staking contract initialization
  const contract = cfx.Contract({
    abi: staking.abi, //can be copied from remix
    address: "0x0888000000000000000000000000000000000002"
  });

  //deposit CFX
  const tx0 = await contract
    .deposit(util.unit.fromCFXToDrip(1))
    .sendTransaction({ from: account })
    .executed();
  console.log(tx0);

  // //check balance
  // const result = await contract.getStakingBalance(account.address);
  // console.log(String(result));

  // //withdraw CFX
  // const tx1 = await contract
  //   .withdraw(util.unit.fromCFXToDrip(1))
  //   .sendTransaction({ from: account })
  //   .executed();
  // console.log(tx1);
}

main().catch(e => console.error(e));
