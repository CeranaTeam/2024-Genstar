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
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.reason}</TableCell>
            </TableRow>
          )) : null
          }
        </TableBody>
      </Table>
    </>
  )
}

export default IngredientTable
