import { http, cookieStorage, createConfig, createStorage } from 'wagmi'
import { mainnet, sepolia, type Chain } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

// Custom Chain type with 'network' and 'iconUrl' properties
type CustomChain = Chain & { network?: string; iconUrl?: string }

// Morph Holesky Testnet configuration
const morph: CustomChain = {
  id: 2810,
  name: 'Morph',
  network: 'morph-holesky-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://rpc-quicknode-holesky.morphl2.io'] },
    default: { http: ['https://rpc-quicknode-holesky.morphl2.io'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer-holesky.morphl2.io' },
  },
  iconUrl: 'https://www.hackquest.io/_next/static/media/Morph_logo.10561d9a.png'
} as const

// Ethereum Holesky configuration
const ethereumHolesky: CustomChain = {
  id: 17000,
  name: 'Ethereum Holesky',
  network: 'ethereum-holesky',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://ethereum-holesky-rpc.publicnode.com/'] },
    default: { http: ['https://ethereum-holesky-rpc.publicnode.com/'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://holesky.etherscan.io' },
  },
} as const

export function getConfig() {
  const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID
  if (!projectId) {
    throw new Error("NEXT_PUBLIC_WC_PROJECT_ID environment variable is not set")
  }

  return createConfig({
    chains: [mainnet, sepolia, morph, ethereumHolesky],
    connectors: [
      injected(),
      coinbaseWallet(),
      walletConnect({ projectId }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
      [morph.id]: http(),
      [ethereumHolesky.id]: http(),
    },
  })
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}