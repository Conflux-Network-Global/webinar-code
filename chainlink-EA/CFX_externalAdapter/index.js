const express = require("express");
const bodyParser = require("body-parser");
const { Conflux } = require("js-conflux-sdk");
require("dotenv").config();

const app = express();
const port = 5000;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const main = () => {
  app.use(bodyParser.json());

  //POST endpoint for handling CL node calls
  app.post("/", async (req, res) => {
    console.log("POST Data: ", req.body);
    const output = { id: req.body.id };

    //create conflux instance
    const cfx = new Conflux({
      url: "http://testnet-jsonrpc.conflux-chain.org:12537",
      defaultGasPrice: 100,
      defaultGas: 1000000,
      logger: console,
    });

    const account = cfx.Account(PRIVATE_KEY); // create account instance
    console.log(account.address); // 0x1bd9e9be525ab967e633bcdaeac8bd5723ed4d6b

    // create contract instance
    const contract = cfx.Contract({
      abi: require("../../chainlink-EI/contractInteraction/contract/abi.json"), //can be copied from remix
      address: "0x80b5f9f22141268d2a1ea50d65eb2838922e3179",
    });

    // interact with contract
    const receipt = await contract.update(req.body.data.result)
      .sendTransaction({ from: account, chainId: 1 }).executed();
    console.log(receipt);

    res.status(200).send(output);
  });

  app.listen(port, () => console.log(`${port} is active`));

  process.on("SIGINT", () => {
    process.exit();
  });
};

main();
