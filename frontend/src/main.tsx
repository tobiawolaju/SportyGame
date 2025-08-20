import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PrivyProvider } from "@privy-io/react-auth";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrivyProvider
      appId="cmef0aah700lsl70bie6i68i6"
      config={{
        appearance: { theme: "dark" },
        embeddedWallets: { createOnLogin: "all-users" },
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PrivyProvider>
  </React.StrictMode>
);
