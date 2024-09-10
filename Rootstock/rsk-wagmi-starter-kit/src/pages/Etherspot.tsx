import Demo from "@/components/accountAbstraction/etherspot/Demo";

export function Etherspot(): JSX.Element {
  return (
    <section>
      <div className="mx-auto mt-10 flex flex-col items-center justify-center max-w-[1100px]">
        <h1 className="text-[3em] md:text-[4em] lg:text-[5em] flex flex-col gap-3 text-center font-bold font-neueMachinaBold text-balance md:leading-[auto] lg:leading-tight text-black">
          <span className="bg-orange-400 lg:pt-5 px-2 leading-tight w-fit mx-auto">
            Account
          </span>{" "}
          <span className="bg-fuchsia-500 pt-2 px-2">Abstraction</span>
          <span className="mt-3 text-[80%]">
            <span className="bg-green-500 pt-5 px-2">with</span>{" "}
            <span className="bg-green-500 pt-5 px-2">Etherspot</span>
          </span>
        </h1>
      </div>
      <div className="py-[100px]">
        <Demo />
      </div>
    </section>
  );
}
