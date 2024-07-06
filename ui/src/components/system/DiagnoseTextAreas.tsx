import { useEffect, useState, useContext } from "react"
import useDebounce from "@/hooks/debounce"
import { Textarea } from "@/components/ui/textarea"
import { LLMResponsesContext, LLMResponsesContextType, ResponseReasonInfo } from "@/store/LLMResponsesProvider"

// This component is a text area that will be used to enter the subjective and objective description of the patient
export default function DiagnoseTextAreas() {
  const [text, setText] = useState("")
  const debouncedSearch = useDebounce(text, 1000) // After typing, start to count the time. Then, after one second, it will trigger the useEffect

  const { addSymptomContext, setSymptomContextLoading } = useContext(LLMResponsesContext) as LLMResponsesContextType
  const { addIngredientContext, setIngredientContextLoading } = useContext(LLMResponsesContext) as LLMResponsesContextType
  const [currIndex, setCurrIndex] = useState(0)

  const apiUrl = import.meta.env.VITE_API_URL

  const fetchSymptoms = async () => {
    try {
      setSymptomContextLoading((prev: number) => prev + 1)
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
    } finally {
      setSymptomContextLoading((prev: number) => prev - 1)
    }
  }

  const fetchIngredients = async () => {
    try {
      setIngredientContextLoading((prev: number) => prev + 1)
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
    } finally {
      setIngredientContextLoading((prev: number) => prev - 1)
    }
  }

  useEffect(() => {
    if (debouncedSearch) {
      fetchSymptoms()
      fetchIngredients()
      setCurrIndex((prev) => prev + 1)
    }
  }, [debouncedSearch])

  useEffect(() => {
    localStorage.setItem("diagnosis", '')
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    localStorage.setItem("diagnosis", e.target.value)
  }

  return (
    <div className="mt-4 mb-4 border p-2 rounded">
      <h2 className="text-xl mb-2">紀錄</h2>
      <Textarea
        className="min-h-36"
        placeholder="Enter your diagnosis here..."
        value={text}
        onChange={handleChange}
      />
    </div>
  )
}
