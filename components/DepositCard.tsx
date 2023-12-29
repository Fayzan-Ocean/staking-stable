import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { ReloadIcon } from "@radix-ui/react-icons"
  import { RocketIcon } from "@radix-ui/react-icons"

  import { Button } from "@/components/ui/button"



const DepositCard = () => {
    return ( <>
<div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-4 justify-between relative bg-background overflow-hidden">
<Card className="">
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
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
  <Button className="flex w-full">
      <RocketIcon className="mr-2 h-4 w-4" /> Deposit
    </Button>
  </CardFooter>
</Card>

<Card>
  <CardHeader>
    <CardTitle>USDT</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
  <Button className="flex w-full">
      <RocketIcon className="mr-2 h-4 w-4" /> Deposit
    </Button>
  </CardFooter>
</Card>

<Card>
  <CardHeader>
    <CardTitle>USDT</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
  <Button className="flex w-full">
      <RocketIcon className="mr-2 h-4 w-4" /> Deposit
    </Button>
  </CardFooter>
</Card>

</div>


    </> );
}
 
export default DepositCard;