const { Conflux, Drip } = require("js-conflux-sdk");
require("dotenv").config();
const { abi } = require("../conflux101/StudioDemo/build/contracts/Coin.json");

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const main = async () => {
  const cfx = new Conflux({
    url: "http://test.confluxrpc.org",
    logger: console
  });

  const account = cfx.wallet.addPrivateKey(PRIVATE_KEY);

  //setup contract instance
  const contract = cfx.Contract({
    abi,
    address: "0x8b824aa3b1965a8ca0f25d47455c0489dbd21e7d"
  });

  //use the ETH private key to get a new account (could use any other ways to generate a random account)
  const accountRandom = cfx.wallet.addPrivateKey(process.env.ETH_KEY);
  console.log(accountRandom.address);

  //send tokens from origin account
  const transaction = await contract
    .send(accountRandom.address, 1000)
    .sendTransaction({ from: account })
    .executed();

  //send tokens back (with no CFX in account for gas)
  const tx = await contract
    .send(accountRandom.address, 1000)
    .sendTransaction({ from: accountRandom })
    .executed();
  //sponsored account on confluxscan (no CFX and was still able to send tx)
  // https://testnet.confluxscan.io/address/0x1e36e9b5086b76fd960b90a9cd33d5cfd7536267?accountAddress=0x1e36e9b5086b76fd960b90a9cd33d5cfd7536267
};

main().catch(e => console.log(e));
