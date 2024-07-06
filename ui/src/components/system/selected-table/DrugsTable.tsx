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
import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

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
          {/*<TableRow>
            <TableCell className="p-0 max-h-[53px] flex">
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
            </TableCell>
          </TableRow>*/}
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
                  variant="destructive"><XIcon className="w-4 h-4" /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default SelectedDrugsTable;
