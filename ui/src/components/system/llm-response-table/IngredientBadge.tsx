import { useContext, useState } from "react"
import { LLMResponsesContext } from "@/store/LLMResponsesProvider"
import { SelectedSymptomDrugsContext } from "@/store/SelectedSymptomsDrugsProvider"

import { Badge } from "@/components/ui/badge"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

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

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"

type SymptomTableProps = {
  index: number
}

const IngredientBadge = (
  { index }: SymptomTableProps
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
        if (drug.drug_std_qty === "0") {
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
      <h2 className="text-xl">推薦使用成分</h2>

      {ingredientsContext[index] ? ingredientsContext[index].response.map((item, idx1) => (
        <Dialog key={idx1}>
          <DialogTrigger className="cursor-pointer" onClick={() => fetchDrugs(item.name)} asChild>
            <Badge
              className="mr-2 mb-2 cursor-pointer"
              key={index}
            >
              <HoverCard openDelay={0} closeDelay={0}>
                <HoverCardTrigger>{item.name}</HoverCardTrigger>
                <HoverCardContent className="w-max-[300px]">
                  {item.reason}
                </HoverCardContent>
              </HoverCard>
            </Badge>
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
    </>
  )
}

export default IngredientBadge      
