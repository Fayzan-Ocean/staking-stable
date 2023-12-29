import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Deposit from '@/components/DepositTab'
import Withdraw from '@/components/WithdrawTab'
import DepositCard from '@/components/DepositCard'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

  <div className='flex justify-center w-full'>
    
    <Tabs defaultValue="deposit" className="w-full">

    <div className='flex justify-center text-lg'>  
    
      <TabsList className='  '>
        <TabsTrigger value="deposit" className='py-2 text-xs font-medium'>Deposit</TabsTrigger>
        <TabsTrigger value="withdraw" className='py-2 text-xs font-medium'>Withdraw</TabsTrigger>
      </TabsList>
  
    </div>

<div className='flex justify-center'>
  
  <TabsContent value="deposit" className='w-full'>
  <Deposit />
</TabsContent>
  <TabsContent value="withdraw" className='w-full'><Withdraw /></TabsContent></div>
  
</Tabs></div>

<div className='flex justify-center w-full'>
  <DepositCard />
</div>
   
   
    </main>
  )
}
