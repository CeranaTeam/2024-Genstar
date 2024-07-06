import { useContext } from "react"
import { LLMResponsesContext } from "@/store/LLMResponsesProvider"
import { useSearchSymptom } from "@/contexts/useSearchSymptom"

import { Badge } from "@/components/ui/badge"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

type SymptomTableProps = {
  index: number
}

const SymptomBadge = (
  { index }: SymptomTableProps
) => {

  const { symptomsContext } = useContext(LLMResponsesContext)
  const { setSearchSymptomText } = useSearchSymptom();

  return (
    <>
      {symptomsContext[index] ? symptomsContext[index].response.map((item, index) => (
        <Badge
          className="mr-2 mb-2 cursor-pointer"
          key={index} onClick={() => setSearchSymptomText ? setSearchSymptomText(item.name) : {}}>
          <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger>{item.name}</HoverCardTrigger>
            <HoverCardContent className="w-max-[300px]">
              {item.reason}
            </HoverCardContent>
          </HoverCard>
        </Badge>
      )) : null
      }
    </>
  )
}

export default SymptomBadge
