# Conflux Truffle Demo

Note: these instructions are written for a demo done in Linux (commands in Windows and Mac OS may vary)

Installed prerequisites:
* npm - [node package manager (javascript)](https://nodejs.org/en/)
* docker - [containerized applications](https://docs.docker.com/get-docker/)

## Installing Components
Install Conflux Truffle:
```
npm install -g conflux-truffle
```
Test to make sure it is installed correctly (this will return information on the available commands):
```
cfxtruffle -h
```

Install the Conflux node docker container:
```
docker pull confluxchain/conflux-rust
```
Start up the docker container
```
docker run -p 12537:12537 --name cfx-node confluxchain/conflux-rust
```

## Start the Metacoin project
Download and unpack an existing truffle project to deploy
```
mkdir MetaCoin
cd MetaCoin
cfxtruffle unbox metacoin
```

Explore all the files and you'll see various configurations, smart contracts, and deployment code!

## Deploy the Metacoin project
Modify the `truffle-config.js` file to include the following:
```js
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 12537,
      type: "conflux",
      network_id: "*"
    }
  }
};
```

Compile the Metacoin smart contracts
```
cfxtruffle compile
```

Deploy the Metacoin smart contracts
```
cfxtruffle deploy
```

## Shutdown Docker Container
Once complete (or if you need to restart everything) use the following commands to stop the local node docker container:
```
docker kill cfx-node
docker rm cfx-node
```

## Potential Issues
#### Issue: Missing `from` parameter.
```
Error: Expected parameter 'from' not passed to function.
```
**Solution:** Wait a few minutes before retrying, this error usually occurs when the docker node is still starting up.

#### Issue: Account not unlocked
```
Error:  *** Deployment Failed ***
.
.
.
> error data: "failed to send transaction: \"failed to sign
transaction: NotUnlocked\"".
```
**Solution:** Wait a few minutes before retrying, this error occurs when the docker container start up has not finished unlocking the accounts.

## More Documentation
* https://www.npmjs.com/package/conflux-truffle
* https://github.com/Conflux-Chain/conflux-truffle
