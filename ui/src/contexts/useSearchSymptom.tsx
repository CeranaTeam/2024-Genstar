import { useContext } from 'react';
import { SearchSymptomAutoCompleteContext } from '@/store/SearchSymptomAutoCompleteProvider';

export function useSearchSymptom() {
  const { searchSymptom, setSearchSymptom } = useContext(SearchSymptomAutoCompleteContext);
  return { searchSymptom, setSearchSymptom}
}