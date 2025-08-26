// app/page.tsx

'use client'

import React from 'react'


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl font-bold mb-8">Welcome to Reown Starter dApp</h1>
      <p className="text-xl mb-12 max-w-2xl text-center">
        Experience the power of decentralized applications with our easy-to-use starter kit. Connect your wallet and dive into the world of Web3!
      </p>
      {/* connect wallet button */}
      
      <w3m-button /> 
      
      <p className="mt-8 text-sm">Your Dapp Name here</p>
    </div>
  )
}