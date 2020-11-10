const { Conflux, Drip } = require("js-conflux-sdk");
require("dotenv").config();

const main = async () => {
  const cfx = new Conflux({
    url: "http://test.confluxrpc.org",
    logger: console
  });

  const account = cfx.wallet.addPrivateKey(process.env.PRIVATE_KEY);
  console.log(account.address);

  const contract = cfx.Contract({
    abi,
    address: "0x8e89251457da8801cd926eeeca68fead9cafd679" //address for caETH
  });

  const receipt = await contract
    .burn(
      account.address,
      Drip.fromCFX(1),
      Drip.fromCFX(0),
      "0xAE36E9B5086B76Fd960b90A9cD33d5CFd7536267",
      "0x0000000000000000000000000000000000000000"
    )
    .sendTransaction({ from: account })
    .executed();
};

const abi = [
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

main().catch(e => console.log(e));
