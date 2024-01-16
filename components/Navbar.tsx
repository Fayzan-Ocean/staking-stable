'use client'
import Link from 'next/link';
import { useAccount, useDisconnect } from 'wagmi';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ExitIcon } from '@radix-ui/react-icons';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import TransactionTable from './TransactionsTable';

const Navbar = () => {
  
  const { address, isConnecting, isDisconnected } = useAccount()
  const { disconnect } = useDisconnect()
  

  const owner = "0x7496E853013eE234301C80848C2e4945f2a52980"


    return ( <>
    <div className=" flex pt-4 justify-between px-4 ">
     
      <div className='flex justify-start py-4'>
        {!isDisconnected ? <> <Drawer>
      <DrawerTrigger className='bg-white text-black rounded-md drop-shadow-md flex gap-1 font-semibold px-4 py-2'>My Transactions</DrawerTrigger>
      <DrawerContent className="flex px-10">

        <TransactionTable  />
        
        
        <DrawerFooter>
    
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
      </Drawer>
   </> : <></> }
        
     
      </div>
        


    
    <div className=" flex justify-end h-14 pt-4 px-4"> 
        {!isDisconnected ? <>
        
        <div className='flex gap-1'>
          <w3m-network-button />

          <Button type="button" className='rounded-full hover:bg-gray-700 hover:text-gray-200 drop-shadow-lg' onClick={()=>{
            disconnect()

          }} ><ExitIcon />
           </Button>
      

        </div>
      
        
        </> : <></>}

      
    </div>
    
    </div>
   


    
    </> );
}
 
export default Navbar;