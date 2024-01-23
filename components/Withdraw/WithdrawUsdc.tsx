"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { ReloadIcon } from "@radix-ui/react-icons"
  import { RocketIcon,LockClosedIcon, CheckIcon, CheckCircledIcon } from "@radix-ui/react-icons"
  import { Input } from "@/components/ui/input"
  import { Button } from "@/components/ui/button"
  import { useAccount, useConnect, useContractWrite, useDisconnect, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
  import { useWeb3Modal } from '@web3modal/wagmi/react'
  import { useBalance } from 'wagmi'
  import { useState, useEffect } from "react"
  import {
    Dialog,
    DialogClose,
    DialogFooter,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { useSendTransaction, usePrepareSendTransaction,useContractRead  } from 'wagmi'
import { parseEther, parseUnits } from "viem"
import { useNetwork } from 'wagmi'
import { networkData } from "@/lib/chainData"
import { toast } from "sonner"
import { useDebounce } from 'usehooks-ts'
import { cn } from "@/lib/utils"
import Withdraw from "../WithdrawTab"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"




const WithdrawUsdc = () => {

  const [hasMounted, setHasMounted] = useState(false);
  const [usdc, setUsdc] = useState(0.0);
  const [usdt, setUsdt] = useState(0.0);
  const [isDepositingUsdcError, setisDepositingUsdcError] = useState(false);
  const [isDepositingUsdt, setisDepositingUsdtError] = useState(false);

  const { address, isConnecting, isDisconnected, isConnected } = useAccount()
  const { open, close } = useWeb3Modal()
  const { chain, chains } = useNetwork()

    const balanceUSDC = useBalance({
        address: address,
        token: networkData.find((i)=>{return i.chainId == chain?.id})?.dappContract as `0x${string}`,
      
        staleTime: 2000,
        onSettled(data:any, error:any) {
          console.log('Balance', { data, error })
        },
        
        })



    const { config: configUsdc } = usePrepareContractWrite({
            address: networkData.find((i)=>{return i.chainId == chain?.id})?.dappContract as `0x${string}`,
            abi: [{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}],
            functionName: "withdraw",
            args: [
                parseUnits(String(Number(usdc)/10) || "0",18), // convert to wei 
            ],
            chainId: chain?.id, 
            staleTime: 2000,
           
        })
    
    const {
            data:dataUsdc,
            isError:isErrorUsdc,
            isLoading:isLoadingUsdc,
            isSuccess:isSuccessUsdc,
            write:writeUsdc,
            
          } = useContractWrite(configUsdc)

 

    const { isLoading:isLoadingTransaction, isSuccess:isSuccessTransaction } = useWaitForTransaction({
            hash: dataUsdc?.hash ,
          })




    const addTransactionData = async ()=>{
            try {
              const depositData =  {
                address: address,
                  type: 'withdraw',
                  amount: String(usdc ),
                  token: String('usdc'),
                  network: chain?.id || 0,
                  status: isSuccessTransaction ? 'success' : 'pending',
                  trxHash: String(dataUsdc?.hash)
                }
                try {
                  const response = await fetch('/api/withdraw', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ depositData }),
                  });
              
                  if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                  }
              
                  const data = await response.json();
                  console.log(data.message); // Transaction Added
                } catch (error) {
                  console.error('Error adding transaction:', error);
                }
        
          
              console.log('Transaction Data sent:', depositData);
            } catch (error) {
              console.error('Error creating transaction:', error);
            } 
            
          }  


     // Hooks
