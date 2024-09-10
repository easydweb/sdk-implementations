# Multi-Chain dApp Starter Kit

Welcome to the Multi-Chain dApp Starter Kit! This project provides a solid foundation for building decentralized applications (dApps) that support multiple blockchain networks. Built with Next.js, ConnectKit, and Wagmi, this starter kit offers an out-of-the-box solution for creating Web3 applications with a seamless wallet connection experience.

## Features

- 🌐 Multi-chain support (Ethereum, BSC, Polygon, Fantom, Optimism, Base, Arbitrum, Avalanche)
- 🔌 Easy wallet connection with ConnectKit [Metamask, Coinbase Wallet, and Other major wallets supported]
- ⚡ Built on Next.js for optimal performance and SEO
- 🎨 Styled with Tailwind CSS for quick and responsive designs
- 📱 Mobile-friendly and responsive layout
- 🚀 Easy to customize and extend

## Getting Started

To get started with this starter kit, follow these steps:

1. Clone the repository:
   ```
   https://github.com/easydweb/sdk-implementations.git
   cd connectkit/connect-wallet
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your environment variables:
   Create a `.env.local` file in the root directory and add your WalletConnect Project ID:
   project id can be got from cloud.walletconnect.com
   ```
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Customization

### Modifying Supported Chains

To modify the supported chains, edit the `chains` array in `src/components/Web3Provider.tsx`:

```typescript
 chains: [mainnet, bsc, polygon, fantom, optimism, base, arbitrum, avalanche];
```

Add or remove chains as needed, making sure to import them from `wagmi/chains`.

### Updating the Homepage

The main content of the dApp is in `src/app/page.tsx`. Modify this file to change the layout, add new sections, or integrate your dApp's specific features.

### Styling

This project uses Tailwind CSS for styling. You can customize the design by editing the Tailwind classes in the components or by modifying the `tailwind.config.js` file to add your own design tokens.

### Adding New Pages

To add new pages to your dApp, create new files in the `src/app` directory. Next.js will automatically create routes based on your file structure.

## ConnectKit Configuration

ConnectKit is configured in the `src/components/Web3Provider.tsx` file. You can customize the ConnectKit options here, such as supported wallets, themes, and more.

## Deployment

To deploy your dApp, we recommend using Vercel, which offers seamless deployment for Next.js projects:

1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and sign up or log in.
3. Click "New Project" and select your repository.
4. Follow the prompts to deploy your dApp.

Remember to set your environment variables in the Vercel dashboard.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.

Happy building! 🚀