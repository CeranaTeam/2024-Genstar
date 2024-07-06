import { useState, useMemo, useContext } from 'react'
import { Button } from '@/components/ui/button'
import MarkdownPreviewer from '@/components/ui/markdown-previewer';
import { SelectedSymptomDrugsContext } from '@/store/SelectedSymptomsDrugsProvider'
import { Loader2 } from 'lucide-react';

const useSummary = (): { summary: string, loading: boolean, error: string, generate: (context: string) => void } => {
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generateSummary = async (context: string) => {
    setLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/summary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ context })
      })

      if(!response.ok) {
        throw new Error('Failed to fetch summary')
      }

      const data = await response.json()
      setSummary(data.markdown)
      /* eslint-disable  @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { summary, loading, error, generate: generateSummary }
}

export default function SummarySection() {
  const { selectedSymptoms, selectedDrugs } = useContext(SelectedSymptomDrugsContext);
  
  const stringOfAll = useMemo(() => {
  // make both selectedSymptoms and selectedDrugs to string context for summary
    console.log(selectedSymptoms)
    console.log(selectedDrugs)
    const selectedSymptomsString = selectedSymptoms.map((symptom) => symptom.english_name).join(', ')
    const selectedDrugsString = selectedDrugs.map((drug) => `${drug.name}`).join(', ')
    const res = `# 紀錄:\n ${localStorage.getItem('diagnosis')}\n\n# 症狀:\n ${selectedSymptomsString}\n\n# 藥物:\n ${selectedDrugsString}`
    console.log(res)
    return res
  }, [selectedSymptoms, selectedDrugs])

  const { summary, loading, generate } = useSummary()

  return (
    <div className="border p-2">
      <Button onClick={() => generate(stringOfAll)} disabled={loading}>{ !loading ? `總結病例` : <Loader2 className="animate-spin" /> }</Button>
      <MarkdownPreviewer source={summary} />
    </div>
  )
}
