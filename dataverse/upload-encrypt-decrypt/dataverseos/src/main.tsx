import React from "react";
import ReactDOM from "react-dom/client";

import { DataverseContextProvider } from "@dataverse/hooks";
import { ModelParser, Output } from "@dataverse/model-parser";
import { WalletProvider } from "@dataverse/wallet-provider";

import App from "./App";
import app from "../output/app.json";
import pacakage from "../package.json";

import "./index.css";
import "./global.css";

const appVersion = pacakage.version;
const modelParser = new ModelParser(app as Output);
const walletProvider = new WalletProvider();

export const AppContext = React.createContext<{
  appVersion: string;
  modelParser: ModelParser;
  walletProvider: WalletProvider;
}>({
  appVersion,
  modelParser,
  walletProvider,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <DataverseContextProvider>
    <AppContext.Provider value={{ appVersion, modelParser, walletProvider }}>
      <App />
    </AppContext.Provider>
  </DataverseContextProvider>,
);
