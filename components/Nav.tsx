import React from "react";
import ConnectButton from "./ConnectWallet";
export default function Nav() {
  return (
    <div className="navbar">
      <nav className="flex min-h-10vh max-h-10vh items-center justify-between px-2 md:px-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-blue-400 italic">
          Guardian
        </h1>
        <ConnectButton />
      </nav>
    </div>
  );
}
