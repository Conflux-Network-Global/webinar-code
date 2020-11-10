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

  const contract = cfx.InternalContract("SponsorWhitelistControl");

  //sponsor anybody for the listed contract (only called by admin - contract deployer)
  const tx0 = await contract
    .addPrivilegeByAdmin("0x8b824aa3b1965a8ca0f25d47455c0489dbd21e7d", [
      "0x0000000000000000000000000000000000000000"
    ])
    .sendTransaction({ from: account })
    .executed();

  //set sponsor for gas
  await contract
    .setSponsorForGas(
      "0x8b824aa3b1965a8ca0f25d47455c0489dbd21e7d",
      Drip.fromCFX(0.001)
    )
    .sendTransaction({ from: account, value: Drip.fromCFX(2) })
    .executed();

  //set sponsor for collateral
  await contract
    .setSponsorForCollateral("0x8b824aa3b1965a8ca0f25d47455c0489dbd21e7d")
    .sendTransaction({ from: account, value: Drip.fromCFX(5) }).executed();
};

main().catch(e => console.log(e));
