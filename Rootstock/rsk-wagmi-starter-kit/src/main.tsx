import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Providers from "./config/providers";
import "./polyfills";
import "@rainbow-me/rainbowkit/styles.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
