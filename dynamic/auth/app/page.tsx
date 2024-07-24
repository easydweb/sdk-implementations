import { DynamicWidget } from "../lib/dynamic";

export default function Main() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-6"></div>

        <DynamicWidget />
      </div>
    </div>
  );
}
