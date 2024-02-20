import { NextResponse } from "next/server";
import  prisma  from '../../../../lib/prisma';

import type { NextApiRequest, NextApiResponse } from 'next';
 
export async function POST(req: Request) {
    const { data } = await req.json()

    console.log("-------------------Transactions Fetched------------------------")
  

 
      try {

        console.log(data.length)
        
       // Find the user with the specified ethAddress
        for (const transaction of data) {
            const { ID, Status, 'Trx Hash': trxHash } = transaction;
      
            // Perform update operation for each transaction
            await prisma.transaction.update({
              where: { id: ID }, // Update based on the transaction ID
              data: {
                status: 'success', // Update the status field
                
              }
            });
          }
      
 
/*           const updateOperations = data.map(transaction => ({
            where: { id: transaction.ID },
            data: {
              status: transaction.Status
            }
          }));
      
          const updatedTransactions = await prisma.transaction.updateMany({
            data: updateOperations,
          });
 */
          
     return NextResponse.json({ message: "Transaction Status Updated", data }, { status: 200 });
   } catch (error) {
     console.error('Error creating transaction:', error);
     return NextResponse.json({ message: "Transaction not Updated" }, { status: 500 });
   } 

   
   
  }