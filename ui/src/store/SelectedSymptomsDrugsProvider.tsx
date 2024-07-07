
import { createContext, useState } from 'react';

export type SelectedSymptomDrugsContextType = {
  selectedSymptoms: AutocompleteDiagnosisInfo[];
  selectedDrugs: AutocompleteDrugInfo[];
  selectedDrugsTiming: string[];
  selectedDrugsUsage: string[];
  addSelectedSymptom: (selectedSymptom: AutocompleteDiagnosisInfo) => void;
  addSelectedDrug: (selectedDrug: AutocompleteDrugInfo) => void;
  removeSelectedSymptom: (idx: string) => void;
  removeSelectedDrug: (idx: string) => void;
  setSelectedDrugsTiming: (timing_list: string[]) => void;
  setSelectedDrugsUsage: (usage_list: string[]) => void;
};

export const SelectedSymptomDrugsContext = createContext<SelectedSymptomDrugsContextType>(
  {
    selectedSymptoms: [],
    selectedDrugs: [],
    selectedDrugsTiming: [],
    selectedDrugsUsage: [],
    addSelectedSymptom: () => { },
    addSelectedDrug: () => { },
    removeSelectedSymptom: () => { },
    removeSelectedDrug: () => { },
    setSelectedDrugsTiming: () => { },
    setSelectedDrugsUsage: () => { },
  }
)

export default function SelectedSymptomsDrugsProvider({ children }: { children: React.ReactNode }) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<AutocompleteDiagnosisInfo[]>([]);
  const [selectedDrugs, setSelectedDrugs] = useState<AutocompleteDrugInfo[]>([]);
  const [selectedDrugsTiming, setSelectedDrugsTiming] = useState<string[]>([]);
  const [selectedDrugsUsage, setSelectedDrugsUsage] = useState<string[]>([]);

  const addSelectedSymptom = (selectedSymptom: AutocompleteDiagnosisInfo) => {
    setSelectedSymptoms((prev) => [...prev, selectedSymptom]);
  };

  const addSelectedDrug = (selectedDrug: AutocompleteDrugInfo) => {
    setSelectedDrugs((prev) => [...prev, selectedDrug]);
    setSelectedDrugsTiming((prev) => [...prev, ""]);
    setSelectedDrugsUsage((prev) => [...prev, ""]);
  };

  const removeSelectedSymptom = (idx: string) => {
    const newSelectedSymptoms = selectedSymptoms.filter((_, index) => index !== parseInt(idx));
    setSelectedSymptoms(newSelectedSymptoms);
  };

  const removeSelectedDrug = (idx: string) => {
    const newSelectedDrugs = selectedDrugs.filter((_, index) => index !== parseInt(idx));
    setSelectedDrugs(newSelectedDrugs);
    const newSelectedDrugsTiming = selectedDrugsTiming.filter((_, index) => index !== parseInt(idx));
    setSelectedDrugsTiming(newSelectedDrugsTiming);
    const newSelectedDrugsUsage = selectedDrugsUsage.filter((_, index) => index !== parseInt(idx));
    setSelectedDrugsUsage(newSelectedDrugsUsage);
  };

  // const setSelectedDrugsTiming = (idx: string, timing: string) => {
  //   console.log("setting timing", idx, timing);
  //   const newSelectedDrugsTiming = selectedDrugsTiming;
  //   newSelectedDrugsTiming[parseInt(idx)] = timing;
  //   setSelectedDrugsTiming(newSelectedDrugsTiming);
  // }

  // const setSelectedDrugsUsage = (idx: string, usage: string) => {
  //   const newSelectedDrugsUsage = selectedDrugsUsage;
  //   newSelectedDrugsUsage[parseInt(idx)] = usage;
  //   setSelectedDrugsUsage(newSelectedDrugsUsage);
  // }

  return (
    <SelectedSymptomDrugsContext.Provider value={{
      selectedSymptoms, selectedDrugs, selectedDrugsTiming, selectedDrugsUsage,
      addSelectedSymptom, addSelectedDrug, removeSelectedSymptom, removeSelectedDrug,
      setSelectedDrugsTiming, setSelectedDrugsUsage,
    }}>
      {children}
    </SelectedSymptomDrugsContext.Provider>
  );
}
