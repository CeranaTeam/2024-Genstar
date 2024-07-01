
"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


import { SelectedDrugsTableInfo } from "./SelectedDrugsTable"

type RecommenDrugTableProps = {
  handleAddDrug: (drug: SelectedDrugsTableInfo) => void
}


export function RecommenDrugTable(
  { handleAddDrug }: RecommenDrugTableProps
) {
  const columns: ColumnDef<Drug>[] = [
    {
      accessorKey: "id",
      header: "Drug ID",
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
      accessorKey: "name",
      header: "Drug Name",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "mainIngredient",
      header: "Main Ingredient",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("mainIngredient")}</div>
      ),
    },
    {
      accessorKey: "mainIngredientQuantity",
      header: "Main Ingredient Quantity",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("mainIngredientQuantity")}</div>
      ),
    },
    {
      accessorKey: "price",
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row.getValue("price")}</div>
      },
    },
    {
      accessorKey: "manufacturer",
      header: "Manufacturer",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("manufacturer")}</div>
      ),
    },
    {
      accessorKey: "dosage",
      header: "Dosage",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("dosage")}</div>
      ),
    },
    {
      accessorKey: "compound",
      header: "Compound Frug",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("compound")}</div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const drugName = row.getValue("name") as string
        const [quantity, setQuantity] = React.useState(String(row.getValue("mainIngredientQuantity")))
        const [frequency, setFrequency] = React.useState("3")
        const [when, setWhen] = React.useState("After Meal")

        const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setQuantity(event.target.value)
        }

        const handleFrequencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setFrequency(event.target.value)
        }
        const handleWhenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setWhen(event.target.value)
        }


        return (
          <>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Quantity</Label>
              <Input
                id="quantity" value={quantity} onChange={handleQuantityChange} />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
              <Label>Frequency</Label>
              <Input
                value={frequency}
                onChange={handleFrequencyChange} />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
              <Label>When</Label>
              <Input
                value={when}
                onChange={handleWhenChange} />
            </div>
            <Button
              className="mt-2"
              onClick={() => {
                handleAddDrug(
                  {
                    drugName: drugName,
                    quantity: quantity,
                    frequency: frequency,
                    when: when
                  }
                )
              }}
              variant="outline">
              Add
            </Button>
          </>
        )
      }
    }
  ]

  const [data, __] = React.useState<Drug[]>([
    {
      id: "AB46029100",
      name: "PRATIN TABLETS",
      mainIngredient: "PRAVASTATIN",
      mainIngredientQuantity: "10mg",
      manufacturer: "信東生技股份有限公司",
      price: "4.82",
      dosage: "tablet",
      compound: "N"
    },
    {
      id: "AB48586100",
      name: "PAVATIN PROTECT TABLETS",
      mainIngredient: "PRAVASTATIN",
      mainIngredientQuantity: "20mg",
      manufacturer: "生達化學製藥股份有限公司",
      price: "4.89",
      dosage: "tablet",
      compound: "N"
    }
  ])

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const [pagination, _] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  })

  return (
    <div className="w-full border mb-4 p-2">

      <h2 className="text-xl">Recommendation</h2>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Drug Name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2 py-4">
        <div className="space-x-2">

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => pagination.pageIndex > 0 ? table.previousPage() : () => { }} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>{pagination.pageIndex + 1} / {table.getPageCount()}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext onClick={() => pagination.pageIndex + 1 < table.getPageCount() ? table.nextPage() : () => { }} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

        </div>
      </div>
    </div >
  )
}

export default RecommenDrugTable
