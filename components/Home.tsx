"use client";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import ConnectButton from "./ConnectWallet";
import { useRouter } from "next/navigation";
import Link from "next/link";
function HomePage() {
  const [address, setAddress] = useState<`0x${string}` | undefined>(undefined);
  const { address: addr, isConnected, isConnecting } = useAccount();
  useEffect(() => {
    console.log(address, isConnected, isConnecting);
    setAddress(addr);
  }, [address, isConnected, isConnecting]);

  const router = useRouter();
  return (
    <div
      className="headline md:text-8xl min-h-[90vh] text-slate-50 text-bold
       text-center flex flex-col items-center justify-center text-4xl italic px-4"
    >
      <span>
        Securing <div className="font-extrabold text-blue-400">Tomorrow</div>
      </span>
      <span>With Guardian</span>
      <div className="connectButton"></div>
      {isConnecting ? (
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      ) : null}
      {address ? (
        <div className="w-[100px] h-[20px] rounded-full text-lg">
          <Link href="/dashboard">
            <Button
              variant="default"
              className="m-4"
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </Button>
          </Link>
        </div>
      ) : (
        <ConnectButton />
      )}
    </div>
  );
}

export default HomePage;
