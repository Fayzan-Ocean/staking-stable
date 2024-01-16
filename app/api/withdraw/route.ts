
import { NextResponse } from "next/server";
import  prisma  from '../../../lib/prisma';

export async function POST(req: Request) {
  const { depositData } = await req.json();

  console.log("---------------------------------------------------------------")
  console.log("-------------------Transaction req Recieved--------------------")
  console.log("---------------------------------------------------------------")

  console.log(depositData)

  console.log("---------------------------------------------------------------")
  try {
    
     let user = await prisma.user.findUnique({
      where: { ethAddress: depositData?.address },
    });

    console.log(user)

    console.log("---------------------------------------------------------------")

    if (!user) {
       user = await prisma.user.create({
        data: {
          ethAddress:  depositData?.address,
        },
      });
    }

    const transaction = await prisma.transaction.create({
      data: {
        type: 'withdraw',
        amount: String( depositData?.amount),
        token: String( depositData?.token),
        network:  depositData?.network || 0,
        status:  depositData?.status,
        trxHash:  depositData?.trxHash,
        depositBy: {
          connect: { id: user.id },
        },
      },
    });

    console.log('Transaction Added:', transaction);
    return NextResponse.json({ message: "Transaction Added" }, { status: 200 });
  } catch (error) {
    console.error('Error creating transaction:', error);
    return NextResponse.json({ message: "Transaction not Added" }, { status: 500 });
  } 
  
  

 
}

