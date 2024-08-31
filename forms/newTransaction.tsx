"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ethers, parseEther } from "ethers";
import EscrowABI from "../artifacts/contracts/Escrow.sol/Escrow.json";
import Web3 from "web3";
import { useState } from "react";
///
const formSchema = z.object({
  receiverAddr: z.string().min(2, {
    message: "Please enter a valid address.",
  }),
  amount: z.string(),
  description: z.string(),
});

export function NewEscrowForm() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [value, setValue] = useState(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receiverAddr: "",
      amount: "0.01",
      description: "",
    },
  });
  const makeContract = async () => {
    // Connect to the Ethereum provider (e.g., MetaMask)

    if (!window.ethereum) {
      console.log("No metamask found");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum as any);

    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    // setProvider(provider);

    console.log("Signer address:", await signer.getAddress());
    const contract = new ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      EscrowABI.abi,
      signer
    );

    // const result = await contract.saySomething();
    // con
    const amount = parseEther(form.getValues("amount"));
    // const amount = ethers.utils.parseEther(form.getValues("amount"));
    await contract.createTask(
      form.getValues("receiverAddr"),
      amount,
      form.getValues("description")
    );
    console.log("Done");
    // console.log(result);
    // // Create a contract instance
    // const contract = new ethers.Contract(
    //   contractAddress,
    //   contractABI,
    //   provider
    // );
    // setContract(contract);
  };

  // 1. Define your form.

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const { ethereum } = window;

      if (ethereum) {
        // const web3 = new Web3(ethereum);
        await makeContract();
        // const TaskContract = new web3.eth.Contract(
        //   EscrowABI.abi,
        //   "0x5FbDB2315678afecb367f032d93F642f64180aa3"
        // );
        // let address = await TaskContract.methods.saySomething().call();
        // console.log(address);
        // // allTasks = allTasks.map((task) => ({
        // //   id: task.id.toString(),
        // //   taskText: task.taskText,
        // //   wallet: task.wallet,
        // //   taskDate: new Date(task.taskDate * 1000).toLocaleDateString(),
        // //   taskTime: new Date(task.taskDate * 1000).toLocaleTimeString(),
        // //   isDeleted: task.isDeleted,
        // // }));
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="receiverAddr"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Receiver Address</FormLabel>
              <FormControl>
                <Input placeholder="0x00...." {...field} />
              </FormControl>
              <FormDescription>
                Enter the address of the receiver.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ETH Amount</FormLabel>
              <FormControl>
                <Input placeholder="0.01" {...field} />
              </FormControl>
              <FormDescription>
                Enter the Amount to be escrowed.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brief Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="NOTE : This will be used in case of dispute."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter a description for the escrow.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
