"use client"; // thirdweb SDK doesn't support server-side rendering yet.

import { createThirdwebClient, getContract } from "thirdweb"; // Create the thirdweb client with your client ID
import {
  ConnectButton, // Connect wallet button and modal
  TransactionButton, // Button to send transactions from the connected wallet
  useActiveAccount, // Hook to grab the connected account
} from "thirdweb/react"; // The component you can prompt the user to connect their wallet with
import { createWallet } from "thirdweb/wallets"; // Function to specify we want to use Coinbase smart wallet
import { claimTo } from "thirdweb/extensions/erc1155"; 
import { useSendCalls } from "thirdweb/wallets/eip5792";

// Import and set the the blockchain you want to use.
// Only certain chains supported till now: https://www.smartwallet.dev/FAQ#what-networks-are-supported
// NOTE: To use mainnet chains, you need to add a credit card to your thirdweb account.
// To use testnets, such as baseSepolia, no card is required.

import { arbitrumSepolia } from "thirdweb/chains";
const chainToUse = arbitrumSepolia;

const thirdwebClient = createThirdwebClient({

  // Grab your thirdweb client id from the thirdweb dashboard
  //Ensure you have a .env.local file with NEXT_PUBLIC_THIRDWEB_CLIENT_ID set to your client ID

  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});

export default function Home() {
  // Get the account once the user has connected with Coinbase smart wallet
  const account = useActiveAccount();

  // This is so we can use a paymaster service to pay for the transaction gas fees
  const { mutateAsync: sendCalls } = useSendCalls({
    client: thirdwebClient,
    waitForResult: true,
  });

  // Function to send the claim NFT transaction with gas fees covered.
  async function sendSponsoredTransaction() {
    const claimTx = claimTo({
      // Get the contract using a chain + contract address combo
      contract: getContract({
        client: thirdwebClient,
        chain: chainToUse,
        address: "0x3Fef0120865B212543E54f1Fa2e83D074EcD1a14", // deploy your contract and add address here i deployed nft contract for this 
      }),
      quantity: BigInt(1), // Claim 1 NFT
      to: account?.address!, // To the connected wallet address
      tokenId: BigInt(0), // Of NFT token ID 0
    });

    // Send the transaction with the paymaster service
    return await sendCalls({
      calls: [claimTx], // The claim transaction. We could put multiple transactions here in theory.
      capabilities: {
        paymasterService: {
          // Docs: https://portal.thirdweb.com/connect/account-abstraction/infrastructure
          url: `https://${chainToUse.id}.bundler.thirdweb.com/${thirdwebClient.clientId}`,
        },
      },
    });
  }

  return (
    // <div className="bg-blue-400 flexflex-col items-center justify-center h-screen"
    <div className="w-full h-screen flex items-center justify-center bg-blue-400">
      <ConnectButton
        client={thirdwebClient}
        // The array of wallets you want to show to users, I just provide 1 - Coinbase Wallet
        wallets={[
          // Use com.coinbase.wallet for Coinbase Wallet
          createWallet("com.coinbase.wallet", {
            walletConfig: {
              // Specify we do not want coinbase wallet browser extension support, just smart wallet
              options: "smartWalletOnly",
            },
            // What chains you want to support in our app
            chains: [chainToUse],
            // This is the metadata that shows up when prompting the user to connect their wallet
            appMetadata: {
              logoUrl: ``, // just put your logo url here
              name: "Coinbase Smart Wallet", // name
              description: "Coinbase Smart Wallet", // desc
            },
          }),
        ]}
      />
      <TransactionButton
        transaction={() =>
         // @ts-expect-error: Just a type issue, can probably be fixed easily
          sendSponsoredTransaction()
        }
        payModal={false}
      >
        Mint NFT
      </TransactionButton>
    </div>
  );
}
