import { useContext } from "react";
import { SelectedSymptomDrugsContext } from "@/store/SelectedSymptomsDrugsProvider";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"


function SelectedSymptomsTable() {
  const { selectedSymptoms, removeSelectedSymptom } = useContext(SelectedSymptomDrugsContext);

  return (
    <>
      <h2 className="text-xl">症狀</h2>
      <Table className="mb-4">
        <TableHeader>
          <TableRow>
            <TableHead>English Name(Chinese Name)</TableHead>
            <TableHead>ICD10 Code</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedSymptoms.map((symptom, index) => (
            <TableRow key={index}>
              <TableCell>
                {`${symptom.english_name}( ${symptom.chinese_name} )`}
              </TableCell>
              <TableCell>{symptom.id}</TableCell>
              <TableCell>
                <Button
                  onClick={() => removeSelectedSymptom(String(index))}
                  variant="destructive"><XIcon className="w-4 h-4" /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}


export default SelectedSymptomsTable;
