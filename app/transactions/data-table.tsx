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
        return <a href={`https://polygonscan.com/tx/`+cell.renderValue()}  target="_blank">Open in Explorer</a>
    }
    if(cell.column.columnDef.accessorKey == 'network'){
        return cell.renderValue() ? "MATIC" : "ETH"
    }
   

    return flexRender(cell.column.columnDef.cell, cell.getContext())


  }





  return (
    <div>
        <div className="rounded-md border">
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
                  <TableCell key={cell.id}>
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
