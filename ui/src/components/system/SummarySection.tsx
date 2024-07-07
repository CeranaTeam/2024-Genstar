import { useState, useMemo, useContext } from 'react'
import { Button } from '@/components/ui/button'
import MarkdownPreviewer from '@/components/ui/markdown-previewer';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { SelectedSymptomDrugsContext } from '@/store/SelectedSymptomsDrugsProvider'
import { Loader2, TextIcon, FilePenLine } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const useSummary = (): { summary: string, setSummary: (context: string) => void, loading: boolean, error: string, generate: (context: string) => void } => {
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

  return { summary, setSummary, loading, error, generate: generateSummary }
}

export default function SummarySection() {
  const { selectedSymptoms, selectedDrugs, selectedDrugsTiming, selectedDrugsUsage } = useContext(SelectedSymptomDrugsContext);
  
  const stringOfAll = useMemo(() => {
  // make both selectedSymptoms and selectedDrugs to string context for summary
    console.log(selectedSymptoms)
    console.log(selectedDrugs)
    console.log(selectedDrugsTiming)
    console.log(selectedDrugsUsage)
    const selectedSymptomsString = selectedSymptoms.map((symptom) => symptom.english_name ).join(', ')
    const selectedDrugsString = selectedDrugs.map((drug, idx) => `${drug.name} ${selectedDrugsUsage[idx]} ${selectedDrugsTiming[idx]}`).join(', ')
    const res = `# 紀錄:\n ${localStorage.getItem('diagnosis')}\n\n# 症狀:\n ${selectedSymptomsString}\n\n# 藥物:\n ${selectedDrugsString}`
    console.log(res)
    return res
  }, [selectedSymptoms, selectedDrugs, selectedDrugsTiming, selectedDrugsUsage])

  const { summary, setSummary, loading, generate } = useSummary()
  document.documentElement.setAttribute('data-color-mode', 'light')

  return (
    <div className="border p-2 rounded">
      <div className="grid gap-4 grid-cols-2">
        <Button onClick={() => generate(stringOfAll)} disabled={loading}><TextIcon className="w-4 h-4 mr-2" />{ !loading ? `總結病例` : <Loader2 className="animate-spin" /> }</Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline"><FilePenLine className="w-4 h-4 mr-2" />編輯</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
            Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <MarkdownEditor 
              className="w-[750px]"
              height="600px"
              value={summary}
              onChange={setSummary}
            />
          </DialogContent>
        </Dialog>
      </div>
      <MarkdownPreviewer source={summary} />
    </div>
  )
}
