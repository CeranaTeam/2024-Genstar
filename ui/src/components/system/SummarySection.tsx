import MarkdownPreviewWithLoading from '@/components/ui/markdown-preview-with-loading';

export default function SummarySection() {

  return (
    <div className="border p-2">
      <h1>總結病例</h1>
      <MarkdownPreviewWithLoading source={''} isLoading={true} />
    </div>
  )
}
