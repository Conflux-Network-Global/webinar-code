import React from "react";
import { Drip } from "js-conflux-sdk";

const status = {
	INSTALL: "Install Conflux Portal",
	CONNECT: "Connect to Conflux Portal",
	SEND: "Send Transaction",
};

function App() {
	const [state, setState] = React.useState(status.INSTALL);
	const [disabled, setDisabled] = React.useState(false);
	const [txReceipt, setTxReceipt] = React.useState("");

	React.useEffect(() => {
		if (window.conflux) {
			setState(status.CONNECT);
		}
	}, []);

	const onClick = async () => {
		try {
			setDisabled(true);
			switch (state) {
				case status.CONNECT:
					await window.conflux.enable();
					setState(status.SEND);
					break;
				case status.SEND:
					const tx = {
						from: window.conflux.selectedAddress,
						to: window.conflux.selectedAddress,
						value: Drip.fromCFX(1)
					};
					const txResult = await window.confluxJS.sendTransaction(tx);
					setTxReceipt(txResult);
					break;
				default:
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
				{txReceipt && <div className="App-details">
					Transaction ID: {txReceipt}
				</div>}
			</header>
		</div>
	);
}

export default App;