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


  function filterData(objectArray, targetType) {
    return objectArray ? objectArray.filter(obj => obj.type === targetType) : [];
  }

    //console.log(data)
    return ( <>
    
    <Tabs defaultValue="all" className=" w-full border rounded-2xl p-8 bg-[#EFEFEF]">
      
      <TabsList className="bg-[#EFEFEF]">
        <TabsTrigger value="all" className="bg-[#EFEFEF]">All</TabsTrigger>
        <TabsTrigger value="deposit">Deposits</TabsTrigger>
        <TabsTrigger value="withdraw">Withdrawls</TabsTrigger>
      </TabsList>

      <TabsContent value="all"  className="rounded-md bg-[#EFEFEF]">
      <DataTable columns={columns} data={data?.sortedTxs || []} address={address}/>
      {/*  <TableTx transactions={sortByDate(data?.sortedTxs)} loading ={isLoading}/> */}
      </TabsContent>

      <TabsContent value="deposit"  className="rounded-md bg-[#EFEFEF] text-black border-0">
      <DataTable columns={columns} data={filterData(data?.sortedTxs,'deposit') || []} address={address}/>
      </TabsContent>

      <TabsContent value="withdraw"  className="rounded-md bg-[#EFEFEF] text-black">
      <DataTable columns={columns} data={filterData(data?.sortedTxs,'withdraw') || []} address={address}/>
      </TabsContent>

    </Tabs>
    
    </> );
}
 
export default TransactionTable;