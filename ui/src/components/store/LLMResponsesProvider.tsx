import { createContext, useState } from 'react';

type ResponseInfo = {
  name: string;
  reason: string;
};

export type SymptomContextInfo = {
  index: number;
  response: ResponseInfo[];
};

export type IngredientContextInfo = {
  index: number;
  response: ResponseInfo[];
};

export type LLMResponsesContextType = {
  assessmentsContext: SymptomContextInfo[];
  plansContext: IngredientContextInfo[];
  count: number;
  addSymptomContext: (assessmentContext: SymptomContextInfo) => void;
  updateSymptomContext: (index: number, response: ResponseInfo[]) => void;
  addIngredientContext: (plansContext: IngredientContextInfo) => void;
  updateIngredientContext: (index: number, response: ResponseInfo[]) => void;
};

export const LLMResponsesContext = createContext<LLMResponsesContextType>(
  {
    assessmentsContext: [],
    plansContext: [],
    count: 0,
    addSymptomContext: () => { },
    updateSymptomContext: () => { },
    addIngredientContext: () => { },
    updateIngredientContext: () => { },
  }
)

const LLMResponsesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [assessmentsContext, setSymptomsContext] = useState<SymptomContextInfo[]>([]);
  const [plansContext, setIngredientsContext] = useState<IngredientContextInfo[]>([]);
  const [count, setCount] = useState(0);

  const addSymptomContext = (assessmentContext: SymptomContextInfo) => {
    const insertIndex = assessmentsContext.findIndex((response) => response.index > assessmentContext.index);
    if (insertIndex === -1) {
      setSymptomsContext((prev) => [...prev, assessmentContext]);
    }
    else {
      const newSymptomsContext = [...assessmentsContext];
      newSymptomsContext.splice(insertIndex, 0, assessmentContext);
      setSymptomsContext(() => newSymptomsContext);
    }
    setCount((prevCount) => prevCount + 1)
  };

  const updateSymptomContext = (index: number, response: ResponseInfo[]) => {
    const newSymptomsContext = [...assessmentsContext];
    const indexToUpdate = newSymptomsContext.findIndex((response) => response.index === index);
    newSymptomsContext[indexToUpdate].response = response;
    setSymptomsContext(newSymptomsContext);
  }

  const addIngredientContext = (planContext: IngredientContextInfo) => {
    const insertIndex = plansContext.findIndex((response) => response.index > planContext.index);
    if (insertIndex === -1) {
      setIngredientsContext((prev) => [...prev, planContext]);
    }
    else {
      const newIngredientsContext = [...plansContext];
      newIngredientsContext.splice(insertIndex, 0, planContext);
      setIngredientsContext(() => newIngredientsContext)
    }
  }

  const updateIngredientContext = (index: number, response: ResponseInfo[]) => {
    const newIngredientsContext = [...plansContext];
    const indexToUpdate = newIngredientsContext.findIndex((response) => response.index === index);
    newIngredientsContext[indexToUpdate].response = response;
    setIngredientsContext(newIngredientsContext);
  }

  return (
    <LLMResponsesContext.Provider value={{
      assessmentsContext, plansContext, count,
      addSymptomContext, updateSymptomContext, addIngredientContext, updateIngredientContext
    }} >
      {children}
    </LLMResponsesContext.Provider>
  );
}

export default LLMResponsesProvider;
