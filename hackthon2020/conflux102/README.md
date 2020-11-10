# Conflux 102 Workshop

Workshop youtube: https://www.youtube.com/watch?v=OUPbYdlkrm0&list=PLoO0tXb18JZ_-uHgi-jJLfbtr6Tye_spz

Topics covered:
* ShuttleFlow (cross-chain asset bridge)
   * `getAETH`: get aETH on Kovan
   * `crosschainData`: get shuttleflow node info for Kovan/Testnet, get user data (ETH deposit address, logs)
   * `withdraw`: withdraw caETH from testnet to Kovan
* Staking
   * `staking`: how to stake and unstake
* Transaction Sponsorship Mechanism
   * `sponsor`: setting up sponsorship as admin, adding sponsor for gas and collateral
   * `testSponsor`: send tokens to a new address (w/ no CFX), new address sends back token (sponsored fees)

.env file configuration:
```
PRIVATE_KEY=<conflux private key>
ETH_ENDPOINT=<ETH endpoint url>
ETH_KEY=<eth private key>
```
