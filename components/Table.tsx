import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useEffect } from "react";
import Usdc from "./icons/Usdc";
import Usdt from "./icons/Usdt";

const TableTx = (transactions: any, loading: any) => {

   
   
    return ( <>

    <Table>
    
    <TableHeader>
        <TableRow>
        <TableHead className="w-[100px]">ID</TableHead>
        <TableHead>Type</TableHead>
        <TableHead>Date</TableHead>
        <TableHead >Network</TableHead>
        <TableHead >Asset</TableHead>
        <TableHead >Request</TableHead>
        <TableHead >Fee</TableHead>
        <TableHead >Distributed</TableHead>
        <TableHead >Status</TableHead>
        <TableHead className="text-right">Tx Hash</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>

       
        
    {transactions.transactions?.length >0 && !transactions.loading ?  transactions.transactions?.map((tx: any) => (
            <TableRow key={tx.id}>
              <TableCell className="font-medium">{tx.id}</TableCell>
              <TableCell>{tx.type}</TableCell>
              <TableCell>{new Date(tx.createdAt).toUTCString()}</TableCell>
              <TableCell>{tx.network == 137 ? "MATIC" : "ETH"}</TableCell>
              <TableCell>{tx.token == 'usdc' ? <><Usdc /></> : <><Usdt /></>}</TableCell>
              <TableCell>{tx.request}</TableCell>
              <TableCell className="text-right">{tx.fee}</TableCell>
              <TableCell>{tx.distributed}</TableCell>
              <TableCell>{tx.status}</TableCell>
              <TableCell className="text-right"><a href={`https://polygonscan.com/address`+tx.trxHash}  target="_blank">Open in Explorer</a></TableCell>
            </TableRow>
          )) : <></>}
    </TableBody>
    </Table>
    
    </> );
}
 
export default TableTx;