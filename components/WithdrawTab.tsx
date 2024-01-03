import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"



const Withdraw = () => {
    return (  <>
    



    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 md:gap-12 w-full pt-10 auto-cols-[minmax(0,_4fr)]">
    <Card
        className=" p-6 sm:p-7 text-left gap-2 w-full
    rounded-2xl bg-slate-700
    "
    >
        <p
        className="font-medium w-full whitespace-nowrap inline-flex"
        data-numeric="true"
        >
        $0.00 USD
        </p>
        <p className="text-xs">
        Account Balance
        </p>
    </Card>
    <Card
        className="
    p-6 sm:p-7 text-left gap-4 w-full
    brounded-2xl bg-slate-700
    "
    >
        <p
        className="font-medium w-full whitespace-nowrap inline-flex"
        data-numeric="true"
        >
        $0.00 USD
        </p>
        <p className="text-xs ">
        Total Withdrawn
        </p>
    </Card>
    <Card
        className="
    p-6 sm:p-7 text-left gap-4 w-full
    rounded-2xl bg-slate-700
    "
    >
        <p
        className="font-medium w-full whitespace-nowrap inline-flex"
        data-numeric="true"
        >
        $0.00 USD
        </p>
        <p className="text-xs">
        Pending Withdrawl
        </p>
    </Card>
    <Card
        className="
    p-6 sm:p-7 text-left gap-4 w-full
    rounded-2xl bg-slate-700
    "
    >
        <p
        className="font-medium w-full whitespace-nowrap inline-flex overflow-auto"
        data-numeric="true"
        >
        $0.00 USD
        </p>
        <p className="text-xs ">
        Total Fees
        </p>
    </Card>
    </div>

    
    

    </>);
}
 
export default Withdraw;