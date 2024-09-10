/**
 * Web3Provider Component
 *
 * This component sets up the necessary providers and configuration for Web3 functionality
 * in the dApp. It uses Wagmi for Web3 interactions, React Query for state management,
 * and ConnectKit for wallet connection.
 *
 * @component
 * @example
 * // Usage in _app.tsx or layout.tsx
 * import { Web3Provider } from '../components/Web3Provider';
 *
 * function MyApp({ Component, pageProps }) {
 *   return (
 *     <Web3Provider>
 *       <Component {...pageProps} />
 *     </Web3Provider>
 *   );
 * }
 */

'use client';

import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { mainnet, bsc, polygon, fantom, optimism, base, arbitrum, avalanche } from "wagmi/chains";
import { useState } from "react";

/**
 * Wagmi configuration
 * Sets up the Web3 configuration for multiple chains
 */
const config = createConfig(
  getDefaultConfig({
    // Name of your dApp
    appName: "Multi-Chain dApp",
    // Supported blockchain networks
    chains: [mainnet, bsc, polygon, fantom, optimism, base, arbitrum, avalanche],
    // RPC configurations for each chain
    transports: {
      // Public RPC endpoints (from Ankr)
      [mainnet.id]: http("https://rpc.ankr.com/eth"),
      [bsc.id]: http("https://rpc.ankr.com/bsc"),
      [polygon.id]: http("https://rpc.ankr.com/polygon"),
      [fantom.id]: http("https://rpc.ankr.com/fantom"),
      [optimism.id]: http("https://rpc.ankr.com/optimism"),
      // Default RPC endpoints
      [base.id]: http(base.rpcUrls.default.http[0]),
      [arbitrum.id]: http(arbitrum.rpcUrls.default.http[0]),
      [avalanche.id]: http(avalanche.rpcUrls.default.http[0]),
    },
    // WalletConnect project ID (must be set in environment variables)
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  }),
);

/**
 * Web3Provider component
 * Wraps the application with necessary providers for Web3 functionality
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped
 */
export function Web3Provider({ children }: { children: React.ReactNode }) {
  // Create a new QueryClient instance
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}