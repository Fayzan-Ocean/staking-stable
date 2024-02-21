"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { ChevronUpIcon,ChevronDownIcon, RefreshCwIcon } from "lucide-react"
  import {  ReloadIcon } from "@radix-ui/react-icons"
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




const DepositUsdt = () => {

  const [hasMounted, setHasMounted] = useState(false);
  const [usdt, setUsdt] = useState(100.0);
  const [isDepositingUsdtError, setisDepositingUsdtError] = useState(false);
  const [adder, setAdder] = useState(100.0);

  const { address, isConnecting, isDisconnected, isConnected } = useAccount()
  const { open, close } = useWeb3Modal()
  const { chain, chains } = useNetwork()

    const balanceUSDT = useBalance({
        address: address,
        token: networkData.find((i)=>{return i.chainId == chain?.id})?.usdtAddress as `0x${string}`,
      
        staleTime: 2000,
        onSettled(data:any, error:any) {
          console.log('Balance', { data, error })
        },
        
        })

    const { data:allowanceData, isError:allowanceError, isLoading:allowanceLoading } = useContractRead({
        address: networkData.find((i)=>{return i.chainId == chain?.id})?.usdtAddress as `0x${string}`,
        abi: [{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}],
       functionName:"allowance",
     
        args: [
            address,// convert to wei,
            networkData.find((i)=>{return i.chainId == chain?.id})?.dappContract as `0x${string}`
        ],
        chainId: chain?.id, 
        watch:true,
      
       
    })

    const { config: configUsdtApprove } = usePrepareContractWrite({
            address: networkData.find((i)=>{return i.chainId == chain?.id})?.usdtAddress as `0x${string}`,
            abi: [{
                "constant": false,
                "inputs": [
                    {"name":"spender","type":"address"},
                    {"name":"value","type":"uint256"}
                ],
                "name":"approve",
                "outputs": [{"name":"success","type":"bool"}],
                "stateMutability": "nonpayable",
                "type": "function"
            }],
            functionName: "approve",
            args: [
              networkData.find((i)=>{return i.chainId == chain?.id})?.dappContract as `0x${string}`,
                parseUnits(String(usdt) || "0",6) // convert to wei
            ],
            chainId: chain?.id, 
          
           
        })

    const { config: configUsdt } = usePrepareContractWrite({
            address: networkData.find((i)=>{return i.chainId == chain?.id})?.dappContract as `0x${string}`,
            abi: [{"inputs":[{"internalType":"uint256","name":"_usdAmount","type":"uint256"},{"internalType":"bool","name":"isUsdc","type":"bool"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"}],
            functionName: "deposit",
            args: [
                parseUnits(String(usdt) || "0",6), // convert to wei
                false
            ],
            chainId: chain?.id, 
            staleTime: 2000,
           
        })
    
    const {
            data:dataUsdt,
            isError:isErrorUsdt,
            isLoading:isLoadingUsdt,
            isSuccess:isSuccessUsdt,
            write:writeUsdt,
            
          } = useContractWrite(configUsdt)

    const {
            data:dataUsdtApprove,
            isError:isErrorUsdtApprove,
            isLoading:isLoadingUsdtApprove,
            isSuccess:isSuccessUsdtApprove,
            write:writeUsdtApprove,
            
          } = useContractWrite(configUsdtApprove)

    const { isLoading:isLoadingTransaction, isSuccess:isSuccessTransaction } = useWaitForTransaction({
            hash: dataUsdt?.hash ,
          })

    const { isLoading:isLoadingTransactionApprove, isSuccess:isSuccessTransactionApprove } = useWaitForTransaction({
            hash: dataUsdtApprove?.hash ,
          })



    const addTransactionData = async ()=>{
            try {
              const depositData =  {
                address: address,
                  type: 'deposit',
                  amount: String(usdt ),
                  token: String('usdt'),
                  network: chain?.id || 0,
                  status: isSuccessTransaction ? 'success' : 'pending',
                  trxHash: String(dataUsdt?.hash)
                }
                try {
                  const response = await fetch('/api/deposit', {
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
          toast.error("Deposit Unsuccessfull!", {      
            action: {
              label: "ok",
              onClick: () => console.log("ok"),
            },
          })
          }, [isErrorUsdt])

    useEffect(() => {
            if(isSuccessTransaction && !isLoadingUsdt ){
                addTransactionData()
                toast.success("Deposit Successfull!", {
                 
                  action: {
                    label: "ok",
                    onClick: () => console.log("ok"),
                    
                  },
                
                })
            }
            
            }, [isSuccessTransaction])

            useEffect(() => {
              if(address && usdt > Number(balanceUSDT?.data?.formatted)){
                toast.warning("Amount you entered is more than your balance!", {
                  className: cn(
                    'absolute '
                  ), 
                  action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                  },
                })
              }
                      }, [usdt])

          
          
 // Render
 if (!hasMounted) return null;

    return ( <>
    
    <Card className="relative bg-transparent text-black w-full">
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
      <CardContent className="flex flex-col justify-between text-sm text-black font-medium  w-full sm:p-0 md:p-6 lg:p-8">
        <div className="flex justify-between">
            <p className="flex justify-start text-sm pl-2 pb-2">Amount</p>
            <p className="flex justify-start text-sm text-black font-medium pl-2 pb-2"> <span className="flex gap-1 mr-2">
              
              {balanceUSDT?.data?.formatted ? balanceUSDT?.data?.formatted : "0"} {balanceUSDT?.data?.symbol ? balanceUSDT?.data?.symbol : "USDT"} </span> <span className="text-slate-500">available</span> </p>
        </div>
      
        
      <div className="flex justify-center w-full max-w-full gap-1 items-center border-[1.5px] py-1 text-black border-x-0">
        
          <Input type="number" placeholder="100" step="100" value={usdt} min={100}   onChange={(e)=>{
            if(Number(e.target.value) > Number(balanceUSDT?.data?.formatted)){
              toast.warning("Amount you entered is more than your balance.", {
                className: cn(
                  'absolute '
                ), 
                action: {
                  label: "Undo",
                  onClick: () => console.log("Undo"),
                },
              })
            }
            
            setUsdt(Number(e.target.value))
            }} className=" w-[90%] border-0 shadow-none hover:shadow-none hover:border-0 focus:shadow-none focus-within:border-0 focus-visible:ring-0 text-black text-4xl appearance-none pointer-events-none"/>

            <div className="flex gap-1">
            <div className="rounded-full px-1 border-2 hover:bg-black hover:text-white hover:cursor-pointer z-50" onClick={()=>{
              setUsdt(usdt+100)
              }}> <ChevronUpIcon  width={18}/></div> 
            <div className="rounded-full px-1 border-2 hover:bg-black hover:text-white hover:cursor-pointer "
            onClick={()=>{
              usdt-100 >= 100 ? setUsdt(usdt-100) : null
              }}
              > <ChevronDownIcon width={18} /></div></div>
            
      {address? <> <Button type="submit" className="flex bg-black hover:bg-slate-900 hover:text-white text-white rounded-full" 
          onClick={()=>setUsdt(nearestMultipleOf100(Number(balanceUSDT?.data?.formatted)))} disabled={Number(balanceUSDT?.data?.formatted)<0} >Max</Button> </> : <></>}
         
        </div>
        <div className="flex gap-4 py-2 justify-center flex-wrap">
              <Button variant={'outline'} className="rounded-full bg-white"
              onClick={()=>setUsdt(Number(usdt)+100)} >+100</Button>
              <Button variant={'outline'} className="rounded-full bg-white"
              onClick={()=>setUsdt(Number(usdt)+200)}>+200</Button>
              <Button variant={'outline'} className="rounded-full bg-white"
              onClick={()=>setUsdt(Number(usdt)+500)}>+500</Button>
              <Button variant={'outline'} className="rounded-full bg-white"
              onClick={()=>setUsdt(Number(usdt)+1000)}>+1000</Button>
              <Button variant={'outline'} className="rounded-full bg-white"
              onClick={()=>setUsdt(Number(usdt)+5000)}>+5000</Button>
              <Button variant={'outline'} className="rounded-full bg-white"
              onClick={()=>setUsdt(100)}><RefreshCwIcon /></Button>
            </div>
 
      </CardContent>
      <CardFooter>
      {isConnected  ? 
        <> 
        {allowanceData && Number(allowanceData) >= Number(parseUnits(String(usdt),6)) ? <>

              {isLoadingUsdt || isLoadingTransaction ? <>
          <Button disabled className="flex w-full bg-black text-white hover:bg-slate-900 rounded-full">
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
        </> : <>
        <Button className="flex w-full bg-black text-white hover:bg-slate-900 rounded-full" disabled={Number(balanceUSDT?.data?.formatted)<0} onClick={()=>{ writeUsdt?.()

        //setisDepositingUsdc(true)
        }} >
          <RocketIcon className="mr-2 h-4 w-4 " /> {Number(balanceUSDT?.data?.formatted)<=0 ? ":( You're out of USDT" : "Deposit"} 
          </Button>
          </>}    

      
        
       {/*  <Dialog>
        <DialogTrigger className="flex w-full" disabled={ Number(balanceUSDC?.data?.formatted)<0}>
          
    
          
        
        </DialogTrigger>
        <DialogContent >
            <DialogHeader className="flex justify-center align-middle">
           
            <div className="flex flex-col justify-center align-middle pt-4 items-center">
            {isLoadingUsdc || isLoadingTransaction && !isErrorUsdc ?  
            <> 
             <DialogTitle className="flex  justify-center align-middle items-center py-8">Waiting for Approval</DialogTitle>
            <ReloadIcon className="mr-2 h-12 w-12 animate-spin mb-8" />
            </> : 
            <> {isSuccessTransaction ? <div className="flex flex-col justify-center align-middle py-10 items-center gap-2">
              
              <CheckCircledIcon className="mr-2 h-24 w-24 animate"/>
              Deposit Successful</div> : <>
             
              
              </>}
            
            </> }
           
          
            </div>
            </DialogHeader>


        </DialogContent>
        
          
        </Dialog> */}
        
        </> : <>


        {isLoadingUsdtApprove || isLoadingTransactionApprove ? 
          <>
          <Button disabled className="flex w-full bg-black text-white hover:bg-slate-900 rounded-full">
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
        </> : 
        <>
        <Button className="flex w-full bg-black text-white hover:bg-slate-900 rounded-full" disabled={!writeUsdtApprove || Number(balanceUSDT?.data?.formatted)<0} onClick={()=>{ writeUsdtApprove?.()

        //setisDepositingUsdc(true)
        }} >
          <RocketIcon className="mr-2 h-4 w-4" /> {Number(balanceUSDT?.data?.formatted)<0 ? ":( You're out of USDT" : "Approve USDT"} 
          </Button>
          </>}
    {/*     <Dialog>
        <DialogTrigger className="flex w-full" disabled={ Number(balanceUSDC?.data?.formatted)<0}>
          
      
          
        
        </DialogTrigger>
        <DialogContent >
            <DialogHeader className="flex justify-center align-middle">
           
            <div className="flex flex-col justify-center align-middle pt-4 items-center">
            {isLoadingUsdcApprove || isLoadingTransactionApprove && !isErrorUsdcApprove ?  
            <> 
             <DialogTitle className="flex  justify-center align-middle items-center py-8">Waiting for Approval</DialogTitle>
            <ReloadIcon className="mr-2 h-12 w-12 animate-spin mb-8" />
            </> : 
            <> {isSuccessTransactionApprove ? <div className="flex flex-col justify-center align-middle py-10 items-center gap-2">
              
              <CheckCircledIcon className="mr-2 h-24 w-24 animate"/>
              Approval Successful</div> : <>
             
              
              </>}
            
            </> }
           
          
            </div>
            </DialogHeader>


        </DialogContent>
        
          
        </Dialog> */}

        </> }


        
        
        </>
        
        : <> 
        <Button className="flex w-full  hover:text-white hover:transition-width  transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg bg-black text-white hover:bg-slate-900 rounded-full" onClick={()=>{
          open()}} >
          <LockClosedIcon className="mr-2 h-4 w-4"/> Connect Wallet
        </Button>
        
        </>}

    


      </CardFooter>
    </Card>

    </> );
}
 
export default DepositUsdt;

function nearestMultipleOf100(numb:any) {
    return Math.round(numb / 100) * 100;
  }