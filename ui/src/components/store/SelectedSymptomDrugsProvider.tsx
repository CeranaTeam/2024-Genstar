
import { createContext, useState } from 'react';

export type SelectedSymptomDrugsContextType = {
  selectedSysmptoms: AutocompleteDiagnosisInfo[];
  selectedDrugs: AutocompleteDrugInfo[];
  addSelectedSymptom: (selectedSymptom: AutocompleteDiagnosisInfo) => void;
  addSelectedDrug: (selectedDrug: AutocompleteDrugInfo) => void;
  removeSelectedSymptom: (idx: string) => void;
  removeSelectedDrug: (idx: string) => void;
};

export const SelectedSymptomDrugsContext = createContext<SelectedSymptomDrugsContextType>(
  {
    selectedSysmptoms: [],
    selectedDrugs: [],
    addSelectedSymptom: () => { },
    addSelectedDrug: () => { },
    removeSelectedSymptom: () => { },
    removeSelectedDrug: () => { },
  }
)

function SelectedSymptomDrugsProvider({ children }: { children: React.ReactNode }) {
  const [selectedSysmptoms, setSelectedSymptoms] = useState<AutocompleteDiagnosisInfo[]>([]);
  const [selectedDrugs, setSelectedDrugs] = useState<AutocompleteDrugInfo[]>([]);

  const addSelectedSymptom = (selectedSymptom: AutocompleteDiagnosisInfo) => {
    setSelectedSymptoms((prev) => [...prev, selectedSymptom]);
  };

  const addSelectedDrug = (selectedDrug: AutocompleteDrugInfo) => {
    setSelectedDrugs((prev) => [...prev, selectedDrug]);
  };

  const removeSelectedSymptom = (idx: string) => {
    const newSelectedSymptoms = selectedSysmptoms.filter((_, index) => index !== parseInt(idx));
    setSelectedSymptoms(newSelectedSymptoms);
  };

  const removeSelectedDrug = (idx: string) => {
    const newSelectedDrugs = selectedDrugs.filter((_, index) => index !== parseInt(idx));
    setSelectedDrugs(newSelectedDrugs);
  };

  return (
    <SelectedSymptomDrugsContext.Provider value={{
      selectedSysmptoms, selectedDrugs,
      addSelectedSymptom, addSelectedDrug, removeSelectedSymptom, removeSelectedDrug
    }}>
      {children}
    </SelectedSymptomDrugsContext.Provider>
  );
}

export default SelectedSymptomDrugsProvider;