import { useContext } from "react"
import { LLMResponsesContext } from "@/components/store/LLMResponsesProvider"

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

type IngredientTableProps = {
  index: number
}

const IngredientTable = (
  { index }: IngredientTableProps
) => {

  const { ingredientsContext } = useContext(LLMResponsesContext)

  return (
    <>
      <h2 className="text-xl">Ingredient</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Reason</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ingredientsContext[index] ? ingredientsContext[index].response.map((item, index) => (
            <Dialog>
              <DialogTrigger asChild>
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.reason}</TableCell>
                </TableRow>
              </DialogTrigger>
              <DialogContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Drug Name</TableHead>
                      <TableHead>Dosage</TableHead>
                      <TableHead>Compound</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    { }
                  </TableBody>
                </Table>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )) : null
          }
        </TableBody>
      </Table>
    </>
  )
}

export default IngredientTable
