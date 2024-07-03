import { useContext } from "react"
import { LLMResponsesContext } from "@/components/store/LLMResponsesProvider"
import { SelectedSymptomDrugsContext } from "@/components/store/SelectedSymptomDrugsProvider"

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
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

const data = [
  {
    name: "drug1",
    id: "1",
    std_qty: "1",
    std_unit: "mg",
    dosage: "1",
    compound: "compound1",
    ingredients: [
      {
        name: "ingredient1",
        quantity: "1",
        unit: "mg",
      }
    ],
    classify_name: "classify1",
    manufacturer: "manufacturer1"
  },
  {
    name: "drug2",
    id: "2",
    std_qty: "2",
    std_unit: "mg",
    dosage: "2",
    compound: "compound2",
    ingredients: [
      {
        name: "ingredient2",
        quantity: "2",
        unit: "mg",
      }
    ],
    classify_name: "classify2",
    manufacturer: "manufacturer2"
  }
]

import { Button } from "@/components/ui/button"

type IngredientTableProps = {
  index: number
}

const IngredientTable = (
  { index }: IngredientTableProps
) => {

  const { ingredientsContext } = useContext(LLMResponsesContext)
  const { selectedDrugs, addSelectedDrug } = useContext(SelectedSymptomDrugsContext);

  return (
    <>
      <h2 className="text-xl">Ingredient</h2>

      <Table className="mb-4">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Reason</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ingredientsContext[index] ? ingredientsContext[index].response.map((item, idx1) => (
            <Dialog key={idx1}>
              <DialogTrigger asChild>
                <TableRow key={idx1}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.reason}</TableCell>
                </TableRow>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
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
                    {data.map((drug, idx2) => {
                      return (
                        <TableRow key={idx2}>
                          <TableCell>{drug.name}</TableCell>
                          <TableCell>{drug.dosage}</TableCell>
                          <TableCell>{drug.compound}</TableCell>
                          <TableCell>
                            <Button
                              onClick={() => addSelectedDrug(drug)}
                              variant="outline">Add</Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
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
