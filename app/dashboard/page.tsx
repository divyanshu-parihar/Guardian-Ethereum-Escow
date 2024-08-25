"use client";
import Nav from "@/components/Nav";
import { useAccount } from "wagmi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { NewEscrowForm } from "@/forms/newTransaction";

const ActionTypes = {
  Paid: "Paid",
  Submitted: "Submitted",
  Pending: "Pending",
  Disputed: "Disputed",
  Finalized: "Finalized",
};
const invoices = [
  {
    TxID: "0x99999999",
    Status: "Paid",
    totalAmount: "2",
    Currency: "ETH",
  },
  {
    TxID: "0x99999999",
    Status: "Submitted",
    totalAmount: "0.01",
    Currency: "ETH",
  },
];

function page() {
  const { address: addr, isConnected, isConnecting } = useAccount();
  return (
    <div className="px-4 md:px-16">
      <Nav />
      <div className="new_trasactions mt-8 border border-blue-500 border-x-2 border-y-2 p-2">
        <div className="text-2xl font-bold">New Escrow</div>
        <NewEscrowForm />
      </div>
      <div className="mt-8">
        <div className="text-2xl font-bold">Recent Escrows</div>
        <Table>
          <TableCaption>A list of your recent escrows.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"> ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Currency</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.TxID}>
                <TableCell className="font-medium">{invoice.TxID}</TableCell>
                <TableCell>{invoice.Status}</TableCell>
                <TableCell>{invoice.Currency}</TableCell>
                <TableCell className="text-right">
                  {invoice.totalAmount} ETH
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/invoice/${invoice.TxID}`}>View</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">10ETH</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
export default page;
