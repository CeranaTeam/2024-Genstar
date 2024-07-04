import { useEffect, useState } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";

export default function MarkdownPreviewWithLoading({
  source,
  isLoading,
}: {
  source: string;
  isLoading: boolean;
}) {
  const [content, setContent] = useState("");

  useEffect(() => {
    console.log("source", source);
    console.log("isLoading", isLoading);
    setContent("")
  },[source, isLoading])

  return <>
    <div>{content}</div>
    <MarkdownPreview
      source={content}
      style={{ padding: 16 }}
      wrapperElement={{
        "data-color-mode": "light"
      }}
    />
  </>
}
