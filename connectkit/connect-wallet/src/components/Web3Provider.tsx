// src/components/Web3Provider.tsx
'use client';

import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { mainnet, bsc, polygon, fantom, optimism, base, arbitrum, avalanche } from "wagmi/chains";
import { useState } from "react";



const config = createConfig(
  getDefaultConfig({
    appName: "Multi-Chain dApp",
    chains: [mainnet, bsc, polygon, fantom, optimism, base, arbitrum, avalanche],
    transports: {
        /// example of public rpc
      [mainnet.id]: http("https://rpc.ankr.com/eth"),
      [bsc.id]: http("https://rpc.ankr.com/bsc"),
      [polygon.id]: http("https://rpc.ankr.com/polygon"),
      [fantom.id]: http("https://rpc.ankr.com/fantom"),
      [optimism.id]: http("https://rpc.ankr.com/optimism"),
      /// example of default rpc
      [base.id]: http(base.rpcUrls.default.http[0]),
      [arbitrum.id]: http(arbitrum.rpcUrls.default.http[0]),
      [avalanche.id]: http(avalanche.rpcUrls.default.http[0]),
    },
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  }),
);

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}