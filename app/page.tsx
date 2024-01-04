
"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Deposit from '@/components/DepositTab'
import Withdraw from '@/components/WithdrawTab'
import DepositCard from '@/components/DepositCard'
import { useAccount } from 'wagmi'
import TransactionTable from "@/components/TransactionsTable"
import { columns } from "./transactions/columns"
import { DataTable } from "./transactions/data-table"
import useTransactions from "@/hooks/useTransactions"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"


export default function Home() {

  const { address, isConnecting, isDisconnected } = useAccount()

  const {error, loading, transactions, refetchTransactions } = useTransactions(address)



  useEffect(()=>{
    refetchTransactions()
  },[address,isDisconnected])

  return (
    <main className="flex min-h-screen flex-col items-center  xl:p-24 p-8 lg:p-24 md:p-24">

  <div className='flex justify-center w-full pb-20'>
    
    <Tabs defaultValue="deposit" className="w-full">

    <div className='flex justify-center text-lg'>  
    
      <TabsList className='  '>
        <TabsTrigger value="deposit" className='py-2 text-xs font-medium'>Deposit</TabsTrigger>
        <TabsTrigger value="withdraw" className='py-2 text-xs font-medium'>Withdraw</TabsTrigger>
      </TabsList>
  
    </div>

<div className='flex justify-center'>
  
  <TabsContent value="deposit" className='w-full'>
  <Deposit />
</TabsContent>
  <TabsContent value="withdraw" className='w-full'><Withdraw /></TabsContent></div>
  
</Tabs></div>

<div className='flex justify-center w-full pb-20'>
 
  <DepositCard isDeposit={true} />
</div>

<div className=" mx-auto py-10 w-full">
  <div className="flex justify-end py-4">
    <Button className=" flex gap-2 rounded-full " variant={'outline'} onClick={(e)=>{ e.preventDefault() 
      refetchTransactions()}}>
      <ReloadIcon className="hover:animate-spin" /> Refresh
    </Button></div>
  
      <DataTable columns={columns} data={transactions } address={address}/>
    </div>
   
   
    </main>
  )
}
