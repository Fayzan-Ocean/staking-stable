'use client'
import Link from 'next/link';
import { useAccount, useDisconnect } from 'wagmi';
import { Button } from './ui/button';

import { ExitIcon } from '@radix-ui/react-icons';

import LogoWhite from "../public/logo-white.png"
import Image from 'next/image';
import { useWeb3Modal } from '@web3modal/wagmi/react'

const Navbar = () => {
  
  const { address, isConnecting, isDisconnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { open, close } = useWeb3Modal()

  const owner = "0x7496E853013eE234301C80848C2e4945f2a52980"


    return ( <>
 


<div className="flex md:flex-row bg-black border-opacity-10 border-[1px] border-t-0 border-l-0 border-r-0 border-white solid items-center text-sm">
  <div className='md:flex justify-start px-4 md:px-20 py-4 border-opacity-10 border-r-[1px] border-white solid'>
    <div className='border-1 border-white solid'>
    <Link href='/'>
           <Image src={LogoWhite} alt="Your Image Alt Text" width={200} height={100} />
          </Link>
     
    </div>
    
    {/* Your Drawer Component */}
  </div>

  <div className='flex justify-between md:flex-row w-full'>
  <div className='flex justify-start md:justify-center px-4 md:px-20 items-center'>
      <ul className='flex gap-4 text-sm font-medium'>
        <li>
          <Link href='/deposit'>
          DEPOSIT
          </Link>
        </li>
        <li>
          <Link href='/withdraw'>
            WITHDRAW
          </Link>
        </li>
      </ul>
    </div>
    
    <div className="flex justify-end md:pr-20 py-4">
      {!isDisconnected  ? 
        <div className='flex gap-1 '>
          <w3m-network-button />
          <Button type="button" className='rounded-full hover:bg-gray-700 hover:text-gray-200 drop-shadow-lg' onClick={() => disconnect()}>
            <ExitIcon />
          </Button>
        </div>
      : <>   
      <Button className="flex bg-black text-white border-[1px]  hover:bg-slate-700 hover:text-white hover:transition-width hover:shadow-lg rounded-full text-sm py-2" 
      onClick={()=>{
        open()}} >
         CONNECT WALLET
      </Button></>}
    </div>
  </div>
</div>
   


    
    </> );
}
 
export default Navbar;