import { NextResponse } from "next/server";
import  prisma  from '../../../lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const ethAddress = searchParams.get('ethAddress')

  console.log("---------------------------------------------------------------")
  console.log("-------------------Transactions Fetched------------------------")
  console.log("---------------------------------------------------------------")

  if (!ethAddress ) {
    try {
    
     let transactions = await prisma.transaction.findMany();

   // console.log(transactions)

    console.log("---------------------------------------------------------------")


    return NextResponse.json({ message: "Transaction Added", transactions }, { status: 200 });
  } catch (error) {
    console.error('Error creating transaction:', error);
    return NextResponse.json({ message: "Transaction not Added" }, { status: 500 });
  } 
    
  }
  
  try {

    let user = await prisma.user.findUnique({
      where: {
        ethAddress:ethAddress
      }
    });
    
    let transactions = await prisma.transaction.findMany({
      where: {
        userId:user?.id
      }
    });

  // console.log(transactions)

   console.log("---------------------------------------------------------------")


   return NextResponse.json({ message: "Transaction Added", transactions }, { status: 200 });
 } catch (error) {
   console.error('Error creating transaction:', error);
   return NextResponse.json({ message: "Transaction not Added" }, { status: 500 });
 } 
  

 
}

