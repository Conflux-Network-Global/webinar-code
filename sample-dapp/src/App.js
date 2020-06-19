import React from "react";
import { util } from "js-conflux-sdk";
import "./App.css";

const status = {
  INSTALL: "Install Conflux Portal",
  CONNECT: "Connect to Conflux Portal",
  SEND: "Send Transaction",
};

function App() {
  const [state, setState] = React.useState(status.INSTALL);
  const [disabled, setDisabled] = React.useState(false);
  const [txReceipt, setTxReceipt] = React.useState("");

  //check if injected provider exists
  React.useEffect(() => {
    if (window.conflux) {
      setState(status.CONNECT);
    }
  }, []);

  const onClick = async () => {
    try {
      setDisabled(true);
      switch (state) {
        case status.CONNECT: //connect with conflux portal
          await window.conflux.enable();
          setState(status.SEND);
          break;
        case status.SEND: //send transaction to self on button click through conflux portal
          const tx = {
            gas: util.format.hex(2000000),
            gasPrice: util.unit.fromGDripToDrip(0.0000001),
            from: window.conflux.selectedAddress,
            to: window.conflux.selectedAddress,
            value: util.unit.fromCFXToDrip(1)
          };
          const txResult = await window.confluxJS.sendTransaction(tx);
          setTxReceipt(txResult);
          break;
        default: //if conflux portal is not installed, button opens link for installation
          window.open("https://portal.conflux-chain.org/");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button className="App-button" onClick={onClick} disabled={disabled}>
          {state}
        </button>
        {txReceipt && <div className="App-details">Transaction ID: {txReceipt}</div>}
      </header>
    </div>
  );
}

export default App;
