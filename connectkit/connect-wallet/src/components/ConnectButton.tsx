// Indicating this is a client-side component
'use client';

import { ConnectKitButton } from 'connectkit';
import { useAccount } from 'wagmi';

export const ConnectButton = () => {
  /**
   * useAccount hook from Wagmi
   * Provides information about the connected account
   * @type {Object}
   * @property {string|undefined} address - The address of the connected wallet
   * @property {boolean} isConnected - Whether a wallet is connected
   */
  const { address, isConnected } = useAccount();

  return (
    <div>
      {/* 
        ConnectKitButton.Custom component
        Allows for custom styling of the connect button
      */}
      <ConnectKitButton.Custom>
        {({ isConnected, show, truncatedAddress, ensName }) => {
          return (
            <button
              onClick={show}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              {/* 
                Button text changes based on connection status
                Shows ENS name if available, otherwise shows truncated address
              */}
              {isConnected ? ensName ?? truncatedAddress : "Connect Wallet"}
            </button>
          );
        }}
      </ConnectKitButton.Custom>
      
      {/* 
        Displays the connected address when a wallet is connected
        Only shown when isConnected is true and address is available
      */}
      {isConnected && address && (
        <p className="mt-2 text-sm text-gray-300">
          Connected: {address.slice(0, 6)}...{address.slice(-4)}
        </p>
      )}
    </div>
  );
};