/*      useEffect(() => {
        console.log(allowanceData)
        }, [allowanceData]) */

        useEffect(() => {
            setHasMounted(true);
            }, [])

    useEffect(() => {
          if(isErrorUsdc && !isLoadingUsdc )
          toast.error("Withdraw Unsuccessfull :(", {
              
            action: {
              label: "ok",
              onClick: () => console.log("ok"),
              
            },
          
          })
          }, [isErrorUsdc])



    useEffect(() => {
            if(isSuccessTransaction && !isLoadingUsdc ){
                addTransactionData()
                toast.success("Withdraw Successfull :>", {
                 
                  action: {
                    label: "ok",
                    onClick: () => console.log("ok"),
                    
                  },
                
                })
            }
            
            }, [isSuccessTransaction])

          
          
 // Render
 if (!hasMounted) return null;

    return ( <>
    
    <Card className="relative bg-transparent text-black w-full">
      <CardHeader className="">
      <div className="absolute top-4 -left-3 rounded-full overflow-hidden">
      <svg
        style={{
          display: "inline-block",
          width: "1em",
          height: "1em",
          lineHeight: "1em",
          WebkitFlexShrink: 0,
          flexShrink: 0,
          verticalAlign: "middle"
        }}
        width={40}
        height={40}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#2775CA]/10 text-6xl opacity-30"
      >
        <g clipPath="url(#clip0_339_136)">
          <rect width={40} height={40} rx={20} fill="currentColor" />
          <path
            d="M20 37.5367C29.7183 37.5367 37.5367 29.7183 37.5367 20C37.5367 10.2817 29.7183 2.46338 20 2.46338C10.2817 2.46338 2.46338 10.2817 2.46338 20C2.46338 29.7183 10.2817 37.5367 20 37.5367Z"
            fill="#2775CA"
          />
          <path
            d="M24.868 22.7679C24.868 20.2126 23.3238 19.3365 20.2354 18.9715C18.0294 18.6794 17.5882 18.0954 17.5882 17.0731C17.5882 16.0509 18.3236 15.394 19.7942 15.394C21.1178 15.394 21.8532 15.832 22.2208 16.9272C22.2944 17.1462 22.515 17.2922 22.7356 17.2922H23.912C24.2062 17.2922 24.4268 17.0731 24.4268 16.7812V16.7082C24.1326 15.1019 22.809 13.8608 21.1178 13.7148V11.9626C21.1178 11.6705 20.8972 11.4515 20.5296 11.3784H19.4266C19.1324 11.3784 18.9118 11.5974 18.8383 11.9626V13.6418C16.6323 13.9339 15.2352 15.394 15.2352 17.2193C15.2352 19.6286 16.7059 20.5776 19.7942 20.9428C21.8532 21.3077 22.515 21.7458 22.515 22.914C22.515 24.0822 21.4854 24.8853 20.0884 24.8853C18.1765 24.8853 17.5147 24.082 17.2941 22.9869C17.2206 22.695 17 22.5488 16.7794 22.5488H15.5293C15.2352 22.5488 15.0146 22.7679 15.0146 23.06V23.133C15.3087 24.9582 16.4853 26.2723 18.9118 26.6375V28.3897C18.9118 28.6816 19.1324 28.9007 19.5 28.9737H20.603C20.8972 28.9737 21.1178 28.7547 21.1914 28.3897V26.6375C23.3974 26.2723 24.868 24.7391 24.868 22.7679Z"
            fill="white"
          />
          <path
            d="M16.2711 30.4391C10.5681 28.3983 7.64338 22.0568 9.76384 16.4441C10.8606 13.3827 13.2734 11.0503 16.2711 9.95694C16.5636 9.81122 16.7098 9.59255 16.7098 9.22798V8.20758C16.7098 7.91596 16.5636 7.69729 16.2711 7.62451C16.1979 7.62451 16.0517 7.62451 15.9785 7.69728C9.03263 9.884 5.23057 17.246 7.42403 24.1706C8.74011 28.2524 11.8841 31.3867 15.9785 32.6987C16.2711 32.8445 16.5636 32.6987 16.6366 32.4071C16.7098 32.3343 16.7098 32.2614 16.7098 32.1157V31.0951C16.7098 30.8764 16.4904 30.585 16.2711 30.4391ZM24.0214 7.69728C23.7288 7.55156 23.4363 7.69729 23.3633 7.9889C23.2901 8.06185 23.2901 8.13463 23.2901 8.28052V9.30093C23.2901 9.59255 23.5095 9.884 23.7288 10.0299C29.4318 12.0707 32.3565 18.4122 30.2361 24.0248C29.1393 27.0862 26.7265 29.4187 23.7288 30.512C23.4363 30.6577 23.2901 30.8764 23.2901 31.241V32.2614C23.2901 32.553 23.4363 32.7717 23.7288 32.8445C23.802 32.8445 23.9482 32.8445 24.0214 32.7717C30.9673 30.585 34.7693 23.2229 32.5759 16.2984C31.2598 12.1437 28.0426 9.00931 24.0214 7.69728Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_339_136">
            <rect width={40} height={40} fill="currentColor" />
          </clipPath>
        </defs>
      </svg>
    </div>

        <CardTitle>USDC</CardTitle>
      
      </CardHeader>
      <CardContent className="flex flex-col justify-between  w-full">
        <div className="flex justify-between">
            <p className="flex justify-start text-sm pl-2 pb-2">Amount</p>
            <p className="flex justify-start text-sm text-black font-medium pl-2 pb-2"> 
            <span className="flex gap-1 mr-2">
              
              {balanceUSDC?.data?.formatted ? balanceUSDC?.data?.formatted : "0"} {balanceUSDC?.data?.symbol ? balanceUSDC?.data?.symbol : "DDI"} </span> 
              
              <span className="flex gap-1 mr-2">= {nearestMultipleOf100(Number(balanceUSDC?.data?.formatted))}$ </span>
              
              <span className="text-slate-500">available</span> </p>
        </div>
      
        
      <div className="flex justify-center w-full max-w-full gap-1 items-center border-[1.5px] py-1 text-black border-x-0">
        
          <Input type="number" placeholder="0" step="10" value={usdc} min={0}  onChange={(e)=>{
            if(Number(e.target.value) > (Number(balanceUSDC?.data?.formatted)*10)){
              toast.warning("Amount you entered is more than your balance :(", {
                className: cn(
                  'absolute '
                ), 
                action: {
                  label: "Undo",
                  onClick: () => console.log("Undo"),
                },
              })
            }
            
            setUsdc(Number(e.target.value))
            }} className=" w-[90%] border-0 shadow-none hover:shadow-none hover:border-0 focus:shadow-none focus-within:border-0 focus-visible:ring-0 text-black text-4xl appearance-none pointer-events-auto"/>

<div className="flex gap-1">
            <div className="rounded-full px-1 border-2 hover:bg-black hover:text-white hover:cursor-pointer" onClick={()=>{
              setUsdc(usdc+1)
              }}> <ChevronUpIcon  width={18}/></div> 
            <div className="rounded-full px-1 border-2 hover:bg-black hover:text-white hover:cursor-pointer "
            onClick={()=>{
              usdc-1 > 0 ? setUsdc(usdc-1) : null
              }}
              > <ChevronDownIcon width={18} /></div></div>
            
      {address? <> <Button type="submit" className="flex bg-black hover:bg-slate-900 hover:text-white text-white rounded-full" 
          onClick={()=>setUsdc(nearestMultipleOf100(Number(balanceUSDC?.data?.formatted)))} disabled={Number(balanceUSDC?.data?.formatted)<0} >Max</Button> </> : <></>}
    
        </div>
      </CardContent>
      <CardFooter>
      {isConnected  ? 
        <> 
          {isLoadingUsdc || isLoadingTransaction ? <>
          <Button disabled className="flex w-full bg-black text-white hover:bg-slate-900 rounded-full">
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
        </> : <>
        <Button className="flex w-full bg-black text-white hover:bg-slate-900 rounded-full" disabled={!writeUsdc || Number(balanceUSDC?.data?.formatted)<0} onClick={()=>{ writeUsdc?.()

        //setisDepositingUsdc(true)
        }} >
          <RocketIcon className="mr-2 h-4 w-4" /> {Number(balanceUSDC?.data?.formatted)<0 ? ":( You're out of DDI" : "Withdraw"} 
          </Button>
          </>}   


        
        
        </>
        
        : <> 
        <Button className="flex w-full bg-black text-white hover:bg-slate-900 rounded-full hover:transition-width  transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg" onClick={()=>{
          open()}} >
          <LockClosedIcon className="mr-2 h-4 w-4"/> Connect Wallet
        </Button>
        
        </>}

    


      </CardFooter>
    </Card>

    </> );
}
 
export default WithdrawUsdc;

function nearestMultipleOf100(numb:any) {
    return Math.round(numb *10 ) ;
  }