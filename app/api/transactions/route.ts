import { NextResponse } from "next/server";
import  prisma  from '../../../lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const ethAddress = searchParams.get('ethAddress')

 
  console.log("-------------------Transactions Fetched------------------------")


  console.log(ethAddress)

  if (ethAddress) {
    try {

        // Find the user with the specified ethAddress
        const user = await prisma.user.findUnique({
          where: {
            ethAddress: ethAddress,
          },
          include: {
            transactions: true,
          },
        });
    
        if (!user) {
          console.log('User not found.');
          return NextResponse.json({ message: "Transactions fetched", sortedTxs:[] }, { status: 200 });
        }
    
        // Access the transactions associated with the user
        const transactions = user.transactions;

    

   //console.log(transactions)
  const sortedTxs = sortByDateDescending(transactions)
 // console.log(sortedTxs)
   console.log("---------------------------------------------------------------")


   return NextResponse.json({ message: "Transaction Added", sortedTxs }, { status: 200 });
 } catch (error) {
   console.error('Error creating transaction:', error);
   return NextResponse.json({ message: "Transaction not fetched" }, { status: 500 });
 } 
    
  }
  else{
    try {

      // Find the user with the specified ethAddress
      const transactions = await prisma.transaction.findMany();

  

 //console.log(transactions)
const sortedTxs = sortByDateDescending(transactions)
// console.log(sortedTxs)
 console.log("---------------------------------------------------------------")


 return NextResponse.json({ message: "Transaction Added", sortedTxs }, { status: 200 });
} catch (error) {
 console.error('Error creating transaction:', error);
 return NextResponse.json({ message: "Transaction not fetched" }, { status: 500 });
} 
  }
  

 
 
}
function sortByDateDescending(array: any[]) {
  return array.sort((a: { createdAt: string | number | Date; }, b: { createdAt: string | number | Date; }) => new Date(b.createdAt) - new Date(a.createdAt));
}

