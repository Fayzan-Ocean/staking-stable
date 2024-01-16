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




const WithdrawUsdt = () => {

  const [hasMounted, setHasMounted] = useState(false);
  const [usdc, setUsdc] = useState(0.0);
  const [usdt, setUsdt] = useState(0.0);
  const [isDepositingUsdcError, setisDepositingUsdcError] = useState(false);
  const [isDepositingUsdtError, setisDepositingUsdtError] = useState(false);

  const { address, isConnecting, isDisconnected, isConnected } = useAccount()
  const { open, close } = useWeb3Modal()
  const { chain, chains } = useNetwork()

    const balanceUSDT = useBalance({
        address: address,
        token: networkData.find((i)=>{return i.chainId == chain?.id})?.dappContract as `0x${string}`,
      
        staleTime: 2000,
        onSettled(data:any, error:any) {
          console.log('Balance', { data, error })
        },
        
        })



    const { config: configUsdt } = usePrepareContractWrite({
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
            data:dataUsdt,
            isError:isErrorUsdt,
            isLoading:isLoadingUsdt,
            isSuccess:isSuccessUsdt,
            write:writeUsdc,
            
          } = useContractWrite(configUsdt)

 

    const { isLoading:isLoadingTransaction, isSuccess:isSuccessTransaction } = useWaitForTransaction({
            hash: dataUsdt?.hash ,
          })




    const addTransactionData = async ()=>{
            try {
              const depositData =  {
                address: address,
                  type: 'withdraw',
                  amount: String(usdt ),
                  token: String('usdt'),
                  network: chain?.id || 0,
                  status: isSuccessTransaction ? 'success' : 'pending',
                  trxHash: String(dataUsdt?.hash)
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
          if(isErrorUsdt && !isLoadingUsdt )
          toast.error("Withdraw Unsuccessfull :(", {
              
            action: {
              label: "ok",
              onClick: () => console.log("ok"),
              
            },
          
          })
          }, [isErrorUsdt])



    useEffect(() => {
            if(isSuccessTransaction && !isLoadingUsdt ){
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
    
    <Card className="relative overflow-hidden w-[33%]">
      <CardHeader className="">
      <div className="absolute top-4 -left-3 rounded-full overflow-hidden">
      <svg
        width={25}
        height={25}
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#26A17B]/10 text-6xl opacity-30"
        style={{
          display: "inline-block",
          width: "1em",
          height: "1em",
          lineHeight: "1em",
          flexShrink: 0,
          verticalAlign: "middle"
        }}
      >
        <ellipse
          cx="12.1319"
          cy="12.129"
          rx={12}
          ry={12}
          transform="rotate(-0.633527 12.1319 12.129)"
          fill="currentColor"
        />
        <g clipPath="url(#clip0_523_4969)">
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            fill="#26A17B"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.2013 12.8646V12.8633C13.1325 12.8683 12.7781 12.8896 11.9875 12.8896C11.3562 12.8896 10.9119 12.8708 10.7556 12.8633V12.8652C8.32562 12.7583 6.51187 12.3352 6.51187 11.829C6.51187 11.3233 8.32562 10.9002 10.7556 10.7915V12.444C10.9144 12.4552 11.3694 12.4821 11.9981 12.4821C12.7525 12.4821 13.1306 12.4508 13.2013 12.4446V10.7927C15.6263 10.9008 17.4356 11.324 17.4356 11.829C17.4356 12.3352 15.6263 12.7571 13.2013 12.8646V12.8646ZM13.2013 10.6208V9.14209H16.585V6.88708H7.37188V9.14209H10.7556V10.6202C8.00562 10.7465 5.9375 11.2915 5.9375 11.944C5.9375 12.5965 8.00562 13.1408 10.7556 13.2677V18.0065H13.2013V13.2665C15.9469 13.1402 18.01 12.5958 18.01 11.944C18.01 11.2921 15.9469 10.7477 13.2013 10.6208"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_523_4969">
            <rect width={20} height={20} fill="white" transform="translate(2 2)" />
          </clipPath>
        </defs>
      </svg>
    </div>

        <CardTitle>USDT</CardTitle>
      
      </CardHeader>
      <CardContent className="flex flex-col justify-between  w-full">
        <div className="flex justify-between">
            <p className="flex justify-start text-xs pl-2 pb-2">Amount</p>
            <p className="flex justify-start text-xs pl-2 pb-2"> 
            <span className="flex gap-1 mr-2">
              
              {balanceUSDT?.data?.formatted ? balanceUSDT?.data?.formatted : "0"} {balanceUSDT?.data?.symbol ? balanceUSDT?.data?.symbol : "DDI"} </span> 
              
              <span className="flex gap-1 mr-2">= {nearestMultipleOf100(Number(balanceUSDT?.data?.formatted))}$ </span>
              
              <span className="text-slate-500">available</span> </p>
        </div>
      
        
      <div className="flex justify-center w-full max-w-full gap-1 items-center ">
        
          <Input type="number" placeholder="0" step="10" value={usdc} min={0}  onChange={(e)=>{
            if(Number(e.target.value) > (Number(balanceUSDT?.data?.formatted)*10)){
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
            }} className=" w-[90%]"/>
          <Button type="submit" className="flex hover:bg-slate-700 hover:text-white" 
          onClick={()=>setUsdc(nearestMultipleOf100(Number(balanceUSDT?.data?.formatted)))} disabled={Number(balanceUSDT?.data?.formatted)<0} >Max</Button>
        </div>
      </CardContent>
      <CardFooter>
      {isConnected  ? 
        <> 
          {isLoadingUsdt || isLoadingTransaction ? <>
          <Button disabled className="flex w-full">
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
        </> : <>
        <Button className="flex w-full" disabled={!writeUsdc || Number(balanceUSDT?.data?.formatted)<0} onClick={()=>{ writeUsdc?.()

        //setisDepositingUsdc(true)
        }} >
          <RocketIcon className="mr-2 h-4 w-4" /> {Number(balanceUSDT?.data?.formatted)<0 ? ":( You're out of DDI" : "Withdraw"} 
          </Button>
          </>}   


        
        
        </>
        
        : <> 
        <Button className="flex w-full hover:bg-slate-700 hover:text-white hover:transition-width  transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg" onClick={()=>{
          open()}} >
          <LockClosedIcon className="mr-2 h-4 w-4"/> Connect Wallet
        </Button>
        
        </>}

    


      </CardFooter>
    </Card>

    </> );
}
 
export default WithdrawUsdt;

function nearestMultipleOf100(numb:any) {
    return Math.round(numb *10 ) ;
  }