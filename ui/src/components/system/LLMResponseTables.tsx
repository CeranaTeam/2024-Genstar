import { useState, useContext, useEffect } from "react";
// import SymptomTable from "./llm-response-table/SymptomTable";
import SymptomBadge from "./llm-response-table/SymptomBadge";
// import IngredientTable from "./llm-response-table/IngredientTable";
import IngredientBadge from "./llm-response-table/IngredientBadge";
import { LLMResponsesContext } from "@/store/LLMResponsesProvider";


import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import SelectedSymptomsTable from "./selected-table/SymptomsTable";
import SelectedDrugsTable from "./selected-table/DrugsTable";
import SearchSymptomAutoCompleteProvider from "@/store/SearchSymptomAutoCompleteProvider";

function LLMResponseTables() {
  const { count } = useContext(LLMResponsesContext);
  const [symptomIndex, setSymptomIndex] = useState<number>(count);
  const [index, setIndex] = useState<number>(count);

  useEffect(() => {
    setSymptomIndex(() => count)
    setIndex(() => count)
  }, [count])

  return (
    <>
      <SearchSymptomAutoCompleteProvider>
        <div className="border p-2 mb-4">
          <div>
            {/* choose you display section */}
            {/* <SymptomTable index={symptomIndex !== 0 ? symptomIndex - 1 : 0} /> */}
            <SymptomBadge index={symptomIndex !== 0 ? symptomIndex - 1 : 0} />
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => setSymptomIndex(() => Math.max(0, symptomIndex - 1))} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>{symptomIndex === 0 ? 1 : symptomIndex} / {count === 0 ? 1 : count}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext onClick={() => setSymptomIndex(() => Math.min(count, symptomIndex + 1))} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <div>
            <SelectedSymptomsTable />
          </div>
        </div>
      </SearchSymptomAutoCompleteProvider>
      <div className="border p-2 mb-4">
        <div>
          {/* <IngredientTable index={index !== 0 ? index - 1 : 0} /> */}
          <IngredientBadge index={index !== 0 ? index - 1 : 0} />
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
        <div>
          <SelectedDrugsTable />
        </div>
      </div>
    </>
  );
}

export default LLMResponseTables;
