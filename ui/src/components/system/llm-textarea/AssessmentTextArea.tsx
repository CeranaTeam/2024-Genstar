import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"

type AssessmentTextAreaProps = {
  index: number
}

const AssessmentTextArea = (
  { index }: AssessmentTextAreaProps
) => {
  const [text, setText] = useState<string[]>([
    "This is the first assessment",
    "This is the second assessment",
    "This is the third assessment",
  ])

  const handleTextChange = (index: number) => (e: any) => {
    const newText = [...text]
    newText[index] = e.target.value
    setText(newText)
  }

  return (
    <>
      <h2 className="text-xl">Assessment</h2>

      <Textarea
        onChange={handleTextChange(index)}
        value={text[index]}
        className="mt-2"
        placeholder="LLM Assessment"
      />
    </>
  )
}

export default AssessmentTextArea
