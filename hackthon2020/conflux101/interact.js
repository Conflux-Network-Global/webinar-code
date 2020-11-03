const { Conflux } = require("js-conflux-sdk");
require("dotenv").config();
const { abi } = require("./StudioDemo/build/contracts/Coin.json");

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const main = async () => {
  const cfx = new Conflux({
    url: "http://test.confluxrpc.org",
    logger: console
  });

  const account = cfx.wallet.addPrivateKey(PRIVATE_KEY);

  const contract = cfx.Contract({
    abi,
    address: "0x8b824aa3b1965a8ca0f25d47455c0489dbd21e7d"
  });

  const balance = await contract.balanceOf(account.address);
  console.log(String(balance));

  // const transaction = await contract
  //   .mint(account.address, 10000)
  //   .sendTransaction({ from: account })
  //   .executed();
};

main().catch(e => console.log(e));
