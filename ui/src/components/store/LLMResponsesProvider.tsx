import { createContext, useState } from 'react';

export type ResponseReasonInfo = {
  name: string;
  reason: string;
};

export type SymptomContextInfo = {
  index: number;
  response: ResponseReasonInfo[];
};

export type IngredientContextInfo = {
  index: number;
  response: ResponseReasonInfo[];
};

export type LLMResponsesContextType = {
  symptomsContext: SymptomContextInfo[];
  ingredientsContext: IngredientContextInfo[];
  count: number;
  addSymptomContext: (symptomContext: SymptomContextInfo) => void;
  updateSymptomContext: (index: number, response: ResponseReasonInfo[]) => void;
  addIngredientContext: (ingredientsContext: IngredientContextInfo) => void;
  updateIngredientContext: (index: number, response: ResponseReasonInfo[]) => void;
};

export const LLMResponsesContext = createContext<LLMResponsesContextType>(
  {
    symptomsContext: [],
    ingredientsContext: [],
    count: 0,
    addSymptomContext: () => { },
    updateSymptomContext: () => { },
    addIngredientContext: () => { },
    updateIngredientContext: () => { },
  }
)

const LLMResponsesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [symptomsContext, setSymptomsContext] = useState<SymptomContextInfo[]>([]);
  const [ingredientsContext, setIngredientsContext] = useState<IngredientContextInfo[]>([]);
  const [count, setCount] = useState(0);

  const addSymptomContext = (symptomContext: SymptomContextInfo) => {
    const insertIndex = symptomsContext.findIndex((response) => response.index > symptomContext.index);
    if (insertIndex === -1) {
      setSymptomsContext((prev) => [...prev, symptomContext]);
    }
    else {
      const newSymptomsContext = [...symptomsContext];
      newSymptomsContext.splice(insertIndex, 0, symptomContext);
      setSymptomsContext(() => newSymptomsContext);
    }
    setCount((prevCount) => prevCount + 1)
  };

  const updateSymptomContext = (index: number, response: ResponseReasonInfo[]) => {
    const newSymptomsContext = [...symptomsContext];
    const indexToUpdate = newSymptomsContext.findIndex((response) => response.index === index);
    newSymptomsContext[indexToUpdate].response = response;
    setSymptomsContext(newSymptomsContext);
  }

  const addIngredientContext = (ingredientContext: IngredientContextInfo) => {
    const insertIndex = ingredientsContext.findIndex((response) => response.index > ingredientContext.index);
    if (insertIndex === -1) {
      setIngredientsContext((prev) => [...prev, ingredientContext]);
    }
    else {
      const newIngredientsContext = [...ingredientsContext];
      newIngredientsContext.splice(insertIndex, 0, ingredientContext);
      setIngredientsContext(() => newIngredientsContext)
    }
  }

  const updateIngredientContext = (index: number, response: ResponseReasonInfo[]) => {
    const newIngredientsContext = [...ingredientsContext];
    const indexToUpdate = newIngredientsContext.findIndex((response) => response.index === index);
    newIngredientsContext[indexToUpdate].response = response;
    setIngredientsContext(newIngredientsContext);
  }

  return (
    <LLMResponsesContext.Provider value={{
      symptomsContext, ingredientsContext, count,
      addSymptomContext, updateSymptomContext, addIngredientContext, updateIngredientContext
    }} >
      {children}
    </LLMResponsesContext.Provider>
  );
}

export default LLMResponsesProvider;
