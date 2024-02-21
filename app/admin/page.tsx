"use client"
import Image from 'next/image'
import CardBg from '../../public/cardbg.png'
import CardBg2 from '../../public/cardbg2.png'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { networkData } from "@/lib/chainData"
  import { useEffect, useState } from "react"
  import { formatUnits, parseUnits } from "viem"
  import { useContractRead, useNetwork, useAccount, usePrepareContractWrite, useContractWrite } from "wagmi"
import { Link1Icon, PauseIcon, ReloadIcon } from '@radix-ui/react-icons'
import { DownloadIcon, Link2, Loader2Icon, LoaderIcon, Pause, PauseCircleIcon, Play } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button'
import useAllTransactions from "@/hooks/useAllTransactions"
import xlsx from "json-as-xlsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { columns } from '../transactions/columns'
import { DataTable } from '../transactions/data-table'
import * as excel from "xlsx";
import { toast } from "sonner"
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


const WithdrawCards = () => {

    const { address, isConnecting, isDisconnected, isConnected } = useAccount()
    const { chain, chains } = useNetwork()
    const {error, loading, transactions, refreshTransactions} = useAllTransactions()
    
    const [minUsd, setMinUsdData] = useState(0);
    const [totalSupplyData, setTotalSupply] = useState(0);
    const [treasuryAddress, setTreasuryAddress] = useState('');
    const [inputAddress, setinputAddress] = useState('');
    const [userTotalData, setuserTotalData] = useState({
        totalDeposit: '0',
        totalWithdraw:"0",
        accountBalance: 0
    });
    const [excelData, setexcelData] = useState([]);
    const [excelDataResponse, setexcelDataResponse] = useState([]);
    const [isUpdating, setisUpdating] = useState(false);
    const [treasuryForm, settreasuryForm] = useState('');
 

    const { data:minUSDData, isError:minUsdDataError, isLoading:minUsdDataLoading } = useContractRead({
        address: networkData.find((i)=>{return i.chainId == chain?.id})?.dappContract as `0x${string}`,
        abi: [{"inputs":[],"name":"minUsdAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}],
       functionName:"minUsdAmount",

        chainId: chain?.id, 
      
       
    })

    const { data:totalSupply, isError:totalSupplyError, isLoading:totalSupplyLoading } = useContractRead({
        address: networkData.find((i)=>{return i.chainId == chain?.id})?.dappContract as `0x${string}`,
        abi: [{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}],
       functionName:"totalSupply",

        chainId: chain?.id, 
      
       
    })

    const { data:treasuryData, isError:treasuryDataError, isLoading:treasuryDataLoading } = useContractRead({
        address: networkData.find((i)=>{return i.chainId == chain?.id})?.dappContract as `0x${string}`,
        abi: [{"inputs":[],"name":"treasuryWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}],
       functionName:"treasuryWallet",

        chainId: chain?.id, 
      
       
    })

    const { data:pauseData, isError:pauseDataError, isLoading:pauseDataLoading } = useContractRead({
        address: networkData.find((i)=>{return i.chainId == chain?.id})?.dappContract as `0x${string}`,
        abi: [{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}],
       functionName:"paused",
      watch:true,
        chainId: chain?.id, 
      
       
    })

    const { data:userData, isError:userDataError, isLoading:userDataLoading } = useContractRead({
        address: networkData.find((i)=>{return i.chainId == chain?.id})?.dappContract as `0x${string}`,
        abi: [{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userStats","outputs":[{"internalType":"uint256","name":"totalDeposit","type":"uint256"},{"internalType":"uint256","name":"totalWithdraw","type":"uint256"}],"stateMutability":"view","type":"function"}],
       functionName:"userStats",
     
        args: [
            inputAddress
        ],
        chainId: chain?.id, 
        watch:true,
      
       
    })


  const { config: configPause } = usePrepareContractWrite({
      address: networkData.find((i)=>{return i.chainId == chain?.id})?.dappContract as `0x${string}`,
      abi: [{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"}],
      functionName: "pause",
      chainId: chain?.id, 
      staleTime: 2000,
     
  })

  const {
      data:dataPause,
      isError:isErrorPause,
      isLoading:isLoadingPause,
      isSuccess:isSuccessPause,
      write:writePause,
      
    } = useContractWrite(configPause)

  const { config: configUnPause } = usePrepareContractWrite({
      address: networkData.find((i)=>{return i.chainId == chain?.id})?.dappContract as `0x${string}`,
      abi: [{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"}],
      functionName: "unpause",
      chainId: chain?.id, 
      staleTime: 2000,
     
  })

  const {
      data:dataUnPause,
      isError:isErrorUnPause,
      isLoading:isLoadingUnPause,
      isSuccess:isSuccessUnPause,
      write:writeUnPause,
      
    } = useContractWrite(configUnPause)

    const { config: configTreasury } = usePrepareContractWrite({
      address: networkData.find((i)=>{return i.chainId == chain?.id})?.dappContract as `0x${string}`,
      abi: [{"inputs":[{"internalType":"address","name":"_treasuryWallet","type":"address"}],"name":"setTreasuryWallet","outputs":[],"stateMutability":"nonpayable","type":"function"}],
      functionName: "setTreasuryWallet",
      args: [
        treasuryForm, // convert to wei 
    ],
      chainId: chain?.id, 
      staleTime: 2000,

      onSuccess: ()=>{
        toast.success("Treasury Wallet Updated!  :)", {
                  
          action: {
            label: "ok",
            onClick: () => console.log("ok"),
            
          },
        
        })
      }
     
  })

  const {
      data:dataTreasury,
      isError:isErrorTreasury,
      isLoading:isLoadingTreasury,
      isSuccess:isSuccessTreasury,
      write:writeTreasury,
      
    } = useContractWrite(configTreasury)


    useEffect(()=>{
        if(minUSDData){

            setMinUsdData(formatUnits(minUSDData,6) )
            
        }

    },[minUSDData])

    useEffect(()=>{
        if(totalSupply){

            setTotalSupply(formatUnits(totalSupply,18) )
            
        }

    },[totalSupply])

    useEffect(()=>{
        if(treasuryData){

            setTreasuryAddress(String(treasuryData))
            
        }

    },[treasuryData])

    useEffect(()=>{
       
        if (userData && Array.isArray(userData) && userData.length > 0) {
            let dataa = { 
                totalDeposit : formatUnits(userData[0],6),
                totalWithdraw : formatUnits(userData[1],18),
                accountBalance: Number(formatUnits(userData[0],6)) - (Number(formatUnits(userData[1],18)) *100)
            }
            setuserTotalData(dataa);
        }
        
        console.log(userData)
    },[userData])


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

    const adminWallets = [
      "0xE7EC76C165b915C24928d1c11F4C073b8992F296",
      "0x7496E853013eE234301C80848C2e4945f2a52980"
    ]



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
      fileName: "MySpreadsheet",
    }
    xlsx(data, settings)
  }

  function filterData(objectArray: any[], targetType: any) {
    return objectArray ? objectArray.filter((obj: { type: any, status:any }) => obj.type === targetType && (targetType == 'withdraw' ? obj.status == 'pending' : obj.status == 'success')) : [];
  }
  
    
    

  return (

    address && adminWallets.includes(address) ?
    <>  
    
    <div className="flex flex-col md:flex-row w-full h-full n items-center xl:p-24 p-8 lg:p-24 md:p-24 bg-black text-white gap-10 md:justify-center align-middle  md:items-center sm:text-center">


{String(pauseData) == 'true' ? <div className='absolute top-28 text-white' >Contract is <Badge  variant="destructive" className=' uppercase'>Paused</Badge></div> : <div className='absolute top-28'>Contract is <Badge className=' bg-green-700 uppercase' >Live</Badge></div> }



    {/* Cards on the Right Side */}
    <div className="flex flex-col md:flex-row flex-wrap space-y-4 md:space-y-0 md:space-x-4 pt-10">

      {/* Card 1 */}
      <div className="relative bg-black px-8 py-4 border-[1px] border-gray-600 rounded-lg shadow-md flex-1 overflow-hidden">
      <Image className="absolute overflow-hidden p-0 -left-10 -top-10" src={CardBg} width={150} height={150} alt='l'/>
        <div className="relative w-full h-full border-radius-16 overflow-hidden border-solid border-1 border-gray-700">


          <div className="md:left-103 md:top-174 pt-4">
            <div className="left-27 top-0 text-right text-gray-500 text-xs font-semibold uppercase leading-4 tracking-wider break-words">
              Minimum Deposit
            </div>
            <div className="left-0 top-32 text-right text-white text-3xl font-light leading-10 break-words">
            $ {minUsd}
            </div>
          </div>

        </div>
      </div>

      {/* Card 2 */}
      <div className="relative bg-black px-8 py-4 border-[1px] border-gray-600 rounded-lg shadow-md flex-1 overflow-hidden">
     
      <div className="relative w-full h-full border-radius-16 overflow-hidden border-solid border-1 border-gray-700">


            <div className="md:left-103 md:top-174 pt-4">
            <div className="left-27 top-0 text-right text-gray-500 text-xs font-semibold uppercase leading-4 tracking-wider break-words">
           Total DDI Supply
            </div>
            <div className="left-0 top-32 text-right text-white text-3xl font-light leading-10 break-words">
                {totalSupplyData} DDI
            </div>
            </div>

            </div>
      </div>

      {/* Card 3 */}
      <div className="relative bg-black px-8 py-4 border-[1px] border-gray-600 rounded-lg shadow-md overflow-hidden flex-grow">
      <Image className="absolute overflow-hidden p-0 -left-10 -top-10" src={CardBg} width={120} height={120} alt='l'/>
      <div className="relative w-full h-full border-radius-16 overflow-hidden border-solid border-1 border-gray-700">

     

            <div className="md:left-103 md:top-174 pt-10">
            <div className="left-27 top-0 text-right text-gray-500 text-xs font-semibold uppercase leading-4 tracking-wider break-words">
            Treasury Wallet
            </div>
            <div className="flex justify-center align-middle text-center items-center gap-2 mt-2  text-black text-sm font-semibold p-1  break-words bg-white rounded-full cursor-pointer" onClick={()=>{
                
            }}>
                {treasuryAddress}
                <Link2 />
            </div>
            </div>

            </div>
      </div>

    </div>
   
  </div>

  <div className='flex justify-center bg-black w-full'><h2 className='text-2xl font-bold'>Admin Tools</h2></div>
   
  <div className='flex justify-center py-10 bg-black w-full h-full'>
    
        <div className='flex flex-col gap-2 text-left w-2/3 md:w-1/3'>
            <h3>Get User Stats</h3>

        <div className='flex gap-2 text-center align-middle items-center'>
    
        <input type='text' className='flex px-2 py-1 rounded-sm outline-none w-full bg-white text-black font-semibold' placeholder='0xE1xjoih32h2uhuhjbiuhi2...' onChange={(e)=>{e.preventDefault()
            setinputAddress(e.target.value)}}></input> 
        
       {/*  <Button className='text-sm font-semibold hover:bg-gray-300 text-center align-middle items-center rounded-full py-1 px-2 outline-none shadow-md'>Get Data</Button> */}
        
        </div>
            
<div className=' flex flex-col p-4 bg-white text-black rounded-md justify-center text-center font-semibold gap-2'>
                <div>
                  
                  {userTotalData ? <>Account Balance: 
                <span className='px-2 py-1 ml-2 rounded-full text-white shadow-2xl bg-blue-500'>$ {userTotalData?.accountBalance}</span> </> : <> $ 0.00 </>}
                
                </div>
                <div>
                  
                  {userTotalData ? <>Total Deposit: 
                  <span className='px-2 py-1 ml-2 rounded-full text-white shadow-2xl bg-green-500'>$ {userTotalData?.totalDeposit}</span> </> : <> $ 0.00 </>}
                  
                  </div>
                <div>
                  
                  {userTotalData ? <>Total Withdraw:  
                    <span className='px-2 py-1 ml-2 rounded-full text-white shadow-2xl bg-red-500'>{userTotalData?.totalWithdraw} DDI = $ {Number(userTotalData?.totalWithdraw)*Number(minUsd)}  </span></> : <> $ 0.00 </>}
                  
                  </div>
        </div>
        </div>

        

        
    

    </div>

    <div className='flex justify-center bg-black w-full'><h2 className='text-2xl font-bold'>Contract Functions</h2></div>

    <div className='flex flex-col gap-8 bg-black justify-center align-middle text-center items-center py-10'>
      
  

      <div className='flex flex-col bg-black justify-center align-middle text-center items-center gap-2'>
        <label> Press This button to Pause/Unpause the Contract </label>

    {isLoadingPause || isLoadingUnPause ? <>
      <Button className=' bg-blue-600 rounded-full hover:bg-blue-950 ml-2' variant={'outline'} 
       disabled
        >

          {isLoadingPause ? <><LoaderIcon className=' animate-spin pr-2' />Pausing</> : <><LoaderIcon className=' animate-spin pr-2' /> Unpausing</> } Contract</Button>
     </> : <><Button className=' bg-blue-600 rounded-full hover:bg-blue-950 ml-2' variant={'outline'} 
        onClick={()=>{
          String(pauseData) == 'true' ?  writeUnPause?.() :  writePause?.() 
        }}
        >

          {String(pauseData) == 'true' ? <><Play className='pr-1' />Unpause</> : <><Pause className='pr-1' /> Pause</> } Contract</Button></>}

        


      </div>

      <div className='flex flex-col bg-black justify-center align-middle text-center items-center gap-2 w-1/3'>
        <label> Change Treasury Wallet </label>

        <div className='flex  w-full gap-1'>
          <Input type="text" placeholder="0xB23Hidi7k3b2..." onChange={(e)=>settreasuryForm(e.target.value)} className='px-2 py-1' /> 

          {isLoadingTreasury && !isSuccessTreasury ? <>    <Button className=' bg-blue-600 rounded-full hover:bg-blue-950 ' variant={'outline'}
        disabled><LoaderIcon className=' animate-spin pr-2' />Updating</Button></> : <>    <Button className=' bg-blue-600 rounded-full hover:bg-blue-950 ' variant={'outline'}
          onClick={()=>writeTreasury?.()}
          >Update</Button></>}
      
        </div>
       

    
      </div>
      
    </div>


    <div className=" lg:px-72 px-10 mx-auto py-10 w-full bg-black">
  <div className="flex flex-col md:flex-row justify-end py-4 gap-2">

  <div className="flex gap-1"><Input id="statusSheet" type="file" className=" rounded-full bg-black" 
onChange={(e) => {
  const file = e.target.files[0] ;
  readExcel(file);

}}
/>

<TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
        <Button className=" flex gap-2 rounded-full cursor-pointer bg-teal-500" variant={'outline'} onClick={handleUpdateStatus}>
  {isUpdating ? <> <Loader2Icon className="animate animate-spin" /> Updating </> : <>Update Status</>}
  </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className='font-bold'>Upload the updated excel sheet and press this button.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

{/* <Button className=" flex gap-2 rounded-full cursor-pointer bg-teal-500" variant={'outline'} onClick={handleUpdateStatus}>
  {isUpdating ? <> <Loader2Icon className="animate animate-spin" /> Updating </> : <>Update Status</>}
  </Button> */}
  
  </div>


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
      downloadFile('all')}} className="cursor-pointer  ">All</DropdownMenuItem>
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
      
      <TabsList className="bg-[#EFEFEF] text-black">
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

  
  </>
  :
   null

  
  )
}

export default WithdrawCards


//  const data = await getData()
