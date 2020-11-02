const { Conflux, Drip } = require("js-conflux-sdk");

require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

async function main() {
  const cfx = new Conflux({
    url: "http://main.confluxrpc.org",
    defaultGasPrice: 100,
    defaultGas: 1000000,
    logger: console
  });

  // ================================ Account =================================
  const account = cfx.wallet.addPrivateKey(PRIVATE_KEY); // create account instance
  console.log(account.address); // 0x1bd9e9be525ab967e633bcdaeac8bd5723ed4d6b

  // ================================ Contract ================================
  // create contract instance
  const contract = cfx.Contract({
    abi: burnABI, //can be copied from remix
    address: "0x8cc8aad43957ec1887b9ce2102c14fbf48960e7b" //test cETH contract
  });

  // // interact with contract
  const receipt = await contract
    .burn(
      account.address, //cfx address
      Drip.fromCFX(0.495), //amount to withdraw from conflux
      Drip.fromCFX(0.005), //amount of fees to pay (found in the corresponding shuttleflow token info)
      "0xAE36E9B5086B76Fd960b90A9cD33d5CFd7536267", //ethereum address
      "0x0000000000000000000000000000000000000000" //type of withdrawal (matching defi_address)
    )
    .sendTransaction({ from: account })
    .executed();
  console.log(receipt); // transaction receipt
}

//burn ABI interface to trigger CFX => ETH process
const burnABI = [
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "user_addr",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "expected_fee",
        type: "uint256"
      },
      {
        internalType: "string",
        name: "addr",
        type: "string"
      },
      {
        internalType: "address",
        name: "defi_relayer",
        type: "address"
      }
    ],
    name: "burn",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  }
];

main().catch(e => console.error(e));
