// Import the ABIs, see: https://docs.aave.com/developers/developing-on-aave/deployed-contract-instances
const LendingPoolABI = require("./assets/aaveLendingPool.json");
const Web3 = require("web3");
require("dotenv").config();

const main = async () => {
  let web3 = new Web3(process.env.ETH_ENDPOINT);
  web3.eth.accounts.wallet.add(process.env.ETH_KEY);

  // Input variables
  const lpAddress = "0x580D4Fdc4BF8f9b5ae2fb9225D584fED4AD5375c";
  const referralCode = "0";
  const ethAddress = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  const ethAmountinWei = web3.utils.toWei("1");

  // Make the deposit transaction via LendingPool contract
  const lpContract = new web3.eth.Contract(LendingPoolABI, lpAddress);
  await lpContract.methods
    .deposit(ethAddress, ethAmountinWei, referralCode)
    .send({
      from: web3.eth.accounts.wallet[0].address,
      value: ethAmountinWei,
      gas: "1000000"
    })
    .catch(e => {
      throw Error(`Error depositing to the LendingPool contract: ${e.message}`);
    });
};

main().catch(e => console.log(e));
