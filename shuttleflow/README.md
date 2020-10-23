# ShuttleFlow (Using Cross-Chain Assets)

### Files
`shuttleflowInfo` allows a user to query the shuttleflow endpoint to check what assets can be wrapped and their corresponding fees/contracts

`userInfo` allows a user to check which address to send assets to on ETH and the status of cross-chain transactions

`withdraw2eth` allows a user to burn cTokens on Conflux to send the wrapped asset back to themselves on ETH

### Links
Oceanus <=> Rinkeby Endpoint: [https://dev.shuttleflow.io/](https://dev.shuttleflow.io/)

Documentation: [https://conflux-dev.github.io/conflux-dex-docs/shuttleflow/](https://conflux-dev.github.io/conflux-dex-docs/shuttleflow/)

Additional documentation: https://github.com/Conflux-Dev/conflux-dex-docs/tree/master/docs/shuttleflow

SDK: [https://www.npmjs.com/package/conflux-crosschain](https://www.npmjs.com/package/conflux-crosschain)

### Notes
`.env` is required to run the various code pieces. See below for example contents:
```
PRIVATE_KEY=0x<insert key here>
```
