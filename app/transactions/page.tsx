"use client"

import useTransactions from "@/hooks/useTransactions"
import { Transaction, columns } from "./columns"
import { DataTable } from "./data-table"
import { useAccount } from 'wagmi'
import useAllTransactions from "@/hooks/useAllTransactions"
import xlsx from "json-as-xlsx"
import { Button } from "@/components/ui/button"
import { ReloadIcon, FileIcon } from "@radix-ui/react-icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DownloadIcon, Loader2Icon, LoaderIcon, RocketIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import * as excel from "xlsx";
import { useState } from "react"
import { toast } from "sonner"

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
    const [excelData, setexcelData] = useState([]);
    const [excelDataResponse, setexcelDataResponse] = useState([]);
    const [isUpdating, setisUpdating] = useState(false);

//  const data = await getData()
const downloadFile = (dataType:String) => {
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
      content: dataType == 'all' ? transactions : (dataType == 'deposit' ? filterData(transactions,'deposit') : filterData(transactions,'withdraw')),
    }
   
  ]
  let settings = {
    fileName: "DDI_Transactions",
  }
  xlsx(data, settings)
}


const sortByDate = (trxs: any) => {
  if(trxs?.length >0){
     const sorted = [...trxs].sort((a, b) =>
    new Date(a.createdAt) - new Date(b.createdAt)
  );
  return sorted
  }
  return []
 
};


function filterData(objectArray: any[], targetType: any) {
  return objectArray ? objectArray.filter((obj: { type: any, status:any }) => obj.type === targetType && obj.status == 'pending') : [];
}

const readExcel = (file: any) => {

  try {
     const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
          const bufferArray = e.target.result;
          const wb = excel.read(bufferArray, {
              type: "buffer"
          });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = excel.utils.sheet_to_json(ws);
          //console.log(data);
          resolve(data);
      };
      fileReader.onerror = (error) => {
          reject(error);
      };
  });
  promise.then((d) => {

      setexcelData(d);
  });
  } catch (error) {
    console.log(error)
  }

 
};

const handleUpdateStatus = async (e) => {
  e.preventDefault();
  setisUpdating(true)
  while(isUpdating){
      toast.info("Updating Status. Please wait! :)", {
              
    action: {
      label: "ok",
      onClick: () => console.log("ok"),
      
    },
  
  })
  }

  try {
    const res = await fetch('/api/transactions/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: excelData }),
    });
    const data = await res.json();
    setexcelDataResponse(data.message);
    await refreshTransactions()
    setisUpdating(false)
  } catch (error) {
    setisUpdating(false)
    console.error('Error:', error);
  }
};


  return (
    <div className=" px-52 mx-auto py-10 w-full bg-[#EFEFEF]">
  <div className="flex justify-end py-4 gap-2 ">

 <div className="flex gap-1"><Input id="statusSheet" type="file" className=" rounded-full bg-black" 
onChange={(e) => {
  const file = e.target.files[0] ;
  readExcel(file);

}}
/><Button className=" flex gap-2 rounded-full cursor-pointer bg-teal-500" variant={'outline'} onClick={handleUpdateStatus}>
  {isUpdating ? <> <Loader2Icon className="animate animate-spin" /> Updating </> : <>Update Status</>}
  </Button></div>




    <Button className=" flex gap-2 rounded-full " variant={'outline'} onClick={(e)=>{ e.preventDefault() 
      refreshTransactions()}}>
      <ReloadIcon className="hover:animate-spin" /> Refresh
    </Button>
    
  {/*   <Button className=" flex gap-2 rounded-full " variant={'outline'} onClick={(e)=>{ e.preventDefault() 
      downloadFile()}}>
      <FileIcon  /> Download Excel Sheet
    </Button> */}

    <DropdownMenu>
    <DropdownMenuTrigger className="items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 flex gap-2 rounded-full"> <DownloadIcon />Download Excel Sheet</DropdownMenuTrigger>
    <DropdownMenuContent className="w-full">  
      <DropdownMenuItem onClick={(e)=>{ e.preventDefault() 
      downloadFile('all')}} className="cursor-pointer">All</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={(e)=>{ e.preventDefault() 
      downloadFile('deposit')}} className="cursor-pointer">Deposits</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={(e)=>{ e.preventDefault() 
      downloadFile('withdraw')}} className="cursor-pointer">Withdrawls</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

    </div>

    <Tabs defaultValue="all" className=" w-full border rounded-2xl p-8 bg-[#EFEFEF]">
      
      <TabsList className="bg-[#EFEFEF]">
        <TabsTrigger value="all" className="bg-[#EFEFEF]">All</TabsTrigger>
        <TabsTrigger value="deposit">Deposits</TabsTrigger>
        <TabsTrigger value="withdraw">Withdrawls</TabsTrigger>
      </TabsList>

      <TabsContent value="all"  className="rounded-md bg-[#EFEFEF]">
      <DataTable columns={columns} data={transactions || []} address={address}/>
      {/*  <TableTx transactions={sortByDate(data?.sortedTxs)} loading ={isLoading}/> */}
      </TabsContent>

      <TabsContent value="deposit"  className="rounded-md bg-[#EFEFEF] text-black border-0">
      <DataTable columns={columns} data={filterData(transactions,'deposit') || []} address={address}/>
      </TabsContent>

      <TabsContent value="withdraw"  className="rounded-md bg-[#EFEFEF] text-black ">
      <DataTable columns={columns} data={filterData(transactions,'withdraw') || []} address={address}/>
      </TabsContent>

    </Tabs>



{/*   <div className="rounded-md bg-[#EFEFEF] text-black border-0"> <DataTable columns={columns} data={transactions} address={address}/></div> */}
     
    </div>
  )
}
