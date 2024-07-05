import { useContext, useState } from "react"
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

// const data = [
//   {
//     name: "drug1",
//     id: "1",
//     std_qty: "1",
//     std_unit: "mg",
//     dosage: "1",
//     compound: "compound1",
//     ingredients: [
//       {
//         name: "ingredient1",
//         quantity: "1",
//         unit: "mg",
//       }
//     ],
//     classify_name: "classify1",
//     manufacturer: "manufacturer1"
//   },
//   {
//     name: "drug2",
//     id: "2",
//     std_qty: "2",
//     std_unit: "mg",
//     dosage: "2",
//     compound: "compound2",
//     ingredients: [
//       {
//         name: "ingredient2",
//         quantity: "2",
//         unit: "mg",
//       }
//     ],
//     classify_name: "classify2",
//     manufacturer: "manufacturer2"
//   }
// ]

import { Button } from "@/components/ui/button"




type IngredientTableProps = {
  index: number
}

const IngredientTable = (
  { index }: IngredientTableProps
) => {

  const { ingredientsContext } = useContext(LLMResponsesContext)
  const { addSelectedDrug } = useContext(SelectedSymptomDrugsContext);

  const [data, setData] = useState<AutocompleteDrugInfo[]>([]);

  const apiUrl = import.meta.env.VITE_API_URL
  const fetchDrugs = async (ingredient: string) => {
    console.log("fetching drugs")
    try {
      const response_drugs = await fetch(`${apiUrl}/autocomplete/drug`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "query": ingredient,
          "page_size": 10,
          "page": 1,
        }),


      });
      const data: DrugsDTO = await response_drugs.json();

      const convertedData: AutocompleteDrugInfo[] = data.drugs.map((drug) => {
        if (drug.drug_std_qty === "0"){
          return {
            name: drug.drug_name,
            id: drug.drug_code,
            std_qty: drug.drug_ings.length > 0 ? drug.drug_ings[0].ing_qty : "0",
            std_unit: drug.drug_ings.length > 0 ? drug.drug_ings[0].ing_unit : "null",
            dosage: drug.drug_dose,
            compound: drug.mixture,
            ingredients: drug.drug_ings.map((ing) => {
              return {
                name: ing.ing_name,
                quantity: ing.ing_qty,
                unit: ing.ing_unit,
              }
            }),
            classify_name: drug.drug_classify_name,
            manufacturer: drug.druggist_name,
          }
        }
        else {
          return {
            name: drug.drug_name,
            id: drug.drug_code,
            std_qty: drug.drug_std_qty,
            std_unit: drug.drug_std_unit,
            dosage: drug.drug_dose,
            compound: drug.mixture,
            ingredients: drug.drug_ings.map((ing) => {
              return {
                name: ing.ing_name,
                quantity: ing.ing_qty,
                unit: ing.ing_unit,
              }
            }),
            classify_name: drug.drug_classify_name,
            manufacturer: drug.druggist_name,
          }
        }
      });

      setData(convertedData);
    }
    catch (error) {
      console.error("There was an error fetching the drugs:", error);
    }
  }

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
              <DialogTrigger onClick={() => fetchDrugs(item.name)} asChild>
                <TableRow key={idx1}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.reason}</TableCell>
                </TableRow>
              </DialogTrigger>
              <DialogContent className="max-w-[650px] max-h-[500px] overflow-auto">
                <DialogHeader>
                  <DialogTitle>Releated Drugs</DialogTitle>
                  <DialogDescription>
                    These are the drugs that contain the ingredient
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
