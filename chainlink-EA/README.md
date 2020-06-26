# Chainlink External Adapter Connected to Conflux Network

How to connect send information from Chainlink to the Conflux Network using an External Adapter (EA).

See information on how to setup a Chainlink node and the corresponding Conflux Network smart contract in the [../chainlink-EI/README.md](../chainlink-EI/README.md)

### Setting up an External Adapter using a ExpressJS server

For `CFX_externalAdapter`, a `.env` file is needed with a private key in order to perform on-chain transactions:

```
PRIVATE_KEY=<ACCOUNT PRIVATE KEY>
```

Then it can be started using `yarn start`.

### Connecting the EA to Conflux Network and the Chainlink Node

Bridge specifications for the Chainlinnk node:

```
Name: cfxSendTx
Endpoint: http://172.17.0.1:5000
```

Job spec for Chainlink node to connect to the EA:

```
{
  "initiators": [
    {
      "type": "web"
    }
  ],
  "tasks": [
    {
      "type": "HttpGet",
      "params": {
        "get": "http://worldtimeapi.org/api/ip"
      }
    },
    {
      "type": "JSONParse",
      "params": { "path": ["unixtime"] }
    },
    { "type": "EthUint256" },
    { "type": "cfxSendTx" }
  ]
}
```

### Resources:

- External Initiators for Conflux: https://github.com/Conflux-Network-Global/external-initiator
- Chainlink job specifications: https://docs.chain.link/docs/job-specifications
- Chainlink built-in adapters: https://docs.chain.link/docs/adapters
- Chainlink initiators: https://docs.chain.link/docs/initiators
- More advanced demo code: https://github.com/Conflux-Network-Global/demo-cfx-chainlink
