'use client'
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { Button } from './ui/button';



const Navbar = () => {
  
  const { address, isConnecting, isDisconnected } = useAccount()
  
  const owner = "0x7496E853013eE234301C80848C2e4945f2a52980"


    return ( <>
    <div className=" flex flex-wrap py-4 justify-between px-4 "> 

{!isDisconnected  ? 

<> 
{address == owner ? <><div className='container flex justify-start'>
      <Link href='/transactions'><Button className='' variant={"outline"}> Transactions</Button>
      </Link>
</div></> : <><div></div></>}

    
  </>
    
    : <><div></div></>}
   


    
    <div className=" flex justify-end h-14 py-4 px-4">
        


      <w3m-button />
    </div>
    
    </div>
   


    
    </> );
}
 
export default Navbar;