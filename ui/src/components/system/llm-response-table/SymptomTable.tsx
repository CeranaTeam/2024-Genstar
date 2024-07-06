import { useContext } from "react"
import { LLMResponsesContext } from "@/store/LLMResponsesProvider"
import { useSearchSymptom } from "@/contexts/useSearchSymptom"

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table"

type SymptomTableProps = {
  index: number
}

const SymptomTable = (
  { index }: SymptomTableProps
) => {

  const { symptomsContext } = useContext(LLMResponsesContext)
  const { setSearchSymptomText } = useSearchSymptom();

  return (
    <>
      <h2 className="text-xl">可能症狀</h2>

      <Table className="mb-4">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Reason</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {symptomsContext[index] ? symptomsContext[index].response.map((item, index) => (
            <TableRow key={index} onClick={() => setSearchSymptomText ? setSearchSymptomText(item.name) : {} }>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.reason}</TableCell>
            </TableRow>
          )) : null
          }
        </TableBody>
      </Table>
    </>
  )
}

export default SymptomTable
