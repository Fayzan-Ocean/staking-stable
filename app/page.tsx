"use client"
import DepositCards from '@/components/Deposit/DepositCards'
import Image from 'next/image'
import React from 'react'
import HeroBg from '../public/hero.png'
import DepositCardUsdc from '@/components/DepositCardUsdc'
import DepositUsdc from '@/components/Deposit/DepositUsdc'
import DepositUsdt from '@/components/Deposit/DepositUsdt'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs'
import TransactionTable from '@/components/TransactionsTable'
import { Button } from '@/components/ui/button'
import { Drawer,DrawerTrigger, DrawerContent, DrawerFooter, DrawerClose } from '@/components/ui/drawer'

export default function Home() {


  return (
    <main className="flex  flex-col items-center ">


    <DepositCards />
   
      
    <div className="flex flex-col sm:flex-row w-full sm:p-24 p-4  bg-[#EFEFEF]">

        {/* Left Side (Image) */}
        <div className="sm:w-full md:w-1/3 p-8">
        <div
            style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            borderBottomRightRadius: '350px',
            borderBottomLeftRadius: '16px',
            overflow: 'hidden',
            }}
        >
            <Image
            src={HeroBg}
            alt="Hero Image"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            />
        </div>
        </div>

        {/* Right Side (Card) */}
        <div className="sm:w-full md:w-2/3 p-8">
        <Tabs defaultValue="usdc" className="w-full border rounded-2xl p-8">

            <div className='flex justify-start text-lg sm:px-10'>
            <TabsList className='flex justify-start gap-2  sm:px-6'>
                        <TabsTrigger value="usdc" className='text-xs font-medium gap-1 text-black border rounded-lg p-2'
    
                        >
                        <svg
                        style={{
                        display: "inline-block",
                        width: "0.4em",
                        height: "0.4em",
                        lineHeight: "1em",
                        WebkitFlexShrink: 0,
                        flexShrink: 0,
                        verticalAlign: "middle"
                        }}
                        width={20}
                        height={20}
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-[#2775CA]/10 text-6xl "
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
                        USDC</TabsTrigger>

                        <TabsTrigger value="usdt" className=' text-xs font-medium gap-1 border rounded-lg p-2 text-black pl-2'>
                        <svg
                        width={20}
                        height={20}
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-[#26A17B]/10 text-6xl "
                        style={{
                        display: "inline-block",
                        width: "0.4em",
                        height: "0.4em",
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
                        USDT</TabsTrigger>
                    </TabsList>
            </div>

            <div className='flex justify-center'>
            <TabsContent value="usdc" className='w-full'>
                <div className='flex justify-center w-full px-6 sm:px-10'>
                {/* Content for USDC */}
                <DepositUsdc />
                </div>
            </TabsContent>

            <TabsContent value="usdt" className='w-full'>
                <div className='flex justify-center w-full px-6 sm:px-10'>
                {/* Content for USDT */}
                <DepositUsdt />
                </div>
            </TabsContent>
            </div>

        </Tabs>
        </div>

    </div>


    <div className='flex w-full sm:p-32 sm:pt-0 p-4  bg-[#EFEFEF] '>
          <TransactionTable />
    </div>



   
   
    </main>
  )
}
