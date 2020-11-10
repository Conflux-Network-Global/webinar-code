const { Conflux, Drip } = require("js-conflux-sdk");
require("dotenv").config();

const main = async () => {
  const cfx = new Conflux({
    url: "http://test.confluxrpc.org",
    logger: console
  });

  const account = cfx.wallet.addPrivateKey(process.env.PRIVATE_KEY);
  console.log(account.address);

  const contract = cfx.InternalContract("Staking");

  // //deposit for staking
  // const depositTx = await contract
  //   .deposit(Drip.fromCFX(100))
  //   .sendTransaction({ from: account })
  //   .executed();
  // console.log(depositTx);

  // withdraw tokens from staking
  const withdrawTx = await contract
    .withdraw(Drip.fromCFX(100))
    .sendTransaction({ from: account })
    .executed();
  console.log(withdrawTx);
};

main().catch(e => console.log(e));
