import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useEffect, useState } from "react";
import Usdc from "./icons/Usdc";
import Usdt from "./icons/Usdt";
import { Link1Icon } from "@radix-ui/react-icons";

const TableTx = (transactions: any, loading: any) => {
 
    // Function to sort transactions by date
 
  
    return ( <>

    <Table className="border-0">
    
    <TableHeader>
        <TableRow className=" text-black">
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
            <TableRow key={tx.id} className=" text-black border-b">
              <TableCell className="font-medium">{tx.id}</TableCell>
              <TableCell>{tx.type}</TableCell>
              <TableCell>{new Date(tx.createdAt).toUTCString()}</TableCell>
              <TableCell>{tx.network == 137 ? "MATIC" : "ETH"}</TableCell>
              <TableCell>{tx.token == 'usdc' ? <><Usdc /></> : <><Usdt /></>}</TableCell>
              <TableCell>{tx.request}</TableCell>
              <TableCell className="text-right">{tx.fee}</TableCell>
              <TableCell>{tx.distributed}</TableCell>
              <TableCell>{tx.status}</TableCell>
              <TableCell className="text-right">
                <div className="bg-black text-white p-2 rounded-md"> <a href={`https://mumbai.polygonscan.com/address`+tx.trxHash}  target="_blank" >NoOpen in Explorer</a><Link1Icon /></div>
               </TableCell>
            </TableRow>
          )) : <></>}
    </TableBody>
    </Table>
    
    </> );
}
 
export default TableTx;