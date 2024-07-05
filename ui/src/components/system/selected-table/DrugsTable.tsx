import { useContext } from "react";
import { SelectedSymptomDrugsContext } from "@/components/store/SelectedSymptomsDrugsProvider";
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
              {/* [TODO] Should be replace to search with auto-complete */}
              <Input type="text" placeholder="Add drug by typing its name in manual" />
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
