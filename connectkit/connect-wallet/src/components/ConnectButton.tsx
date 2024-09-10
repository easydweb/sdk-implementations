// src/components/ConnectButton.tsx
'use client';

import { ConnectKitButton } from 'connectkit';
import { useAccount } from 'wagmi';

export const ConnectButton = () => {
  const { address, isConnected } = useAccount();

  return (
    <div>
      <ConnectKitButton.Custom>
        {({ isConnected, show, truncatedAddress, ensName }) => {
          return (
            <button
              onClick={show}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              {isConnected ? ensName ?? truncatedAddress : "Connect Wallet"}
            </button>
          );
        }}
      </ConnectKitButton.Custom>
      {isConnected && address && (
        <p className="mt-2 text-sm text-gray-300">
          Connected: {address.slice(0, 6)}...{address.slice(-4)}
        </p>
      )}
    </div>
  );
};