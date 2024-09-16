// src/app/page.tsx

// Indicating this is a client-side component
"use client"
// Importing connect button from ConnectButton component
import { ConnectButton } from '../components/ConnectButton';

const chains = ['Ethereum', 'BSC', 'Polygon', 'Fantom', 'Optimism', 'Base', 'Arbitrum', 'Avalanche'];

export default function Home() {
  return (
    // Main container
    // min-h-screen: Minimum height of 100% of the viewport
    // bg-gradient-to-b: Background gradient from top to bottom
    // from-gray-900 to-gray-800: Gradient colors (dark gray to slightly lighter gray)
    // text-white: White text color
    // p-8: Padding of 2rem (32px) on all sides
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      {/*  Navigation bar
      // flex: Flexbox layout
      // justify-between: Space items evenly along the main axis
      // items-center: Center items along the cross axis
      // mb-12: Margin bottom of 3rem (48px) */}
      <nav className="flex justify-between items-center mb-12">
      {/*  Main title
        // text-3xl: Font size of 1.875rem (30px)
        // font-bold: Bold font weight */}
        <h1 className="text-3xl font-bold">My Dapp</h1>
        {/*  connect button */}
        <ConnectButton />
      </nav>
      {/* Main content section
      // max-w-4xl: Maximum width of 56rem (896px)
      // mx-auto: Auto margins on left and right (centers the content)
      // text-center: Center-align text */}
      <section className="max-w-4xl mx-auto text-center">
      {/* Main heading
        // text-5xl: Font size of 3rem (48px)
        // font-bold: Bold font weight
        // mb-6: Margin bottom of 1.5rem (24px) */}
        <h2 className="text-5xl font-bold mb-6">Empowering dApps via Connect Kit</h2>
        
        {/* Animation container
        // my-12: Margin top and bottom of 3rem (48px)
        // flex: Flexbox layout
        // justify-center: Center items along the main axis
        // space-x-4: Horizontal space between child elements of 1rem (16px) */}
        <div className="my-12 flex justify-center space-x-4">
          {chains.map((chain, index) => (

            // Animated circle for each chain
            // w-16 h-16: Width and height of 4rem (64px)
            // bg-blue-500: Background color blue
            // rounded-full: Fully rounded corners (circle)
            // flex items-center justify-center: Center content both vertically and horizontally
            // animate-bounce: Tailwind's bounce animation
            <div 
              key={chain} 
              // Inline style for staggered animation delay
              className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center animate-bounce"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {chain.charAt(0)}
            </div>
          ))}
        </div>
        {/*  Supported chains section
        // bg-gray-800: Dark gray background
        // p-6: Padding of 1.5rem (24px) on all sides
        // rounded-lg: Rounded corners
        // shadow-lg: Large shadow for depth
        // mb-12: Margin bottom of 3rem (48px) */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-12">

        {/* Section heading
          // text-2xl: Font size of 1.5rem (24px)
          // font-semibold: Semi-bold font weight
          // mb-4: Margin bottom of 1rem (16px) */}
          <h3 className="text-2xl font-semibold mb-4">Currently Implementated Chains</h3>

          {/* Grid layout for chain items
          // grid: CSS Grid layout
          // grid-cols-2: 2 columns on small screens
          // md:grid-cols-4: 4 columns on medium screens and up
          // gap-4: Gap of 1rem (16px) between grid items */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {chains.map((chain) => (
              // Individual chain item
              // bg-gray-700: Slightly lighter gray background
              // p-4: Padding of 1rem (16px) on all sides
              // rounded-lg: Rounded corners
              // text-center: Center-align text
              // hover:bg-gray-600: Change background on hover
              // transition-colors: Smooth transition for color changes
              <div key={chain} className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition-colors">
                {/*  font-semibold: Semi-bold font weight */}
                <p className="font-semibold">{chain}</p>
              </div>
            ))}
          </div>
        </div>

        {/* "Add More Chains" section
        // mt-10: Margin top of 2.5rem (40px) */}
        <div className='mt-10'>

        {/* text-3xl: Font size of 1.875rem (30px)
          // font-semibold: Semi-bold font weight
          // mb-4: Margin bottom of 1rem (16px) */}
          <h2 className='text-3xl font semibold mb-4' >
            Want to Add More chains?
          </h2>
        </div>

        {/* "Start Editing" section
        // mt-12: Margin top of 3rem (48px) */}
        <div className="mt-12">

        {/* text-xl: Font size of 1.25rem (20px)
          // mb-6: Margin bottom of 1.5rem (24px) */}
          <h3 className="text-3xl font-semibold mb-4">Start Editing</h3>
          <p className="text-xl mb-6">
            Begin customizing your dApp by editing the source files. Here's how to get started:
          </p>

          {/* Code block
          // bg-gray-800: Dark gray background
          // p-6: Padding of 1.5rem (24px) on all sides
          // rounded-lg: Rounded corners
          // text-center: Center-align text */}
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            
          {/* text-green-400: Green text color
            // text-left: Left-align text */}
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