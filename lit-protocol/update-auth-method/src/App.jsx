import "./App.css";
import { useState } from "react";
import {
    mintPKPUsingEthWallet,
    transferPKPToItself,
    fundPKP,
    addAnotherAuthToPKP,
    RemoveInitialAuthMethod,
    seeAuthMethods,
    pkpSignTx,
} from "./utils";

function App() {
    const [ethAddress, setEthAddress] = useState("");

    async function mintPKPCall() {
        const pkp = await mintPKPUsingEthWallet();
        setEthAddress(pkp?.ethAddress);
    }

    return (
        <div className="App">
            <h2>LIT DEMO</h2>

            <p>pkp eth address, {ethAddress}</p>

            <button onClick={mintPKPCall}>Mint PKP With First Auth</button>

            <button onClick={transferPKPToItself}>
                Transfer PKP To Itself
            </button>

            <button onClick={fundPKP}>Fund PKP</button>

            <button onClick={addAnotherAuthToPKP}>Add Another Auth</button>

            <button onClick={RemoveInitialAuthMethod}>
                Remove Initial Auth
            </button>

            <button onClick={seeAuthMethods}>See Permitted Method</button>

            <button onClick={pkpSignTx}>PKP Sign</button>
        </div>
    );
}

export default App;
