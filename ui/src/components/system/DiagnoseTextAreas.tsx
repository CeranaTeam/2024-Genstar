import { useEffect, useState, useContext } from "react"
import useDebounce from "@/hooks/debounce"
import { Textarea } from "@/components/ui/textarea"
import { LLMResponsesContext, LLMResponsesContextType } from "@/components/store/LLMResponsesProvider"

// This component is a text area that will be used to enter the subjective and objective description of the patient
export default function DiagnoseTextAreas() {
  const [text, setText] = useState("")
  const debouncedSearch = useDebounce(text, 1000) // After typing, start to count the time. Then, after one second, it will trigger the useEffect

  const { addSymptomContext } = useContext(LLMResponsesContext) as LLMResponsesContextType
  const { addIngredientContext } = useContext(LLMResponsesContext) as LLMResponsesContextType
  const [currIndex, setCurrIndex] = useState(0)

  useEffect(() => {
    if (!debouncedSearch) return
    const randomTime = Math.floor(Math.random() * 6000) + 1000
    setTimeout(() => {
      addSymptomContext({ index: currIndex, response: [{ name: String(currIndex), reason: debouncedSearch }] })
      addIngredientContext({ index: currIndex, response: [{ name: String(currIndex), reason: debouncedSearch }] })
    }, randomTime)
    setCurrIndex((prev) => prev + 1)
  }, [debouncedSearch])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  return (
    <div className="mt-4 mb-4 border p-2">
      <h2 className="text-xl">Diagnosis</h2>
      <Textarea
        placeholder="Enter your diagnosis here..."
        value={text}
        onChange={handleChange}
      />
    </div>
  )
}
