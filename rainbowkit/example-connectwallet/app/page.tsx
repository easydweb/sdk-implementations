import { ConnectButton } from '@rainbow-me/rainbowkit'; //Import ConnectButton wherever you want
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex"></div>
        <div className="relativeflex place-items-center ">
          <ConnectButton /> 
        </div>
      <div className="mb-32"></div>
    </main>
  );
}
