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



const WithdrawCards = () => {

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
                accountBalance: Number(formatUnits(userData[0],6)) - (Number(formatUnits(userData[1],18)) *100)
            }
            setuserTotalData(dataa);
        }
        
        console.log(userData)
    },[userData])




  return (
    <div className="flex flex-col md:flex-row w-full n items-center xl:p-24 p-8 lg:p-24 md:p-24 bg-black text-white gap-10 md:justify-center align-middle  md:items-center sm:text-center">

    {/* Text on the Left Side */}
    <div className="flex flex-col max-w-md md:mr-8  ">
      <h1 className="text-4xl font-bold mb-4">Welcome back,</h1>
      <p className="text-lg">Investeren in hoogrenderende sectoren met de DDI free community.</p>
      <div className="relative w-full md:w-auto h-full md:pt-10">

        <div className="text-gray-500 text-xs font-semibold uppercase leading-4 tracking-wider break-words">
          Account Balance
        </div>
        <div className="text-white text-4xl font-light leading-12 break-words">
        {userTotalData ? <>$ {userTotalData?.accountBalance} </> : <> $ 0.00 </>}
        </div>

      </div>
    </div>

    {/* Cards on the Right Side */}
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">

      {/* Card 1 */}
      <div className="relative bg-black p-4 border-[1px] border-gray-600 rounded-lg shadow-md flex-1 overflow-hidden">
      <Image className="absolute overflow-hidden p-0 -left-10 -top-10" src={CardBg} width={150} height={150} alt='l'/>
        <div className="relative w-full h-full border-radius-16 overflow-hidden border-solid border-1 border-gray-700">

          <div className="absolute px-1 h-22.73 text-center bg-teal-800 rounded text-teal-400 text-base font-bold leading-84.50 break-words">+30%</div>
          <div className="w-56 h-23 mt-4 md:mt-0 md:left-152 md:top-30 text-right text-white text-base font-normal leading-26 break-words">
            from last week
          </div>

          <div className="md:left-103 md:top-174 pt-10">
            <div className="left-27 top-0 text-right text-gray-500 text-xs font-semibold uppercase leading-4 tracking-wider break-words">
              Total Withdrawn
            </div>
            <div className="left-0 top-32 text-right text-white text-3xl font-light leading-10 break-words">
            {userTotalData && Number(userTotalData?.totalWithdraw) !=0 ? <>${Number(userTotalData?.totalWithdraw)*100} </> : <> $0.00 </>}
            </div>
          </div>

        </div>
      </div>

      {/* Card 2 */}
      <div className="relative bg-black p-4 border-[1px] border-gray-600 rounded-lg shadow-md flex-1 overflow-hidden">
      <Image className="absolute overflow-hidden p-0 -right-10 -top-10" src={CardBg2} width={150} height={150} alt='l'/>
      <div className="relative w-full h-full border-radius-16 overflow-hidden border-solid border-1 border-gray-700">

            <div className="absolute px-1 h-22.73 text-center bg-teal-800 rounded text-teal-400 text-base font-bold leading-84.50 break-words">+30%</div>
            <div className="w-56 h-23 mt-4 md:mt-0 md:left-152 md:top-30 text-right text-white text-base font-normal leading-26 break-words">
            from last week
            </div>

            <div className="md:left-103 md:top-174 pt-10">
            <div className="left-27 top-0 text-right text-gray-500 text-xs font-semibold uppercase leading-4 tracking-wider break-words">
            Monthly Returns
            </div>
            <div className="left-0 top-32 text-right text-white text-3xl font-light leading-10 break-words">
                $0
            </div>
            </div>

            </div>
      </div>

      {/* Card 3 */}
      <div className="relative bg-black p-4 border-[1px] border-gray-600 rounded-lg shadow-md flex-1 overflow-hidden">
      <Image className="absolute overflow-hidden p-0 -left-10 -top-10" src={CardBg} width={120} height={120} alt='l'/>
      <div className="relative w-full h-full border-radius-16 overflow-hidden border-solid border-1 border-gray-700">

            <div className="absolute px-1 h-22.73 text-center bg-teal-800 rounded text-teal-400 text-base font-bold leading-84.50 break-words">+30%</div>
            <div className="w-56 h-23 mt-4 md:mt-0 md:left-152 md:top-30 text-right text-white text-base font-normal leading-26 break-words">
            from last week
            </div>

            <div className="md:left-103 md:top-174 pt-10">
            <div className="left-27 top-0 text-right text-gray-500 text-xs font-semibold uppercase leading-4 tracking-wider break-words">
            Total Returns
            </div>
            <div className="left-0 top-32 text-right text-white text-3xl font-light leading-10 break-words">
                $0
            </div>
            </div>

            </div>
      </div>

    </div>
  </div>
  )
}

export default WithdrawCards
