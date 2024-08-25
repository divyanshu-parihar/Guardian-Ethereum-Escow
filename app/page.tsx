"use client";
import {
  useDisconnect,
  useWeb3Modal,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { useEffect } from "react";
import ConnectButton from "@/components/ConnectWallet";
import { SessionProvider } from "next-auth/react";
import Nav from "@/components/Nav";
import HomePage from "@/components/Home";

export default function Home() {
  const { address, isConnected, status } = useWeb3ModalAccount();
  useEffect(() => {
    console.log({ address, isConnected, status });
  }, [address, isConnected, status]);
  return (
    <SessionProvider>
      <div className="init__screen relative min-h-screen min-w-screen ">
        <div className="background__vide absolute top-0 left-0 z-0 h-screen w-screen">
          <video
            className="background-video h-screen w-screen object-cover opacity-55"
            autoPlay
            loop
            muted
          >
            <source src="/backgroundhd.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="content absolute z-100 h-full w-full">
          <Nav />
          <HomePage />
        </div>
      </div>
    </SessionProvider>
  );
}
