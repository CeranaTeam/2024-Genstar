import { useState, useContext, useEffect } from "react";
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
import SelectedSymptomsDrugsProvider from "../store/SelectedSymptomDrugsProvider";
import SelectedSymptomsTable from "./selected-table/SymptomsTable";
import SelectedDrugsTable from "./selected-table/DrugsTable";

function LLMResponseTables() {
  const { count } = useContext(LLMResponsesContext);
  const [index, setIndex] = useState<number>(count);

  useEffect(() => {
    setIndex(() => count)
  }, [count])

  return (
    <SelectedSymptomsDrugsProvider>
    <div className="border p-2 mb-4">
      <div>
        <SymptomTable index={index !== 0 ? index-1 : 0} />
      </div>
      <div>
        <SelectedSymptomsTable />
      </div>
      <div>
        <IngredientTable index={index !== 0 ? index -1 : 0} />
      </div>
      <div>
        <SelectedDrugsTable />
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => setIndex(() => Math.max(0, index - 1))} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>{index === 0 ? 1 : index} / {count === 0 ? 1 : count}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={() => setIndex(() => Math.min(count, index + 1))} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
    </SelectedSymptomsDrugsProvider>
  );
}

export default LLMResponseTables;