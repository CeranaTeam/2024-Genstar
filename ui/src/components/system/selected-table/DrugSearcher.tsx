import { useState, useContext, useEffect } from "react";
import {
  Command,
  CommandList,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import useDebounce from "@/hooks/debounce";
import { SelectedSymptomDrugsContext } from "@/store/SelectedSymptomsDrugsProvider";

export default function DrugSearcher() {
  const [inputText, setInputText] = useState("");
  const debouncedInputText = useDebounce(inputText, 500);
  const [drugs, setDrugs] = useState<AutocompleteDrugInfo[]>([]);

  const { addSelectedDrug } = useContext(SelectedSymptomDrugsContext);

  const fetchDrugs = async () => {
    try {
      const response_symptoms = await fetch(`${import.meta.env.VITE_API_URL}/autocomplete/drug`, {
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
      fetchDrugs()
      return
    }
    setDrugs([])
  }, [debouncedInputText])

  return (
    <Command filter={() => {return 1}}>
      <CommandInput placeholder="Search Drugs by ingredients..."
        value={inputText} onValueChange={setInputText}
      />
      <CommandGroup>
        <CommandList>
          {drugs.map((drug, index) => (
            <CommandItem
              className="bg-white cursor-pointer"
              key={index}
              value={`${drug.name}( ${drug.dosage} )`}
              onSelect={() => {
                setInputText("")
                addSelectedDrug(drug)
              }}
            >
              {`${drug.name}( ${drug.dosage} )`}
            </CommandItem>
          ))}
        </CommandList>
      </CommandGroup>
    </Command>
  )
}
