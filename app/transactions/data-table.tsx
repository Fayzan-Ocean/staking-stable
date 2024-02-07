"use client"

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Usdc from "@/components/icons/Usdc"
import Usdt from "@/components/icons/Usdt"
import { Button } from "@/components/ui/button"
import React from "react"
import { Link1Icon } from "@radix-ui/react-icons"
import MaticIcon from "../../node_modules/cryptocurrency-icons/32/color/matic.png"
import EthIcon from "../../node_modules/cryptocurrency-icons/32/color/eth.png"
import { useNetwork } from 'wagmi'
import Image from "next/image"
import { networkData } from "@/lib/chainData"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  address: any
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = React.useState<SortingState>([])
  const { chain, chains } = useNetwork()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })
  


  const getCellData = (cell)=>{

  

    if(cell.renderValue() == 'usdc' || cell.renderValue() == 'usdt'){
        return  cell.renderValue() == 'usdc'  ? <><Usdc /></> : <><Usdt /></>
    }
    if(cell.column.columnDef.accessorKey == 'trxHash'  ){
      console.log(cell.row.original.network)
        return <a href={networkData.find((i)=>{return i.chainId == cell.row.original.network})?.explorer + `tx/`+ cell.renderValue()}  target="_blank" className="flex gap-1 align-middle items-center bg-black text-white py-1 pl-2 rounded-md text-center items-center">Trx Hash<Link1Icon /></a> 
    }
    if(cell.column.columnDef.accessorKey == 'network'){
        return cell.renderValue() ? <> <Image src={MaticIcon} alt="Matic Icon" width={24} height={24} /></> : <> <Image src={EthIcon} alt="Ethereum Icon" width={24} height={24} /></>
    }
    if(cell.column.columnDef.accessorKey == 'status'){
      return cell.renderValue() == 'success'  ? <> <span className=" bg-green-700 px-1 rounded-md align-middle text-center text-white py-1">Success</span></> : <> <span className=" bg-yellow-700 px-1 rounded-md align-middle text-center text-white py-1">Pending</span></>
    }
    if(cell.column.columnDef.accessorKey == 'type'){
      return cell.renderValue() == 'deposit'  ? <> <span className=" bg-teal-800 px-1 rounded-md align-middle text-center text-white py-1">Deposit</span></> : <> <span className=" bg-black px-1 rounded-md align-middle text-center text-white py-1">Withdraw</span></>
    }
    if(cell.column.columnDef.accessorKey == 'amount'){
      return <> <span className=" text-lg font-semibold items-center align-middle justify-center">
        {cell.renderValue()}</span></>
    }
    if(cell.column.columnDef.accessorKey == 'id'){
      return <> <span className=" text-sm font-semibold items-center align-middle justify-center">
        {cell.row.index}</span></>
    }
    
   

    return flexRender(cell.column.columnDef.cell, cell.getContext())


  }




  return (
    <div>
        <div className="rounded-md border-0">
      <Table>
        <TableHeader>
          {table?.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table?.getRowModel().rows?.length ? (
            table?.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row?.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} >
                    {getCellData(cell)}
                    

                 
                  




                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
   
  )
}
