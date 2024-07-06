import { useContext, useEffect, useState } from "react";
import useDebounce from "@/hooks/debounce";
import { SelectedSymptomDrugsContext } from "@/store/SelectedSymptomsDrugsProvider";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table"

import {
  Command,
  CommandList,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"

import { Button } from "@/components/ui/button"

function SelectedDrugsTable() {
  const { selectedDrugs, removeSelectedDrug } = useContext(SelectedSymptomDrugsContext);
  const [inputText, setInputText] = useState("");

  const debouncedInputText = useDebounce(inputText, 500);

  const { addSelectedDrug } = useContext(SelectedSymptomDrugsContext);

  const [drugs, setDrugs] = useState<AutocompleteDrugInfo[]>([]);

  console.log("drugs:", drugs)

  const apiUrl = import.meta.env.VITE_API_URL;
  const fetchDrugs = async () => {
    try {
      const response_symptoms = await fetch(`${apiUrl}/autocomplete/drug`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: inputText,
          page_size: 10,
          page: 1,
        }),
      });

      if (!response_symptoms.ok) {
        throw new Error("Failed to fetch symptoms");
      }

      const data: DrugsDTO = await response_symptoms.json();
      const convertedData: AutocompleteDrugInfo[] = data.drugs.map((drug) => {
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
      })
      console.log("convertedData", convertedData)
      setDrugs(convertedData);

    } catch (error) {
      console.error("There was an error fetching the drugs:", error);
    }
  }

  useEffect(() => {
    if (debouncedInputText) {
      fetchDrugs();
    }
    else {
      setDrugs([])
    }
  }, [debouncedInputText])

  return (
    <>
      <h2 className="text-xl">使用藥物</h2>
      <Table className="mb-4">
        <TableHeader>
          <TableRow>
            <TableHead>Drug Name</TableHead>
            {/*<TableHead>藥物名稱</TableHead>*/}
            <TableHead>Dosage</TableHead>
            {/*<TableHead>劑量</TableHead>*/}
            <TableHead>Quantity</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Compound</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="p-0">
              {/* Disable the Command filter */}
              <Command filter={() => {return 1}}>
                <CommandInput placeholder="Search Drugs by ingredients..."
                  value={inputText} onValueChange={setInputText}
                />
                <CommandGroup>
                  <CommandList>
                    {drugs.map((drug, index) => (
                      <CommandItem
                        key={index}
                        value={drug.name}
                        onSelect={() => {
                          setInputText("")
                          addSelectedDrug(drug)
                        }}
                      >
                        {drug.name}
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </TableCell>
          </TableRow>
          {selectedDrugs.map((drug, index) => (
            <TableRow key={index}>
              <TableCell>{drug.name}</TableCell>
              <TableCell>{drug.dosage}</TableCell>
              <TableCell>{drug.std_qty}</TableCell>
              <TableCell>{drug.std_unit}</TableCell>
              <TableCell>{drug.compound}</TableCell>
              <TableCell>
                <Button
                  onClick={() => removeSelectedDrug(String(index))}
                  variant="destructive">Remove</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default SelectedDrugsTable;
