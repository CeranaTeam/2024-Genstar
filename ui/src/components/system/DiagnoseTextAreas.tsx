import { useEffect, useState } from "react"
import useDebounce from "@/hooks/debounce"
import { Textarea } from "@/components/ui/textarea"
import LLMResponseTextAreas from "./LLMResponseTextAreas"
import SelectedDrugsTable from "./SelectedDrugsTable"


// This component is a text area that will be used to enter the subjective and objective description of the patient
export default function DiagnoseTextAreas() {
  const [text, setText] = useState("")
  const debouncedSearch = useDebounce(text, 1000) // After typing, start to count the time. Then, after one second, it will trigger the useEffect

  console.log("Debounced Search: ", debouncedSearch)

  useEffect(() => {
    if (debouncedSearch) {
      console.log("Diagnosis: ", debouncedSearch)
    }
  }, [debouncedSearch])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  return (
    <>
      <div className="mt-4 mb-4 border p-2">
        <h2 className="text-xl">Diagnosis</h2>
        <Textarea
          placeholder="Enter your diagnosis here..."
          value={text}
          onChange={handleChange}
        />
      </div>
      <LLMResponseTextAreas />
      <SelectedDrugsTable />
    </>
  )
}
