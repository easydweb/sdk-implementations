import { getDefaultWallets, getDefaultConfig } from "@rainbow-me/rainbowkit"
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets"
import {
  arbitrum,
  arbitrumSepolia,
  localhost,
  mainnet,
} from "wagmi/chains"

const { wallets } = getDefaultWallets()

export const WALLETCONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? ""
if (!WALLETCONNECT_PROJECT_ID) {
  console.warn(
    "You need to provide a NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID env variable"
  )
}
export const config = getDefaultConfig({
  appName: "RainbowKit demo",
  projectId: WALLETCONNECT_PROJECT_ID,
  wallets: [
    ...wallets,
    {
      groupName: "Other",
      wallets: [argentWallet, trustWallet, ledgerWallet],
    },
  ],
  chains: [
    mainnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [arbitrumSepolia, arbitrum, localhost]
      : []),
  ],
  ssr: true,
})
