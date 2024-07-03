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

function SelectedDrugsTable() {
  const { selectedDrugs, removeSelectedDrug } = useContext(SelectedSymptomDrugsContext);
  return (
    <>
      <h2 className="text-xl">Selcted Drugs</h2>
      <Table className="mb-4">
        <TableHeader>
          <TableRow>
            <TableHead>Drug Name</TableHead>
            <TableHead>Dosage</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Compound</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Input type="text" placeholder="Add drug by typing its name in manual." />
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