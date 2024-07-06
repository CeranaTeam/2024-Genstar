
import { useContext, useEffect, useState } from "react";
import useDebounce from "@/hooks/debounce";
import { SelectedSymptomDrugsContext } from "@/components/store/SelectedSymptomsDrugsProvider";
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

function SelectedSymptomsTable() {
  const { selectedSymptoms, removeSelectedSymptom } = useContext(SelectedSymptomDrugsContext);
  const [inputText, setInputText] = useState("");

  const debouncedInputText = useDebounce(inputText, 500);

  const { addSelectedSymptom } = useContext(SelectedSymptomDrugsContext);

  const [symptoms, setSymptoms] = useState<AutocompleteDiagnosisInfo[]>([]);

  const apiUrl = import.meta.env.VITE_API_URL;
  const fetchSymptoms = async () => {
    try {
      const response_symptoms = await fetch(`${apiUrl}/autocomplete/diagnosis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: inputText }),
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
    else{
      setSymptoms([])
    }
  }, [debouncedInputText])

  return (
    <>
      <h2 className="text-xl">症狀</h2>
      <Table className="mb-4">
        <TableHeader>
          <TableRow>
            <TableHead>English Name</TableHead>
            <TableHead>Chinese Name</TableHead>
            <TableHead>ICD10 Code</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="p-0">
              <Command>
                <CommandInput placeholder="Search Symptom..."
                  value={inputText} onValueChange={setInputText}
                />
                <CommandGroup>
                  <CommandList>
                    {symptoms.map((symptom, index) => (
                      <CommandItem
                        key={index}
                        value={symptom.english_name}
                        onSelect={() => {
                          setInputText("")
                          addSelectedSymptom(symptom)
                        }}
                      >
                        {symptom.english_name}
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </TableCell>
          </TableRow>
          {selectedSymptoms.map((symptom, index) => (
            <TableRow key={index}>
              <TableCell>{symptom.english_name}</TableCell>
              <TableCell>{symptom.chinese_name}</TableCell>
              <TableCell>{symptom.id}</TableCell>
              <TableCell>
                <Button
                  onClick={() => removeSelectedSymptom(String(index))}
                  variant="destructive">Remove</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}


export default SelectedSymptomsTable;
