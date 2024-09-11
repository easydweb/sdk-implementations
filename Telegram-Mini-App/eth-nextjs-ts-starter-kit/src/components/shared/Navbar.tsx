"use client";
import React from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <nav className="mx-3 my-4">
      <div className="flex items-end">
        <Image src="/rabble.svg" alt="Rabble" width={82.8} height={21.6} />
        <div className="ml-auto flex items-center ">
          <ConnectButton accountStatus={"avatar"} chainStatus={"icon"} />
        </div>
      </div>
      <hr className="bg-black my-2" />
      <div className="flex space-x-4 ">
        <Link
          href="/"
          className={`${
            pathname == "/" ? "text-rabble" : "text-color  hover:text-color/90"
          } `}
        >
          Home
        </Link>
        <Link
          href="/contract"
          className={`${
            pathname == "/contract"
              ? "text-rabble"
              : "text-color hover:text-color/90"
          } `}
        >
          Contract
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
