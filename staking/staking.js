const { Conflux, Drip } = require("js-conflux-sdk");
require("dotenv").config();
const staking = require("./staking.json");

async function main() {
  //conflux initialization
  const cfx = new Conflux({
    url: "http://test.confluxrpc.org",
    defaultGasPrice: 100, // The default gas price of your following transactions
    defaultGas: 1000000, // The default gas of your following transactions
    logger: console
  });

  //account initialization
  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  const account = cfx.wallet.addPrivateKey(PRIVATE_KEY); // create account instance

  //staking contract initialization
  const contract = cfx.Contract({
    abi: staking.abi, //can be copied from remix
    address: "0x0888000000000000000000000000000000000002"
  });

  //deposit CFX
  const tx0 = await contract
    .deposit(Drip.fromCFX(1))
    .sendTransaction({ from: account })
    .executed();
  console.log(tx0);

  // //check balance
  // const result = await contract.getStakingBalance(account.address);
  // console.log(String(result));

  // //withdraw CFX
  // const tx1 = await contract
  //   .withdraw(Drip.fromCFX(1))
  //   .sendTransaction({ from: account })
  //   .executed();
  // console.log(tx1);
}

main().catch(e => console.error(e));
