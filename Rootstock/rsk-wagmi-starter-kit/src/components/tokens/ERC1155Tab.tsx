import Button from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ERC1155_ADDRESS } from "@/lib/constants";
import Loader from "@/components/ui/loader";
import { abi } from "@/assets/abis/ERC1155abi";
import { waitForTransactionReceipt } from "wagmi/actions";
import { rainbowkitConfig } from "@/config/rainbowkitConfig";

export default function ERC1155Tab(): JSX.Element {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);
  const { address } = useAccount();

  const { data, isLoading, isError, refetch } = useReadContract({
    abi,
    address: ERC1155_ADDRESS,
    functionName: "balanceOf",
    args: [address, 1],
  });

  const {
    data: data2,
    isLoading: isLoading2,
    isError: isError2,
    refetch: refetch2,
  } = useReadContract({
    abi,
    address: ERC1155_ADDRESS,
    functionName: "balanceOf",
    args: [address, 2],
  });

  const { writeContractAsync } = useWriteContract();

  const mintTokens = async () => {
    setLoading(true);
    try {
      const txHash = await writeContractAsync({
        abi,
        address: ERC1155_ADDRESS,
        functionName: "mint",
        args: [address, value],
      });
      await waitForTransactionReceipt(rainbowkitConfig, {
        confirmations: 1,
        hash: txHash,
      });

      toast({
        title: "Successfully minted",
        description: `${
          value === 1 ? "Type A" : "Type B"
        } tokens have been minted to your wallet`,
      });
      setLoading(false);
      refetch();
      refetch2();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to mint tokens",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <Card className="mt-10 max-w-[600px]">
      <CardHeader>
        <p className="text-white/80 mb-4">
          Mint tokens through ERC-1155 standard.
        </p>
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
            <p>Select the token type you'd like to mint:</p>
          </div>
          <Select
            onValueChange={(value) => setValue(parseInt(value))}
            disabled={loading}
          >
            <SelectTrigger className="w-[90%] mx-auto">
              <SelectValue placeholder="Select a token" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Token types</SelectLabel>
                <SelectItem value="1">Type A</SelectItem>
                <SelectItem value="2">Type B</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            className="w-full"
            onClick={mintTokens}
            disabled={loading || !address || !value}
          >
            {loading ? <Loader /> : "Mint"}
          </Button>
        </div>
        <div className="bg-secondary p-4 rounded-lg mt-5">
          <h4 className="text-lg font-medium mb-2">Your Balances</h4>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Type A Tokens</span>
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
          <div className="flex items-center justify-between mt-2">
            <span className="text-gray-400">Type B Tokens</span>
            <span className="font-medium">
              {address ? (
                isLoading2 ? (
                  <Loader />
                ) : isError2 ? (
                  "error"
                ) : (
                  Number(data2).toLocaleString("en-US")
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
