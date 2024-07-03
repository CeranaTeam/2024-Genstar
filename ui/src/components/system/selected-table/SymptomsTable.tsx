
import { useContext } from "react";
import { SelectedSymptomDrugsContext } from "@/components/store/SelectedSymptomDrugsProvider";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function SelectedSymptomsTable() {
  const { selectedSysmptoms, removeSelectedSymptom } = useContext(SelectedSymptomDrugsContext);
  return (
    <>
      <h2 className="text-xl">Selcted Sysmptoms</h2>
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
              <Input type="text" placeholder="Symptom Name" />
            </TableCell>
          </TableRow>
          {selectedSysmptoms.map((sysmptom, index) => (
            <TableRow key={index}>
              <TableCell>{sysmptom.id}</TableCell>
              <TableCell>{sysmptom.english_name}</TableCell>
              <TableCell>{sysmptom.chinese_name}</TableCell>
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
