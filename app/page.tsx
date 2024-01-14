"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useAccount } from 'wagmi'
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import Deposit from '@/components/DepositTab'
import Withdraw from '@/components/WithdrawTab'
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import DepositCard from '@/components/DepositCard'

const Home = () => {

    const { address, isConnecting, isDisconnected } = useAccount()
    const [progressValue, setProgressValue] = useState(33)


  return (
    <main className="flex flex-col items-center h-screen justify-center ">
        

       


        <Tabs defaultValue="step1">
      
  
        <TabsContent value="step1" className='flex flex-col  gap-10 justify-center align-middle items-center'>

        <w3m-button />

        <div>
        <TabsList className='p-0 bg-transparent'>

            <TabsTrigger value="step2" className='bg-white text-black rounded-md drop-shadow-md flex gap-1 font-semibold px-4 py-2'> 
            Next <ArrowRightIcon />
         
            </TabsTrigger>
  
        </TabsList>
          
          </div>
        </TabsContent>
  
        <TabsContent value="step2" className='flex flex-col  gap-10 justify-center align-middle items-center'>
        <w3m-network-button />
        <div>
        <TabsList className='p-0 bg-transparent flex gap-2'>

        <TabsTrigger value="step1" className='bg-white text-black rounded-md drop-shadow-md flex gap-1 font-semibold px-4 py-2' > 
        <ArrowLeftIcon /> Prev
        </TabsTrigger>

    <TabsTrigger value="step3" className='bg-white text-black rounded-md drop-shadow-md flex gap-1 font-semibold px-4 py-2'> Next<ArrowRightIcon /></TabsTrigger>
  
            </TabsList>
          
          </div>
        </TabsContent>

        <TabsContent value="step3" className='flex flex-col  gap-10 justify-center align-middle items-center'>
        <div className="flex items-center space-x-2">
        <Label htmlFor="airplane-mode">USDT</Label>
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">USDC</Label>
        </div>
        <div>
        <TabsList className='p-0 bg-transparent flex gap-2'>

        <TabsTrigger value="step2" className='bg-white text-black rounded-md drop-shadow-md flex gap-1 font-semibold px-4 py-2'>  <ArrowLeftIcon /> Prev</TabsTrigger>

    <TabsTrigger value="step4" className='bg-white text-black rounded-md drop-shadow-md flex gap-1 font-semibold px-4 py-2'> Next<ArrowRightIcon /></TabsTrigger>
  
            </TabsList>
          
          </div>
        </TabsContent>

        <TabsContent value="step4" className='flex flex-col w-full gap-4 justify-center align-middle items-center'>
            
            <div className='flex justify-center w-full pb-14'>
                
                <Tabs defaultValue="deposit" className="w-full">

                <div className='flex justify-center text-lg'>  
                
                <TabsList className='  '>
                    <TabsTrigger value="deposit" className='py-2 text-xs font-medium'>Deposit</TabsTrigger>
                    <TabsTrigger value="withdraw" className='py-2 text-xs font-medium'>Withdraw</TabsTrigger>
                </TabsList>
            
                </div>

            <div className='flex justify-center w-full'>
            
            <TabsContent value="deposit" className='w-full'>
            <Deposit />
            </TabsContent>
            <TabsContent value="withdraw" className='w-full'><Withdraw /></TabsContent></div>
            
            </Tabs>
            </div>
            <div className='flex justify-center w-full pb-16'>
 
  <DepositCard isDeposit={true} isUsdc={true} />
</div>
        <div>
        <TabsList className='p-0 bg-transparent flex gap-2'>

        <TabsTrigger value="step3" className='bg-white text-black rounded-md drop-shadow-md flex gap-1 font-semibold px-4 py-2'> <ArrowLeftIcon /> Prev</TabsTrigger>

            </TabsList>
          
          </div>
        </TabsContent>
        </Tabs>
        
   
   
    </main>
  )
}

export default Home
