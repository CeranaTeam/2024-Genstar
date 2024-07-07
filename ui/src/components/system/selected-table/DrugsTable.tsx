import { useContext, useState } from "react";
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

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import { Input } from "@/components/ui/input"

function SelectedDrugsTable() {
  const { selectedDrugs, selectedDrugsUsage,
    removeSelectedDrug, setSelectedDrugsUsage } = useContext(SelectedSymptomDrugsContext);

  //const [inputTimings, setInputTimings] = useState<string[]>(selectedDrugsTiming);
  const [inputUsages, setInputUsages] = useState<string[]>(selectedDrugsUsage);

  //useEffect(() => {
  //  setInputTimings(selectedDrugsTiming);
  //  setInputUsages(selectedDrugsUsage);
  //}, [selectedDrugsTiming, selectedDrugsUsage])

  //const handleTimingChange = (idx: string, timing: string) => {
  //  console.log("timing", idx, timing);
  //  const newInputTimings = [...inputTimings];
  //  newInputTimings[parseInt(idx)] = timing;
  //  // setInputTimings(newInputTimings);
  //  setSelectedDrugsTiming(newInputTimings);
  //}

  const handleUsageChange = (idx: string, usage: string) => {
    const newInputUsages = [...inputUsages];
    newInputUsages[parseInt(idx)] = usage;
    setInputUsages(newInputUsages);
    setSelectedDrugsUsage(newInputUsages);
  }

  return (
    <>
      <h2 className="text-xl">使用藥物</h2>
      <Table className="mb-4">
        <TableHeader>
          <TableRow>
            <TableHead>Drug Name</TableHead>
            {/*<TableHead>藥物名稱</TableHead>*/}
            {/* <TableHead>Dosage</TableHead> */}
            {/*<TableHead>使用劑量</TableHead>*/}
            {/* <TableHead>Quantity</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Compound</TableHead> */}
            <TableHead>Note</TableHead>
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
            <HoverCard openDelay={0} closeDelay={0} key={index}>
              <HoverCardTrigger asChild>
                <TableRow key={index}>
                  <TableCell>{drug.name}</TableCell>
                  <TableCell>
                    <Input
                      key={index}
                      placeholder="e.g. 三餐飯後服用 副作用"
                      value={inputUsages[index] ? inputUsages[index] : ""}
                      onChange={(e) => handleUsageChange(String(index), e.target.value)}
                    ></Input>
                  </TableCell>
                  {/* <TableCell>{drug.dosage}</TableCell>
                  <TableCell>{drug.std_qty}</TableCell>
                  <TableCell>{drug.std_unit}</TableCell>
                  <TableCell>{drug.compound}</TableCell> */}
                  {/*<TableCell>
                    <Input
                      key={index}
                      placeholder="e.g. 三餐飯後服用"
                      value={inputTimings[index] ? inputTimings[index] : ""}
                      onChange={(e) => handleTimingChange(String(index), e.target.value)}
                    ></Input>
                  </TableCell>*/}
                  <TableCell>
                    <Button
                      onClick={() => removeSelectedDrug(String(index))}
                      variant="destructive"><XIcon className="w-4 h-4" /></Button>
                  </TableCell>
                </TableRow>
              </HoverCardTrigger>
              <tr>
                <td>
                  <HoverCardContent className="w-300">
                    <li>Dosage: {drug.dosage}</li>
                    <li>Standard Qty: {drug.std_qty}</li>
                    <li>Standard Unit: {drug.std_unit}</li>
                    <li>Compound: {drug.compound}</li>
                  </HoverCardContent>
                </td>
              </tr>
            </HoverCard>
          ))}
        </TableBody>
      </Table >
    </>
  )
}

export default SelectedDrugsTable;
