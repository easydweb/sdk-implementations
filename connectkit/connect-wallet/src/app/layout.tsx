// src/app/layout.tsx
import './globals.css'
import { Web3Provider } from '../components/Web3Provider';

export const metadata = {
  title: 'Multi-Chain dApp',
  description: 'A Next.js dApp supporting multiple chains',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}