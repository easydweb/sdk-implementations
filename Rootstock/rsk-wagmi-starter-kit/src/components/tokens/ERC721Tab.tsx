import Button from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { abi } from "@/assets/abis/ERC721abi";
import { ERC721_ADDRESS } from "@/lib/constants";
import Loader from "@/components/ui/loader";
import { waitForTransactionReceipt } from "wagmi/actions";
import { rainbowkitConfig } from "@/config/rainbowkitConfig";

export default function ERC721Tab(): JSX.Element {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const { address } = useAccount();

  const { data, isLoading, isError, refetch } = useReadContract({
    abi,
    address: ERC721_ADDRESS,
    functionName: "balanceOf",
    args: [address],
  });

  const { writeContractAsync } = useWriteContract();

  const mintNFT = async () => {
    setLoading(true);
    try {
      const txHash = await writeContractAsync({
        abi,
        address: ERC721_ADDRESS,
        functionName: "safeMint",
        args: [address],
      });
      await waitForTransactionReceipt(rainbowkitConfig, {
        confirmations: 1,
        hash: txHash,
      });
      toast({
        title: "Successfully minted NFT",
        description: "A NRSK NFT has been minted to your wallet",
      });
      setLoading(false);

      refetch();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to mint NFT",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <Card className="mt-10 max-w-[600px]">
      <CardHeader>
        <p className="text-white/80 mb-4">Mint your own unique ERC-721 NFT.</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
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
            <p>Enter the NFT metadata and the claim your NFT</p>
          </div>

          <Button
            className="w-full"
            disabled={loading || !address}
            onClick={mintNFT}
          >
            {loading ? <Loader /> : "Mint NFT"}
          </Button>
        </div>
        <div className="bg-secondary p-4 rounded-lg mt-5">
          <h4 className="text-lg font-medium mb-2">Your Balance</h4>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">NFTs</span>
            <span className="font-medium">
              {address ? (
                isLoading ? (
                  <Loader />
                ) : isError ? (
                  "error"
                ) : (
                  Number(data as bigint)
                )
              ) : (
                0
              )}
            </span>
          </div>
          {Number(data as bigint) > 0 ? (
            <div className="mt-2">
              <a
                href="https://rootstock-testnet.blockscout.com/token/0x65C955e31F8BD0964127a0a2f4bc84ab298c71BE?tab=inventory"
                target="_blank"
                className="text-gray-500 underline mt-5"
              >
                See NFT(s)
              </a>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
