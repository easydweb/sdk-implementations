import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AptosWalletProvider } from "@razorlabs/wallet-kit";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AptosWalletProvider>
      <App />
    </AptosWalletProvider>
  </React.StrictMode>
);
