import { createContext, useState } from 'react';

type ResponseInfo = {
  name: string;
  reason: string;
};

export type AssessmentContextInfo = {
  index: number;
  response: ResponseInfo[];
};

export type PlanContextInfo = {
  index: number;
  response: ResponseInfo[];
};

export type LLMResponsesContextType = {
  assessmentsContext: AssessmentContextInfo[];
  plansContext: PlanContextInfo[];
  count: number;
  addAssessmentContext: (assessmentContext: AssessmentContextInfo) => void;
  updateAssessmentContext: (index: number, response: ResponseInfo[]) => void;
  addPlanContext: (plansContext: PlanContextInfo) => void;
  updatePlanContext: (index: number, response: ResponseInfo[]) => void;
};

export const LLMResponsesContext = createContext<LLMResponsesContextType>(
  {
    assessmentsContext: [],
    plansContext: [],
    count: 0,
    addAssessmentContext: () => { },
    updateAssessmentContext: () => { },
    addPlanContext: () => { },
    updatePlanContext: () => { },
  }
)

const LLMResponsesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [assessmentsContext, setAssessmentsContext] = useState<AssessmentContextInfo[]>([]);
  const [plansContext, setPlansContext] = useState<PlanContextInfo[]>([]);
  const [count, setCount] = useState(0);

  const addAssessmentContext = (assessmentContext: AssessmentContextInfo) => {
    const insertIndex = assessmentsContext.findIndex((response) => response.index > assessmentContext.index);
    if (insertIndex === -1) {
      setAssessmentsContext((prev) => [...prev, assessmentContext]);
    }
    else {
      const newAssessmentsContext = [...assessmentsContext];
      newAssessmentsContext.splice(insertIndex, 0, assessmentContext);
      setAssessmentsContext(() => newAssessmentsContext);
    }
    setCount((prevCount) => prevCount + 1)
  };

  const updateAssessmentContext = (index: number, response: ResponseInfo[]) => {
    const newAssessmentsContext = [...assessmentsContext];
    const indexToUpdate = newAssessmentsContext.findIndex((response) => response.index === index);
    newAssessmentsContext[indexToUpdate].response = response;
    setAssessmentsContext(newAssessmentsContext);
  }

  const addPlanContext = (planContext: PlanContextInfo) => {
    const insertIndex = plansContext.findIndex((response) => response.index > planContext.index);
    if (insertIndex === -1) {
      setPlansContext((prev) => [...prev, planContext]);
    }
    else {
      const newPlansContext = [...plansContext];
      newPlansContext.splice(insertIndex, 0, planContext);
      setPlansContext(() => newPlansContext)
    }
  }

  const updatePlanContext = (index: number, response: ResponseInfo[]) => {
    const newPlansContext = [...plansContext];
    const indexToUpdate = newPlansContext.findIndex((response) => response.index === index);
    newPlansContext[indexToUpdate].response = response;
    setPlansContext(newPlansContext);
  }

  return (
    <LLMResponsesContext.Provider value={{
      assessmentsContext, plansContext, count,
      addAssessmentContext, updateAssessmentContext, addPlanContext, updatePlanContext
    }} >
      {children}
    </LLMResponsesContext.Provider>
  );
}

export default LLMResponsesProvider;
