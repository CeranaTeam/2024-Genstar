import { useContext } from 'react';
import { SearchSymptomAutoCompleteContext } from '@/store/SearchSymptomAutoCompleteProvider';

export function useSearchSymptom() {
  const { searchSymptomText, setSearchSymptomText } = useContext(SearchSymptomAutoCompleteContext);
  return { searchSymptomText, setSearchSymptomText}
}
