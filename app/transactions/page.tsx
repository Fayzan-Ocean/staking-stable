"use client"

import useTransactions from "@/hooks/useTransactions"
import { Transaction, columns } from "./columns"
import { DataTable } from "./data-table"
import { useAccount } from 'wagmi'
import useAllTransactions from "@/hooks/useAllTransactions"
import xlsx from "json-as-xlsx"
import { Button } from "@/components/ui/button"
import { ReloadIcon, FileIcon } from "@radix-ui/react-icons"


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
    const {error, loading, transactions, refreshTransactions} = useAllTransactions()

//  const data = await getData()
const downloadFile = () => {
  let data = [
    {
      sheet: "Staking",
      columns: [
        { label: "ID", value: "id" }, // Top level data
        { label: "Type", value: "type" }, // Custom format
        { label: "Amount", value: "amount" }, // Custom format
        { label: "Status", value: "status" }, // Custom format
        { label: "Token", value: "token" }, // Custom format
        { label: "Network", value: "network" }, // Custom format
        { label: "Request", value: "request" }, // Custom format
        { label: "Fee", value: "fee" }, // Custom format
        { label: "Distributed", value: "distributed" }, // Custom format
        { label: "Trx Hash", value: "trxHash" }, // Custom format
      ],
      content: transactions,
    }
   
  ]
  let settings = {
    fileName: "MySpreadsheet",
  }
  xlsx(data, settings)
}
  return (
    <div className="container mx-auto py-10 w-full">
  <div className="flex justify-end py-4 gap-2">
    <Button className=" flex gap-2 rounded-full " variant={'outline'} onClick={(e)=>{ e.preventDefault() 
      refreshTransactions()}}>
      <ReloadIcon className="hover:animate-spin" /> Refresh
    </Button>
    
    <Button className=" flex gap-2 rounded-full " variant={'outline'} onClick={(e)=>{ e.preventDefault() 
      downloadFile()}}>
      <FileIcon  /> Download Excel Sheet
    </Button>

    </div>
  
      <DataTable columns={columns} data={transactions } address={address}/>
    </div>
  )
}
