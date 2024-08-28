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
const formSchema = z.object({
  receiverAddr: z.string().min(2, {
    message: "Please enter a valid address.",
  }),
  amount: z.string(),
  description: z.string(),
});

export function NewEscrowForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receiverAddr: "",
      amount: "0.01",
      description: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
