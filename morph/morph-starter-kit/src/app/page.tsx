"use client";

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useEffect, useState } from 'react';
import abi from '@/abi.json'
import MorphLogo from './logo';

export default function Home(){
 const [count, setCount] = useState("")
 const {isConnected} = useAccount()

 const {data: hash, writeContract, isPending} = useWriteContract();

 const {data: currentCount, refetch} = useReadContract({
  abi,
  address: "0xAB7391FBbCE3a30bf0418bB3A55F8634dE4629b4",
  functionName: "number",
 }); 

 const {isLoading,isSuccess} = useWaitForTransactionReceipt({hash})

 async function increment(){
  try {
    await writeContract({
      abi,
      address: "0xAB7391FBbCE3a30bf0418bB3A55F8634dE4629b4",
      functionName: "increment",
    })
  } catch (error) {
    console.error("Error incrementing:", error);
  }
 }

 async function decrement(){
  try {
    await writeContract({
      abi,
      address: "0xAB7391FBbCE3a30bf0418bB3A55F8634dE4629b4",
      functionName: "decrement",
    })
  } catch (error) {
    console.error("Error decrementing:", error);
  }
 }

useEffect(() => {
  if(isSuccess) refetch()
  setCount(String(currentCount))
}, [currentCount, isSuccess, refetch])

 useEffect(() => {
  if (isSuccess) {
    refetch();
  }
 }, [isSuccess, refetch])


 return(
  <>
   <MorphLogo />
   
   <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
   <div className='flex justify-center items-center mb-10
          text-center font-bold text-5xl text-[#14a800] leading-none'>
          Start Building your next Dapp
          <br className='mt-8'/> On Morph🐨
          </div>
     <div className="p-8 bg-white rounded-lg shadow-md font-bold mb-4">
       <p className="text-3xl font-semibold leading-tight mb-5">Current Count: {count}</p>
       {isLoading && <p className="text-blue-500 mb-4">Updating Count....</p>}
       <div className="flex space-x-4">
         {isConnected && (
           <>
             <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={increment}>Increment</button>
             <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={decrement}>Decrement</button>
           </>
         )}
       </div>
     </div>
   </main>
  </>
 )
}
