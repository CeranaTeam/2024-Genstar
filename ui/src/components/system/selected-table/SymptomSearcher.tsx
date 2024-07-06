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
import { useSearchSymptom } from "@/contexts/useSearchSymptom";

export default function DrugSearcher() {
  const { searchSymptomText, setSearchSymptomText } = useSearchSymptom();

  const debouncedInputText = useDebounce(searchSymptomText, 500);

  const { addSelectedSymptom } = useContext(SelectedSymptomDrugsContext);

  const [symptoms, setSymptoms] = useState<AutocompleteDiagnosisInfo[]>([]);

  const fetchSymptoms = async () => {
    try {
      const response_symptoms = await fetch(`${import.meta.env.VITE_API_URL}/autocomplete/diagnosis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: debouncedInputText }),
      });

      if (!response_symptoms.ok) {
        throw new Error("Failed to fetch symptoms");
      }

      const data: AutocompleteDiagnosisDTO = await response_symptoms.json();

      const convertedData: AutocompleteDiagnosisInfo[] = data.diagnosis.map((symptom) => {
        return {
          id: symptom.icd_10_code,
          english_name: symptom.english_name,
          chinese_name: symptom.chinese_name,
        }
      })

      setSymptoms(convertedData);

    } catch (error) {
      console.error("There was an error fetching the symptoms:", error);
    }
  }

  useEffect(() => {
    if (debouncedInputText) {
      fetchSymptoms();
    }
    else {
      setSymptoms([])
    }
  }, [debouncedInputText])


  return (
    <Command filter={() => { return 1 }}>
      <CommandInput placeholder="Search Symptom..."
        value={searchSymptomText} onValueChange={setSearchSymptomText}
      />
      <CommandGroup>
        <CommandList>
          {symptoms.map((symptom, index) => (
            <CommandItem
              className="bg-white cursor-pointer"
              key={index}
              value={`${symptom.english_name} ( ${symptom.chinese_name} )`}
              onSelect={() => {
                setSearchSymptomText("")
                addSelectedSymptom(symptom)
              }}
            >
              {`${symptom.english_name} ( ${symptom.chinese_name} )`}
            </CommandItem>
          ))}
        </CommandList>
      </CommandGroup>
    </Command>
  )
}
