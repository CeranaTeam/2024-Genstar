import { useState } from "react"
import RecommendedDrugsTable from "./RecommendDrugTable"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import AutoCompleteTextArea from "./AutoCompleteTextArea"

export type SelectedDrugsTableInfo = {
  drugName: string,
  quantity: string,
  frequency: string,
  when: string,
}

function SelectedDrugsTable() {
  const [selectedDrugs, setSelectedDrugs] = useState<SelectedDrugsTableInfo[]>([
    {
      drugName: "Drug 1",
      quantity: "2mg",
      frequency: "1",
      when: "Morning only; Before meal"
    },
    {
      drugName: "Drug 2",
      quantity: "5mg",
      frequency: "2",
      when: "Morning and Night; Before meal"
    },
    {
      drugName: "Drug 3",
      quantity: "10mg",
      frequency: "3",
      when: "Morning, Afternoon and Night; After meal"
    },
  ])

  const handleAddDrug = (drug: SelectedDrugsTableInfo) => {
    setSelectedDrugs([...selectedDrugs, drug])
  }
  const handleRemoveDrug = (index: number) => {
    const updatedDrugs = [...selectedDrugs]
    updatedDrugs.splice(index, 1)
    setSelectedDrugs(updatedDrugs)
  }

  return (
    <>
      <AutoCompleteTextArea />
      <div className="border mb-4 p-2">
        <h2 className="text-xl">Selected Drugs</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Drug Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>When</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedDrugs.map((drug, index) => (
              <TableRow key={index}>
                <TableCell>{drug.drugName}</TableCell>
                <TableCell>{drug.quantity}</TableCell>
                <TableCell>{drug.frequency}</TableCell>
                <TableCell>{drug.when}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleRemoveDrug(index)}
                    variant="destructive">Remove</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <RecommendedDrugsTable handleAddDrug={handleAddDrug} />
    </>
  )
}

export default SelectedDrugsTable
