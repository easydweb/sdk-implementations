import TokenTabs from "@/components/tokens/TokenTabs";

export function Wagmi(): JSX.Element {
  return (
    <section>
      <div className="mx-auto mt-10 flex flex-col items-center justify-center max-w-[1100px]">
        <h1 className="text-[3em] md:text-[4em] lg:text-[5em] flex flex-col gap-3 text-center font-bold font-neueMachinaBold text-balance md:leading-[auto] lg:leading-tight text-black">
          <span className="bg-orange-400 lg:pt-5 px-2 leading-tight w-fit mx-auto">
            Contracts
          </span>{" "}
          <span className="bg-fuchsia-500 pt-2 px-2">Interaction</span>
          <span className="mt-2">
            <span className="bg-green-500 pt-5 px-2">with</span>{" "}
            <span className="bg-green-500 pt-5 px-2">Wagmi</span>
          </span>
        </h1>
      </div>
      <div className="py-[100px]">
        <TokenTabs />
      </div>
    </section>
  );
}
