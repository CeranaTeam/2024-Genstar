import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"

type PlanTextAreaProps = {
  index: number
}

const PlanTextArea = (
  { index }: PlanTextAreaProps
) => {
  const [text, setText] = useState<string[]>([
    "This is firt plan",
    "This is second plan",
    "This is third plan",
  ])

  const handleTextChange = (index: number) => (e: any) => {
    const newText = [...text]
    newText[index] = e.target.value
    setText(newText)
  }

  return (
    <>
      <h2 className="text-xl">Plan</h2>

      <Textarea
        onChange={handleTextChange(index)}
        value={text[index]}
        className="mt-2"
        placeholder="LLM Plan"
        disabled
      />
    </>
  )
}

export default PlanTextArea
