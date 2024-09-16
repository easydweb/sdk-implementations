import { AarcCore } from "@aarc-xyz/core-viem"
import { createWalletClient, custom } from "viem"
import { switchChain } from "viem/actions"
import { arbitrum } from "viem/chains"

const getWalletClient = async () => {
    const [account] = await (window as any).ethereum.request({ method: 'eth_requestAccounts' })

    const walletClient = createWalletClient({
        chain: arbitrum,
        account,
        transport: custom((window as any).ethereum)
    })

    switchChain(walletClient, arbitrum);

    return walletClient
}

const aarcSDK = new AarcCore(process.env.NEXT_PUBLIC_AARC_API_KEY!)

export { getWalletClient, aarcSDK }