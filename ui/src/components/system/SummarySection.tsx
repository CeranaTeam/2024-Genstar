import MarkdownPreviewWithLoading from '@/components/ui/markdown-preview-with-loading';

export default function SummarySection() {

  return (
    <div>
      <div>Summary</div>
      <MarkdownPreviewWithLoading source={''} isLoading={true} />
    </div>
  )
}
