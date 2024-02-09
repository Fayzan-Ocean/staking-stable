import { NextResponse } from "next/server";
import  prisma  from '../../../lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const ethAddress = searchParams.get('ethAddress')

 
  console.log("-------------------User Fetched------------------------")


  console.log(ethAddress)

  if (ethAddress) {
    try {

        // Find the user with the specified ethAddress
        const user = await prisma.user.findUnique({
          where: {
            ethAddress: ethAddress,
          }
        });
    
        if (!user) {
          console.log('User not found.');
          return NextResponse.json({ message: "Transactions fetched", user }, { status: 200 });
        }

   console.log("---------------------------------------------------------------")
   return NextResponse.json({ message: "Transaction Added", user }, { status: 200 });
 } catch (error) {
   console.error('Error creating transaction:', error);
   return NextResponse.json({ message: "Transaction not fetched" }, { status: 500 });
 } 
    
  }
  else{

 return NextResponse.json({ message: "Transaction not fetched" }, { status: 500 });

  
  }
}