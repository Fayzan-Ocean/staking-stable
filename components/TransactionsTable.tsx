import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TableTx from "./Table";
import useTransactions from "@/hooks/useTransactions";
import { useEffect } from "react";
import { useAccount } from 'wagmi'

const TransactionTable = () => {
    const { address, isConnecting, isDisconnected } = useAccount()

    const {error, loading, transactions} = useTransactions(address)

  

    
    return ( <>
    
    <Tabs defaultValue="all" className=" w-full ">
  <TabsList>
    <TabsTrigger value="all">All</TabsTrigger>
    <TabsTrigger value="deposit">Deposits</TabsTrigger>
    <TabsTrigger value="withdraw">Withdrawls</TabsTrigger>
  </TabsList>
  <TabsContent value="all"  className="rounded-md bg-slate-700">
    
    <TableTx transactions={transactions} loading ={loading}/>
  </TabsContent>
  <TabsContent value="deposit"  className="rounded-md bg-slate-700">
  <TableTx />
  </TabsContent>
  <TabsContent value="withdraw"  className="rounded-md bg-slate-700">
  <TableTx />
  </TabsContent>
</Tabs>
    
    </> );
}
 
export default TransactionTable;