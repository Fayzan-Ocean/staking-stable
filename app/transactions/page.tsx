"use client"

import useTransactions from "@/hooks/useTransactions"
import { Transaction, columns } from "./columns"
import { DataTable } from "./data-table"
import { useAccount } from 'wagmi'
import useAllTransactions from "@/hooks/useAllTransactions"


/* async function getData(): Promise<Transaction[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
} */

export default  function DemoPage() {
    const { address, isConnecting, isDisconnected } = useAccount()
    const {error, loading, transactions} = useAllTransactions()

//  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={transactions} address={address} />
    </div>
  )
}
