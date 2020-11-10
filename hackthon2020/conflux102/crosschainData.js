const crosschain = require("conflux-crosschain");

crosschain.test_conf = {
  node_url: "http://23.102.224.244:8101/"
};

const test_conf = crosschain.test_conf;
const cfx_addr = "0x15fd1E4F13502b1a8BE110F100EC001d0270552d";
const defi_addr = "0x0000000000000000000000000000000000000000";

const main = async () => {
  // const defiList = await crosschain.getDefiList(test_conf.node_url);
  // console.log(defiList);
  //
  // //get supported token list
  // const tokenList = await crosschain.getTokenList(test_conf.node_url);
  // console.log(tokenList);
  //
  // //get deposit wallet address for ETH assets
  // const ethWallet = await crosschain.getUserReceiveWalletEth(
  //   cfx_addr,
  //   defi_addr,
  //   test_conf.node_url
  // );
  // console.log(ethWallet);

  //get shuttleflow transactions
  const status = await crosschain.getUserOperationList(
    {
      address: cfx_addr,
      type: "burn", //"mint"
      token: "0xd483b49f2d55d2c53d32be6eff735cb001880f79",
      defi: defi_addr,
      status: ["finished", "doing"]
    },
    0, //starting index
    100, //total entries
    test_conf.node_url
  );
  console.log(status);
};

main();
