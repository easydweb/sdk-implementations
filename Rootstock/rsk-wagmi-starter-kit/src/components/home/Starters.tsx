import { StarterProps } from "@/lib/types";
import StarterCard from "./StarterCard";

export default function Starters(): JSX.Element {
  return (
    <section className="mx-auto" id="starters">
      <header className="text-center">
        <p className="text-white/70">Starter kits</p>
        <h2 className="text-3xl font-bold">Dive into these starters</h2>
      </header>
      <div className="container mx-auto my-12 grid grid-cols-1 gap-6 md:grid-cols-2 max-w-3xl">
        {starters.map((starter) => (
          <StarterCard key={starter.name} starter={starter} />
        ))}
      </div>
    </section>
  );
}

const starters: StarterProps[] = [
  {
    name: "Contract Interaction with Wagmi Starter Kit",
    description:
      "Get started with contract interaction using the Wagmi library. This starter kit includes a pre-configured Wagmi setup, sample contract interactions, and more.",
    link: "/wagmi",
  },
  {
    name: "Account Abstraction with Etherspot Starter Kit",
    description:
      "Kickstart your project with the Account Abstraction Starter Kit. This kit provides a foundation for building applications with account abstraction, including sample implementations and documentation.",
    link: "/aa",
  },
];
