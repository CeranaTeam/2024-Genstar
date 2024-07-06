import { useState, useContext, useEffect } from "react";
// import SymptomTable from "./llm-response-table/SymptomTable";
import SymptomBadge from "./llm-response-table/SymptomBadge";
// import IngredientTable from "./llm-response-table/IngredientTable";
import IngredientBadge from "./llm-response-table/IngredientBadge";
import { LLMResponsesContext } from "@/store/LLMResponsesProvider";
import DrugSearcher from "@/components/system/selected-table/DrugSearcher";
import SelectedSymptomsTable from "./selected-table/SymptomsTable";
import SelectedDrugsTable from "./selected-table/DrugsTable";
import SearchSymptomAutoCompleteProvider from "@/store/SearchSymptomAutoCompleteProvider";
import SymptomSearcher from "./selected-table/SymptomSearcher";
//import ResponsePagniation from "./llm-response-table/ResponsePagniation";

function LLMResponseTables() {
  const { count } = useContext(LLMResponsesContext);
  const [symptomIndex, setSymptomIndex] = useState<number>(count);
  const [ingredientIndex, setIngredientIndex] = useState<number>(count);

  useEffect(() => {
    setSymptomIndex(() => count)
    setIngredientIndex(() => count)
  }, [count])

  return (
    <>
      <SearchSymptomAutoCompleteProvider>
        <div className="border p-2 mb-4 rounded">
          <div className="mb-4">
            <h2 className="text-xl">可能症狀</h2>
            <SymptomSearcher />
            {/* choose you display section */}
            {/* <SymptomTable index={symptomIndex !== 0 ? symptomIndex - 1 : 0} /> */}
                
            <SymptomBadge index={symptomIndex !== 0 ? symptomIndex - 1 : 0} />
          </div>
          {/*<ResponsePagniation page={symptomIndex} maxPage={count} setPage={setSymptomIndex} />*/}
          <div>
            <SelectedSymptomsTable />
          </div>
        </div>
      </SearchSymptomAutoCompleteProvider>
      <div className="border p-2 mb-4 rounded">
        <div className="mb-4">
          <h2 className="text-xl">推薦使用成分</h2>
          <div className="max-w-72">
            <DrugSearcher  />
          </div>
          <div>
            {/* <IngredientTable index={index !== 0 ? index - 1 : 0} /> */}
            <IngredientBadge index={ingredientIndex !== 0 ? ingredientIndex - 1 : 0} />
          </div>
        </div>
        {/*<ResponsePagniation page={ingredientIndex} maxPage={count} setPage={setIngredientIndex} />*/}
        <div>
          <SelectedDrugsTable />
        </div>
      </div>
    </>
  );
}

export default LLMResponseTables;
