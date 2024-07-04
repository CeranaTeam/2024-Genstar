
import { useContext, useEffect, useState } from "react";
import { SelectedSymptomDrugsContext } from "@/components/store/SelectedSymptomDrugsProvider";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table"

import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function SelectedSymptomsTable() {
  const { selectedSymptoms, removeSelectedSymptom } = useContext(SelectedSymptomDrugsContext);
  const [inputText, setInputText] = useState("");

  const { addSelectedSymptom } = useContext(SelectedSymptomDrugsContext);

  const handleTableRowClick = (text: string) => {
    setInputText(text);
  }

  const drugs: AutocompleteDiagnosisInfo[] =  [
    {
      id: "1",
      english_name: "Headache",
      chinese_name: "Headache",
    },
    {
      id: "2",
      english_name: "Cough",
      chinese_name: "Cough",
    },
    {
      id: "3",
      english_name: "Fever",
      chinese_name: "Fever",
    }
  ]

  return (
    <>
      <h2 className="text-xl">Selcted Symptoms</h2>
      <Table className="mb-4">
        <TableHeader>
          <TableRow>
            <TableHead>Symptom ID</TableHead>
            <TableHead>English Name</TableHead>
            <TableHead>Chinese Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Command>
                <CommandInput placeholder="Search Symptom..."
                  value={inputText} onValueChange={setInputText}
                />
                <CommandEmpty>No drug found.</CommandEmpty>
                <CommandGroup>
                  <CommandList>
                    {drugs.map((drug, index) => (
                      <CommandItem
                        key={index}
                        value={drug.english_name}
                        onSelect={() => {
                          setInputText("")
                          addSelectedSymptom(drug)
                        }}
                      >
                        {drug.english_name}
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </TableCell>
          </TableRow>
          {selectedSymptoms.map((symptom, index) => (
            <TableRow key={index} onClick={() => handleTableRowClick(symptom.english_name)}>
              <TableCell>{symptom.id}</TableCell>
              <TableCell>{symptom.english_name}</TableCell>
              <TableCell>{symptom.chinese_name}</TableCell>
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
