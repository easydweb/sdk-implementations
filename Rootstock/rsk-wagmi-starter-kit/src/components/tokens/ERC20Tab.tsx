import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { useState } from "react";
import Loader from "@/components/ui/loader";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { abi } from "@/assets/abis/ERC20abi";
import { useToast } from "@/components/ui/use-toast";
import { ERC20_ADDRESS } from "@/lib/constants";
import { rainbowkitConfig } from "@/config/rainbowkitConfig";
import { waitForTransactionReceipt } from "wagmi/actions";

export default function ERC20Tab(): JSX.Element {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const { address } = useAccount();

  const { data, isLoading, isError, refetch } = useReadContract({
    abi,
    address: ERC20_ADDRESS,
    functionName: "balanceOf",
    args: [address],
  });

  const { writeContractAsync } = useWriteContract();

  const mintTokens = async () => {
    setLoading(true);
    try {
      const txHash = await writeContractAsync({
        abi,
        address: ERC20_ADDRESS,
        functionName: "mint",
        args: [address, 100],
      });

      await waitForTransactionReceipt(rainbowkitConfig, {
        confirmations: 1,
        hash: txHash,
      });

      setLoading(false);
      toast({
        title: "Successfully minted tRSK tokens",
        description: "Refresh the page to see changes",
      });

      refetch();
    } catch (e) {
      toast({
        title: "Error",
        description: "Failed to mint tRSK tokens",
        variant: "destructive",
      });
      setLoading(false);
      console.error(e);
    }
  };

  return (
    <Card className="mt-10 max-w-[600px]">
      <CardHeader>
        <p className="text-white/80">
          This is a faucet of tRSK tokens (ERC-20 deployed on the Rootstock
          Testnet).
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center gap-4">
          <span className="font-neueMachinaBold px-2 pt-[5px] text-black rounded-full bg-fuchsia-500 grid place-items-center">
            01
          </span>
          <p>Make sure your wallet is connected.</p>
        </div>
        <div className="flex justify-center">
          <ConnectButton showBalance={false} chainStatus={"icon"} />
        </div>
        <div className="flex items-center gap-4">
          <span className="font-neueMachinaBold px-2 pt-[5px] text-black rounded-full bg-orange-400 grid place-items-center">
            02
          </span>
          <p>
            Press the button for the tRSK tokens to be deposited in your wallet.
          </p>
        </div>
        <div className="text-center z-[-10]">
          <Button disabled={loading || !address} onClick={mintTokens}>
            {loading ? <Loader /> : "Get tokens"}
          </Button>
        </div>
        <div className="bg-secondary p-4 rounded-lg">
          <h4 className="text-lg font-medium mb-2">Your Balance</h4>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">tRSK Tokens</span>
            <span className="font-medium">
              {address ? (
                isLoading ? (
                  <Loader />
                ) : isError ? (
                  "error"
                ) : (
                  Number(data).toLocaleString("en-US")
                )
              ) : (
                0
              )}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
