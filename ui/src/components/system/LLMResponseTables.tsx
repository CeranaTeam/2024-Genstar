import { useState, useContext } from "react";
import SymptomTable from "./llm-response-table/SymptomTable";
import IngredientTable from "./llm-response-table/IngredientTable";
import { LLMResponsesContext } from "@/components/store/LLMResponsesProvider";


import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

function LLMResponseTables() {
  const [index, setIndex] = useState<number>(0);
  const { count } = useContext(LLMResponsesContext);
  return (
    <div className="border p-2 mb-4">
      <div>
        <SymptomTable index={index} />
      </div>
      <div>
        <IngredientTable index={index} />
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => setIndex(() => Math.max(0, index - 1))} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>{index + 1} / {count === 0 ? count + 1 : count}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={() => setIndex(() => Math.min(count - 1, index + 1))} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default LLMResponseTables;