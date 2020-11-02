/* eslint-disable */

const { Conflux, Drip } = require("js-conflux-sdk");
require("dotenv").config();
const sponsor = require("./contract/sponsor.json");

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const sponsor_contract_addr = "0x0888000000000000000000000000000000000001";
const upper_bound = Drip.fromGDrip("10");
const sponsor_value = Drip.fromCFX("1");

async function main() {
  const cfx = new Conflux({
    url: "http://test.confluxrpc.org",
    defaultGasPrice: 100,
    defaultGas: 1000000,
    // logger: console,
  });

  console.log(cfx.defaultGasPrice); // 100
  console.log(cfx.defaultGas); // 1000000

  // ================================ Account =================================
  const account = cfx.wallet.addPrivateKey(PRIVATE_KEY); // create account instance
  console.log(account.address); // 0x1bd9e9be525ab967e633bcdaeac8bd5723ed4d6b

  // ================================ Deploy Contract ================================
  // const contract = cfx.Contract({
  //   abi: require('./contract/abi.json'), //can be copied from remix
  //   bytecode: require('./contract/bytecode.json'),
  // });
  //
  // // deploy the contract, and get `contractCreated`
  // const receipt = await contract.constructor()
  //   .sendTransaction({ from: account});
  // console.log(receipt);
  const CONTRACT_ADDRESS = "0x8272bc455a2afd32040945d95646b166859e3b70"; //previously deployed contract

  // ================================ SponsorContract ================================
  // create sponsor contract instance
  const sponsor_contract = cfx.Contract({
    abi: sponsor.abi, //sponsorship contract abi
    address: sponsor_contract_addr,
  });
  //
  // // setup sponsorship
  // const receipt = await sponsor_contract
  //   .setSponsorForGas(CONTRACT_ADDRESS, upper_bound)
  //   .sendTransaction({
  //     from: account,
  //     value: sponsor_value,
  //   }).executed();
  // console.log(receipt);

  const receipt2 = await sponsor_contract
    .set_sponsorForCollateral(CONTRACT_ADDRESS)
    .sendTransaction({
      from: account,
      value: sponsor_value,
    }).executed();
  console.log(receipt2);
}

main().catch((e) => console.error(e));
