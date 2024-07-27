import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import SwingSDK, {
  TransferStepResults,
  TransferStepResult,
  TransferRoute,
  TransferParams,
  Chain,
  Token,
  ChainSlug,
  TokenSymbol,
} from "@swing.xyz/sdk";
import { Button } from "@/ui/Button";
import { Label } from "@/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { useToast } from "@/ui/use-toast";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { StatusSheet } from "@/ui/StatusSheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Input } from "@/ui/input";

const Swap: React.FC = () => {
  // State variables for managing the swap process
  const [isLoading, setIsLoading] = useState(false);
  const [routes, setRoutes] = useState<TransferRoute[] | null>(null);
  const [status, setStatus] = useState<TransferStepResult | null>(null);
  const [results, setResults] = useState<TransferStepResults | null>(null);
  const [resultLogs, setResultLogs] = useState<
    { time: string; log?: string; logType?: string }[]
  >([]);

  // Initial transfer parameters
  const [transferParams, setTransferParams] = useState<TransferParams>({
    amount: "0",
    fromChain: "ethereum",
    fromToken: "ETH",
    fromUserAddress: "",
    toChain: "polygon",
    toToken: "MATIC",
    toUserAddress: "",
  });

  const [transferRoute, setTransferRoute] = useState<TransferRoute | null>(
    null
  );
  const [availableChains, setAvailableChains] = useState<Chain[]>([]);
  const [fromTokens, setFromTokens] = useState<Token[]>([]);
  const [toTokens, setToTokens] = useState<Token[]>([]);
  const [balance, setBalance] = useState<string>("0");

  // Web3React hooks for wallet connection
  const { connector, provider, account } = useWeb3React();
  const { toast } = useToast();
  const [swingSDK, setSwingSDK] = useState<SwingSDK | null>(null);
  const isConnected = swingSDK?.wallet.isConnected();

  // Initialize Swing SDK
  useEffect(() => {
    const swing = new SwingSDK({
      projectId: "replug", // Replace with your project ID from https://platform.swing.xyz
      environment: "production",
      debug: true,
    });

    setIsLoading(true);

    swing
      .init()
      .then(() => {
        setIsLoading(false);
        setSwingSDK(swing);
        setAvailableChains(swing.chains);
        updateFromTokens(swing, transferParams.fromChain);
        updateToTokens(swing, transferParams.toChain);
      })
      .catch((error) => {
        setIsLoading(false);
        showError(error.message);
        setSwingSDK(swing);
      });
  }, []);

  // Sync provider with Swing SDK when wallet is connected
  useEffect(() => {
    async function syncProviderWithSwingSDK() {
      if (swingSDK && provider && account) {
        const walletAddress = await swingSDK.wallet.connect(
          provider.getSigner(),
          transferParams.fromChain as ChainSlug
        );

        setTransferParams((prev) => ({
          ...prev,
          fromUserAddress: walletAddress,
          toUserAddress: walletAddress,
        }));

        updateBalance();
      }
    }

    syncProviderWithSwingSDK();
  }, [
    provider,
    swingSDK,
    account,
    transferParams.fromChain,
    transferParams.fromToken,
  ]);

  // Update available tokens for the 'from' chain
  const updateFromTokens = (sdk: SwingSDK, chainSlug: ChainSlug) => {
    const tokens = sdk.getTokensForChain(chainSlug);
    setFromTokens(tokens);
  };

  // Update available tokens for the 'to' chain
  const updateToTokens = (sdk: SwingSDK, chainSlug: ChainSlug) => {
    const tokens = sdk.getTokensForChain(chainSlug);
    setToTokens(tokens);
  };

  // Update user's balance for the selected 'from' token
  const updateBalance = async () => {
    if (swingSDK && account) {
      const balance = await swingSDK.wallet.getBalance(
        transferParams.fromChain as ChainSlug,
        transferParams.fromToken as TokenSymbol,
        account
      );
      setBalance(balance);
    }
  };

  // Display error messages using toast
  const showError = (description: string) => {
    toast({
      title: "An Error Occurred",
      variant: "destructive",
      description,
    });
  };

  // Connect wallet using Web3React
  const connectWallet = async () => {
    if (!swingSDK) return;

    try {
      await connector.activate();
    } catch (error) {
      console.error("Connect Wallet Error:", error);
      showError((error as Error).message);
    }
  };

  // Switch blockchain network
  const switchChain = async (chain: Chain) => {
    if (!swingSDK) return;

    try {
      await connector.activate(chain.id);
    } catch (error) {
      console.error("Switch Chain Error:", error);
      showError((error as Error).message);
    }
  };

  // Get quote for the swap
  const getQuote = async () => {
    if (!swingSDK) return;

    setIsLoading(true);

    try {
      const quotes = await swingSDK.getQuote(transferParams);

      if (!quotes.routes.length) {
        showError("No routes available. Try a different token pair.");
        setIsLoading(false);
        return;
      }

      setRoutes(quotes.routes);
      // Automatically select the best route (first one)
      setTransferRoute(quotes.routes[0]);
    } catch (error) {
      console.error("Quote Error:", error);
      showError((error as Error).message);
    }

    setIsLoading(false);
  };

  // Start the transfer process
  const startTransfer = async () => {
    if (!swingSDK || !transferRoute) {
      showError("No route selected.");
      return;
    }

    if (parseFloat(transferParams.amount) > parseFloat(balance)) {
      showError("Insufficient balance.");
      return;
    }

    // Set up event listener for transfer status updates
    const transferListener = swingSDK.on(
      "TRANSFER",
      async (transferStepStatus, transferResults) => {
        setResultLogs((prevItems) => [
          ...prevItems,
          {
            time: new Date().toISOString(),
            log: `Transaction Status -> ${transferStepStatus.status}`,
            logType: "MESSAGE",
          },
          {
            time: new Date().toISOString(),
            log: `Transfer Step -> ${transferStepStatus.step}`,
            logType: "MESSAGE",
          },
        ]);

        setStatus(transferStepStatus);
        setResults(transferResults);

        console.log("TRANSFER:", transferStepStatus, transferResults);

        // Handle different transfer statuses
        switch (transferStepStatus.status) {
          case "ACTION_REQUIRED":
            setResultLogs((prevItems) => [
              ...prevItems,
              {
                time: new Date().toISOString(),
                log: `ACTION REQUIRED: Prompting MetaMask`,
                logType: "ACTION_REQUIRED",
              },
            ]);
            break;
          case "CHAIN_SWITCH_REQUIRED":
            setResultLogs((prevItems) => [
              ...prevItems,
              {
                time: new Date().toISOString(),
                log: `CHAIN SWITCH REQUIRED: Prompting MetaMask`,
                logType: "CHAIN_SWITCH",
              },
            ]);
            await switchChain(transferStepStatus.chain);
            break;

          case "WALLET_CONNECTION_REQUIRED":
            await connectWallet();
            break;
        }
      }
    );

    setIsLoading(true);

    try {
      await swingSDK.transfer(transferRoute, transferParams);
    } catch (error) {
      console.error("Transfer Error:", error);
      setResultLogs((prevItems) => [
        ...prevItems,
        {
          time: new Date().toISOString(),
          log: `Error -> ${(error as Error).message}`,
          logType: "ERROR",
        },
      ]);
    }

    transferListener();
    setIsLoading(false);
  };

  // Render the Swap component UI
  return (
    <Card className="w-full max-w-md mx-auto p-4 bg-black rounded-none shadow-lg border-gray-800">
      <CardHeader className="mb-4">
        <CardTitle className="text-2xl font-bold text-center text-white">
          Swap Tokens
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* From Chain and Token selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="from-token"
              className="block text-sm font-medium text-gray-300"
            >
              From Chain
            </Label>
            <Select
              value={transferParams.fromChain}
              onValueChange={(value) => {
                setTransferParams((prev) => ({
                  ...prev,
                  fromChain: value as ChainSlug,
                }));
                updateFromTokens(swingSDK!, value as ChainSlug);
              }}
            >
              <SelectTrigger className="w-full bg-black text-white rounded-none shadow-lg border-gray-800">
                <SelectValue placeholder="From Chain" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white ">
                {availableChains.map((chain) => (
                  <SelectItem key={chain.slug} value={chain.slug}>
                    {chain.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="from-symbol"
              className="block text-sm font-medium text-gray-300"
            >
              Token
            </Label>
            <Select
              value={transferParams.fromToken}
              onValueChange={(value) => {
                setTransferParams((prev) => ({
                  ...prev,
                  fromToken: value as TokenSymbol,
                }));
                updateBalance();
              }}
            >
              <SelectTrigger className="w-full bg-black text-white rounded-none shadow-lg border-gray-800">
                <SelectValue placeholder="From Token" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white">
                {fromTokens.map((token) => (
                  <SelectItem key={token.symbol} value={token.symbol}>
                    {token.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center my-4">
          <LiaExchangeAltSolid className="text-3xl text-gray-400 transform rotate-90" />
        </div>

        {/* To Chain and Token selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="to-token"
              className="block text-sm font-medium text-gray-300"
            >
              To Chain
            </Label>
            <Select
              value={transferParams.toChain}
              onValueChange={(value) => {
                setTransferParams((prev) => ({
                  ...prev,
                  toChain: value as ChainSlug,
                }));
                updateToTokens(swingSDK!, value as ChainSlug);
              }}
            >
              <SelectTrigger className="w-full bg-black text-white rounded-none shadow-lg border-gray-800">
                <SelectValue placeholder="To Chain" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white">
                {availableChains.map((chain) => (
                  <SelectItem key={chain.slug} value={chain.slug}>
                    {chain.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="to-symbol"
              className="block text-sm font-medium text-gray-300"
            >
              Token
            </Label>
            <Select
              value={transferParams.toToken}
              onValueChange={(value) =>
                setTransferParams((prev) => ({
                  ...prev,
                  toToken: value as TokenSymbol,
                }))
              }
            >
              <SelectTrigger className="w-full bg-black text-white rounded-none shadow-lg border-gray-800">
                <SelectValue placeholder="To Token" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white">
                {toTokens.map((token) => (
                  <SelectItem key={token.symbol} value={token.symbol}>
                    {token.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Amount input */}
        <div className="space-y-2 mt-4">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-300"
          >
            Amount
          </label>
          <Input
            id="amount"
            type="number"
            className="bg-black text-white rounded-none shadow-lg border-gray-800"
            placeholder="0"
            value={transferParams.amount}
            onChange={(e) => {
              setTransferRoute(null);
              setTransferParams((prev) => ({
                ...prev,
                amount: e.target.value,
              }));
            }}
          />
          <p className="text-xs text-gray-300">
            Balance: {balance} {transferParams.fromToken}
          </p>
        </div>

        {/* Display swap quote */}
        {transferRoute && (
          <div className="mt-4 text-sm text-gray-100">
            <p>
              You Will Get: {transferRoute.quote.amountUSD}{" "}
              {transferParams.toToken}
            </p>
          </div>
        )}

        {/* Swap or Connect Wallet button */}
        {isConnected ? (
          <Button
            className="w-full mt-4 py-2 bg-white text-black  hover:bg-gray-200 rounded-none"
            disabled={isLoading}
            onClick={() => (transferRoute ? startTransfer() : getQuote())}
          >
            {isLoading ? (
              <div className="text-black">Loading...</div>
            ) : transferRoute ? (
              "Swap"
            ) : (
              "Get Price"
            )}
          </Button>
        ) : (
          <Button
            className="w-full mt-4 py-2 bg-white text-black hover:bg-gray-200 rounded-none"
            disabled={isLoading}
            onClick={connectWallet}
          >
            Connect Wallet
          </Button>
        )}

        <StatusSheet
          isOpen={!!status}
          logs={resultLogs}
          onCancel={async () => {
            await swingSDK?.cancelTransfer(results?.transferId!);
            setStatus(null);
          }}
        />
      </CardContent>
    </Card>
  );
};

export default Swap;
