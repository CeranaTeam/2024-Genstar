import { useEffect, useState, useContext } from "react"
import useDebounce from "@/hooks/debounce"
import { Textarea } from "@/components/ui/textarea"
import { LLMResponsesContext, LLMResponsesContextType, ResponseReasonInfo } from "@/components/store/LLMResponsesProvider"

// This component is a text area that will be used to enter the subjective and objective description of the patient
export default function DiagnoseTextAreas() {
  const [text, setText] = useState("")
  const debouncedSearch = useDebounce(text, 1000) // After typing, start to count the time. Then, after one second, it will trigger the useEffect

  const { addSymptomContext } = useContext(LLMResponsesContext) as LLMResponsesContextType
  const { addIngredientContext } = useContext(LLMResponsesContext) as LLMResponsesContextType
  const [currIndex, setCurrIndex] = useState(0)

  const apiUrl = import.meta.env.VITE_API_URL

  const fetchSymptoms = async () => {
    try {
      const response = await fetch(`${apiUrl}/generate/diagnosis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ context: debouncedSearch }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch diagnosis");
      }

      const data: SymptomsDTO = await response.json();

      const convertedData: ResponseReasonInfo[] = data.diagnosis_suggestions.map((symptom) => {
        return {
          name: symptom.name,
          reason: symptom.reason,
        }
      })
      // Assuming you want to use the data here
      addSymptomContext({ index: currIndex, response: convertedData });
    } catch (error) {
      console.error("There was an error fetching the diagnosis:", error);
    }
  }

  const fetchIngredients = async () => {
    try {
      const response = await fetch(`${apiUrl}/generate/ingredient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ context: debouncedSearch }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch ingredient");
      }

      const data: IngredientsDTO = await response.json();

      const convertedData: ResponseReasonInfo[] = data.ingredient_suggestions.map((ingredient) => {
        return {
          name: ingredient.name,
          reason: ingredient.reason,
        }
      })

      // Assuming you want to use the data here
      addIngredientContext({ index: currIndex, response: convertedData });
    } catch (error) {
      console.error("There was an error fetching the ingredient:", error);
    }
  }

  useEffect(() => {
    if (debouncedSearch) {
      fetchSymptoms()
      fetchIngredients()
      setCurrIndex((prev) => prev + 1)
    }
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
