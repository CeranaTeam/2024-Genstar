import { useEffect, useState } from "react"
import useDebounce from "@/hooks/debounce"
import { Textarea } from "@/components/ui/textarea"


// This component is a text area that will be used to enter the subjective and objective description of the patient
export default function DiagnoseTextArea() {
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
    <div>
      <Textarea
        className="mb-4 mt-4"
        placeholder="Enter your diagnosis here..."
        value={text}
        onChange={handleChange}
      />
    </div>
  )
}
