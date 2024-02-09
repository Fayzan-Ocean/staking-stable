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
  import { useContractRead, useNetwork, useAccount } from "wagmi"
import { Link1Icon, ReloadIcon } from '@radix-ui/react-icons'
import { DownloadIcon, Link2 } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button'
import useAllTransactions from "@/hooks/useAllTransactions"
import xlsx from "json-as-xlsx"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs'
import { columns } from '../transactions/columns'
import { DataTable } from '../transactions/data-table'



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




  return (
    <>  
    
    <div className="flex flex-col md:flex-row w-full h-full n items-center xl:p-24 p-8 lg:p-24 md:p-24 bg-black text-white gap-10 md:justify-center align-middle  md:items-center sm:text-center">


{String(pauseData) == 'true' ? <div className='absolute top-28 text-white' >Contract is <Badge  variant="destructive" className=' uppercase'>Paused</Badge></div> : <div className='absolute top-28'>Contract is <Badge className=' bg-green-700 uppercase' >Live</Badge></div> }


    {/* Cards on the Right Side */}
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">

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
  <div className='flex justify-center bg-black w-full'><h2 className='text-2xl'>Admin Tools</h2></div>
   
  <div className='flex justify-center py-10 bg-black w-full h-full'>
    <div></div>
       
        <div className='flex flex-col gap-2 text-left w-1/3'>
            <h3>Get User Stats</h3>

        <div className='flex gap-2 text-center align-middle items-center'>
    
        <input type='text' className='flex px-2 py-1 rounded-sm outline-none w-full bg-white text-black font-semibold' placeholder='0xE1xjoih32h2uhuhjbiuhi2...' onChange={(e)=>{e.preventDefault()
            setinputAddress(e.target.value)}}></input> 
        
       {/*  <Button className='text-sm font-semibold hover:bg-gray-300 text-center align-middle items-center rounded-full py-1 px-2 outline-none shadow-md'>Get Data</Button> */}
        
        </div>
            
<div className=' flex flex-col p-4 bg-white text-black rounded-md justify-center text-center font-semibold'>
                <div>{userTotalData ? <>Account Balance: $ {userTotalData?.accountBalance} </> : <> $ 0.00 </>}</div>
                <div>{userTotalData ? <>Total Deposit: $ {userTotalData?.totalDeposit} </> : <> $ 0.00 </>}</div>
                <div>{userTotalData ? <>Total Withdraw: $ {userTotalData?.totalWithdraw} </> : <> $ 0.00 </>}</div>
        </div>
        </div>

        

        
    

    </div>


    <div className="container mx-auto w-full bg-black">
  <div className="flex justify-end py-4 gap-2">
    <Button className=" flex gap-2 rounded-full " variant={'outline'} onClick={(e)=>{ e.preventDefault() 
      refreshTransactions()}}>
      <ReloadIcon className="hover:animate-spin" /> Refresh
    </Button>
    
  {/*   <Button className=" flex gap-2 rounded-full " variant={'outline'} onClick={(e)=>{ e.preventDefault() 
      downloadFile()}}>
      <FileIcon  /> Download Excel Sheet
    </Button> */}

    <DropdownMenu>
    <DropdownMenuTrigger className="items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-black shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 flex gap-2 rounded-full"> <DownloadIcon />Download Excel Sheet</DropdownMenuTrigger>
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
  

  
  )
}

export default WithdrawCards


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
      fileName: "MySpreadsheet",
    }
    xlsx(data, settings)
  }

  function filterData(objectArray: any[], targetType: any) {
    return objectArray ? objectArray.filter((obj: { type: any }) => obj.type === targetType) : [];
  }
  