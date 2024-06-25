import { useEffect, useState } from "react"
import useDebounce from "@/hooks/debounce" 

export default function DiagnoseTextArea() {
    const [text, setText] = useState("")
    const debouncedSearch = useDebounce(text, 500)

    console.log("Debounced Search: ", debouncedSearch)

    useEffect(() => {
        if(debouncedSearch){
            console.log("Diagnosis: ", debouncedSearch)
        }
    }, [debouncedSearch])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value)
    }

    return (
        <div>
            <textarea
                className="w-full h-40 p-2 border border-gray-300 rounded-lg"
                placeholder="Enter your diagnosis here..."
                value={text}
                onChange={handleChange}
            />
        </div>
    )
}