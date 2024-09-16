"use client";

import { aarcSDK, getWalletClient } from "@/utils";

import { base, arbitrum } from "viem/chains";

export default function Home() {
  const bridgeFunds = async () => {
    const wallet = await getWalletClient();
    const [address] = await wallet.getAddresses();

    const transaction = await aarcSDK.performDeposit({
      toChainId: base.id,
      fromChainId: arbitrum.id,
      routeType: "value",
      userAddress: address,
      toTokenAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      fromTokenAddress: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      senderSigner: wallet,
      account: wallet.account,
      fromAmount: "500000",
      recipient: address,
    });
    console.log(transaction);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center">
        <span className="text-3xl">Call contract with SDK</span>
        <button
          className="p-2 bg-slate-700 text-white rounded-lg mt-4"
          onClick={bridgeFunds}
        >
          Bridge funds
        </button>
      </div>
    </main>
  );
}
