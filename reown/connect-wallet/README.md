# Reown Starter dApp

This project is a starter decentralized application (dApp) built with Next.js and Reown AppKit (previously known as WalletConnect). It provides a simple and intuitive way for users to connect their Web3 wallets and interact with blockchain networks.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 14 or newer)
- npm or yarn
- Git

## Installation

To set up this project, follow these steps:

1. Clone the forked sdk-implementation repository:
   ```
   git clone https://github.com/easydweb/sdk-implementation.git
   cd sdk-implementation/reown/connect-wallet
   ```

2. Install the dependencies:
   ```
   npm install
   ```
   or if you're using yarn:
   ```
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your Reown project ID:
   ```
   NEXT_PUBLIC_PROJECT_ID=your_project_id_here
   ```
   You can obtain a project ID by creating a new project at [Reown Cloud](https://cloud.reown.com).

## Usage

To run the development server:

```
npm run dev
```
or
```
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `config/index.tsx`: Contains the Reown AppKit and Wagmi configuration.
- `context/index.tsx`: Sets up the Reown AppKit context provider.
- `app/layout.tsx`: The root layout where the ContextProvider is integrated.
- `app/page.tsx`: The homepage component with the "Connect Wallet" button.
- `next.config.js`: Next.js configuration file with necessary webpack settings for Reown AppKit.

## Features

- Easy wallet connection using Reown AppKit
- Support for multiple blockchain networks (Ethereum Mainnet and Arbitrum by default)
- Responsive design with a gradient background

## Customization

You can customize the dApp by modifying the following:

- Update the supported networks in `config/index.tsx`
- Change the metadata (name, description, URL, icons) in `context/index.tsx`
- Modify the UI components in `app/page.tsx`

## Contributing

Contributions to this starter dApp are welcome. Please ensure you follow the existing code style and structure.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Reown (WalletConnect)](https://reown.com/)
- [Next.js](https://nextjs.org/)
- [Wagmi](https://wagmi.sh/)

For more information on using Reown AppKit, please refer to the [official documentation](https://docs.reown.com/).
