const crosschain = require("conflux-crosschain");

crosschain.test_conf = {
  // usdt_addr: // usdt address on rinkeby testnet,
  node_url: "https://dev.shuttleflow.io/"
};
const test_conf = crosschain.test_conf;
const cfx_address = "0x15fd1E4F13502b1a8BE110F100EC001d0270552d"; //copnflux address
const defi_address = "0x0000000000000000000000000000000000000000"; //defi_address for generating wrapped token (not for DEX)

const main = async () => {
  const ethWallet = await crosschain.getUserReceiveWalletEth(
    cfx_address,
    defi_address,
    test_conf.node_url
  );
  console.log(ethWallet); //show address for deposits on ETH

  const status = await crosschain.getUserOperationList(
    {
      address: cfx_address, // for example
      // type: "mint", //show transactions (ETH => CFX)
      type: "burn", //show burn transactions (CFX => ETH)
      token: "eth", //token type dependent on token list
      defi: defi_address,
      status: ["finished", "doing"]
    },
    0, //number to skip
    100, //max number of entries
    test_conf.node_url
  );
  console.log(status); //show previous cross-chain transactions
};

main();
