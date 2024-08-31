"use client";
import {
  useDisconnect,
  useWeb3Modal,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { useEffect, useState } from "react";
import ConnectButton from "@/components/ConnectWallet";
import { SessionProvider } from "next-auth/react";
import Nav from "@/components/Nav";
import HomePage from "@/components/Home";
import Web3 from "web3";
// import { ContractAbi } from "web3-core";
import MyContractABI from "@/artifacts/contracts/Escrow.sol/Escrow.json";
export default function Home() {
  const { address, isConnected, status } = useWeb3ModalAccount();
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState<any>();

  useEffect(() => {
    console.log("here");
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);

      (window.ethereum as any)
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          setAccount(accounts[0]);

          console.log("accounts", accounts);
          const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
          const myContract = new web3.eth.Contract(
            MyContractABI["abi"],
            contractAddress
          );

          console.log("contract", myContract);
          setContract(myContract);
        })
        .catch((error) => {
          console.error("User denied account access", error);
        });

      (window.ethereum as any).on("accountsChanged", function (accounts) {
        setAccount(accounts[0]);
      });
    } else {
      console.error("MetaMask is not installed");
    }
  }, []);

  const fetchGreeting = async () => {
    if (contract) {
      const greeting = await contract.methods.saySomething().call();
      console.log(greeting);
    } else {
      console.log("No contract found");
    }
  };
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
          {/* <button onClick={fetchGreeting}>Get Greeting</button> */}
          <Nav />
          <HomePage />
        </div>
      </div>
    </SessionProvider>
  );
}
