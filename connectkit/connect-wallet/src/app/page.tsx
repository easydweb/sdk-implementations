// src/app/page.tsx
import { ConnectButton } from '../components/ConnectButton';
import Link from 'next/link';

const chains = ['Ethereum', 'BSC', 'Polygon', 'Fantom', 'Optimism', 'Base', 'Arbitrum', 'Avalanche'];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <nav className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold">My Dapp</h1>
        <ConnectButton />
      </nav>
      
      <section className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-bold mb-6">Empowering dApps via Connect Kit</h2>
        
        {/* Placeholder for animations */}
        <div className="my-12 flex justify-center space-x-4">
          {chains.map((chain, index) => (
            <div 
              key={chain} 
              className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center animate-bounce"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {chain.charAt(0)}
            </div>
          ))}
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-12">
          <h3 className="text-2xl font-semibold mb-4">Currently Implementated Chains</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {chains.map((chain) => (
              <div key={chain} className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition-colors">
                <p className="font-semibold">{chain}</p>
              </div>
            ))}
          </div>
        </div>
        <div className='mt-10'>
          <h2 className='text-3xl font semibold mb-4' >
            Want to Add More chains?
          </h2>
        </div>
        <div className="mt-12">
          <h3 className="text-3xl font-semibold mb-4">Start Editing</h3>
          <p className="text-xl mb-6">
            Begin customizing your dApp by editing the source files. Here's how to get started:
          </p>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <code className="text-green-400 text-left">
              1. Open src/app/page.tsx in your editor<br/>
              2. Modify the content to fit your needs<br/>
              3. Save the file and see the changes live!<br/>

            </code>
          </div>
          
        </div>
      </section>
    </main>
  );
}