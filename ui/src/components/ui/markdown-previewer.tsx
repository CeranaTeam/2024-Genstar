import MarkdownPreview from "@uiw/react-markdown-preview";

export default function MarkdownPreviewer({
  source,
}: {
  source: string;
}) {
  return <>
    <MarkdownPreview
      source={source}
      style={{ padding: 16 }}
      wrapperElement={{
        "data-color-mode": "light"
      }}
    />
  </>
}
