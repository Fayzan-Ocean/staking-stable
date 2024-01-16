import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TableTx from "./Table";
import useTransactions from "@/hooks/useTransactions";
import { useEffect } from "react";
import { useAccount } from 'wagmi'
import useSWR from 'swr'
import { columns } from "@/app/transactions/columns";
import { DataTable } from "@/app/transactions/data-table";


const TransactionTable = () => {
    const { address, isConnecting, isDisconnected } = useAccount()

    const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

    const { data, error, isLoading } = useSWR(`/api/transactions?ethAddress=${address}`, fetcher)

  //  const {error, loading, transactions} = useTransactions(address)



  const sortByDate = (trxs: any) => {
    if(trxs?.length >0){
       const sorted = [...trxs].sort((a, b) =>
      new Date(a.createdAt) - new Date(b.createdAt)
    );
    return sorted
    }
    return []
   
  };
  useEffect(()=>{
    console.log(data)
        },[data])
    
    return ( <>
    
    <Tabs defaultValue="all" className=" w-full ">
  <TabsList>
    <TabsTrigger value="all">All</TabsTrigger>
    <TabsTrigger value="deposit">Deposits</TabsTrigger>
    <TabsTrigger value="withdraw">Withdrawls</TabsTrigger>
  </TabsList>
  <TabsContent value="all"  className="rounded-md bg-slate-700">
  <DataTable columns={columns} data={sortByDate(data?.sortedTxs) } address={address}/>
   {/*  <TableTx transactions={sortByDate(data?.sortedTxs)} loading ={isLoading}/> */}
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