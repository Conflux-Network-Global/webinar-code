const crosschain = require("conflux-crosschain");

crosschain.test_conf = {
  // usdt_addr: // usdt address on rinkeby testnet,
  node_url: "https://dev.shuttleflow.io/"
};
const test_conf = crosschain.test_conf;

const main = async () => {
  const defiList = await crosschain.getDefiList(test_conf.node_url); //returns options for defi address
  console.log(defiList);

  const tokenList = await crosschain.getTokenList(test_conf.node_url); //returns information on supported tokens/contracts
  console.log(tokenList);
};

main();
