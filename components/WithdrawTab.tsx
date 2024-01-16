"use client"

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


const Withdraw = () => {

    const { address, isConnecting, isDisconnected, isConnected } = useAccount()
    const { chain, chains } = useNetwork()
    const [userTotalData, setuserTotalData] = useState({
        totalDeposit: '0',
        totalWithdraw:"0",
        accountBalance: 0
    });

    const { data:userData, isError:userDataError, isLoading:userDataLoading } = useContractRead({
        address: networkData.find((i)=>{return i.chainId == chain?.id})?.dappContract as `0x${string}`,
        abi: [{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userStats","outputs":[{"internalType":"uint256","name":"totalDeposit","type":"uint256"},{"internalType":"uint256","name":"totalWithdraw","type":"uint256"}],"stateMutability":"view","type":"function"}],
       functionName:"userStats",
     
        args: [
            address
        ],
        chainId: chain?.id, 
        watch:true,
      
       
    })

    useEffect(()=>{
       
        if (userData && Array.isArray(userData) && userData.length > 0) {
            let dataa = { 
                totalDeposit : formatUnits(userData[0],6),
                totalWithdraw : formatUnits(userData[1],18),
                accountBalance: Number(formatUnits(userData[0],6)) - (Number(formatUnits(userData[1],18)) *10)
            }
            setuserTotalData(dataa);
        }
        
        console.log(userData)
    },[userData])



    return (  <>
    



    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 md:gap-12 w-full pt-10 auto-cols-[minmax(0,_4fr)]">
    <Card
        className=" p-6 sm:p-7 text-left gap-2 w-full
    rounded-2xl bg-slate-700
    "
    >
        <p
        className="font-medium w-full whitespace-nowrap inline-flex"
        data-numeric="true"
        >
          {userTotalData ? <>${userTotalData?.accountBalance} USD</> : <> $0.00 USD</>}
        </p>
        <p className="text-xs">
        Account Balance
        </p>
    </Card>
    <Card
        className="
    p-6 sm:p-7 text-left gap-4 w-full
    brounded-2xl bg-slate-700
    "
    >
        <p
        className="font-medium w-full whitespace-nowrap inline-flex"
        data-numeric="true"
        >
       {userTotalData && Number(userTotalData?.totalWithdraw) !=0 ? <>${Number(userTotalData?.totalWithdraw)*10} USD</> : <> $0.00 USD</>}
        </p>
        <p className="text-xs ">
        Total Withdrawn
        </p>
    </Card>
    <Card
        className="
    p-6 sm:p-7 text-left gap-4 w-full
    rounded-2xl bg-slate-700
    "
    >
        <p
        className="font-medium w-full whitespace-nowrap inline-flex"
        data-numeric="true"
        >
        $0.00 USD
        </p>
        <p className="text-xs">
        Pending Withdrawl
        </p>
    </Card>
    <Card
        className="
    p-6 sm:p-7 text-left gap-4 w-full
    rounded-2xl bg-slate-700
    "
    >
        <p
        className="font-medium w-full whitespace-nowrap inline-flex overflow-auto"
        data-numeric="true"
        >
        $0.00 USD
        </p>
        <p className="text-xs ">
        Total Fees
        </p>
    </Card>
    </div>

    
    

    </>);
}
 
export default Withdraw;