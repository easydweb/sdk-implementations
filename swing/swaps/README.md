# Swing SDK Swap Component

This project implements a swap interface using the Swing SDK, React, and Web3React. It allows users to perform cross-chain token swaps with a simple and intuitive UI.

## Features

- Cross-chain token swaps
- Integration with Web3React for wallet connection
- Dynamic loading of available chains and tokens
- Real-time quote fetching
- Transaction status tracking

## Prerequisites

- Node.js (version 12 or higher)
- npm or yarn
- MetaMask or another Web3 wallet
- Swing SDK project ID from [Swing SDK](https://platform.swing.xyz)
  
## To get started with this 

1. Clone the repository:

2. Install dependencies:
 
   ```
   yarn install
   ```
3. Replace the Swing SDK project ID in the swap.tsx file with your own project ID:
   ```typescript
   const projectId = 'YOUR_PROJECT_ID';
   ```
4. Start the development server:
   ```
   yarn dev
   ```
5. Open the app in your browser at http://localhost:3000
   
6. Connect your wallet and start swapping!
