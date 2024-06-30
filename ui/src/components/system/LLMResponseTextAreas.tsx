import React, { useState } from "react";
import AssessmentTextArea from "./llm-textarea/AssessmentTextArea";
import PlanTextArea from "./llm-textarea/PlanTextArea";


import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"



function LLMResponseTextAreas() {
  const [index, setIndex] = useState<number>(0);
  const [lastIndex, setLastIndex] = useState<number>(3);
  return (
    <div className="border p-2 mb-4">
      <AssessmentTextArea index={index} />
      <PlanTextArea index={index} />
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => setIndex(() => Math.max(0, index - 1))} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>{index + 1} / {lastIndex}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={() => setIndex(() => Math.min(lastIndex, index + 1))} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default LLMResponseTextAreas;
