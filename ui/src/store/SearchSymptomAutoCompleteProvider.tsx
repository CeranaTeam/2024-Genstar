import { createContext, useState } from 'react';

export type SearchSymptomAutoCompleteContextType = {
  searchSymptom: string;
  setSearchSymptom: ((searchSymptom: string) => void) | null;
};

export const SearchSymptomAutoCompleteContext = createContext<SearchSymptomAutoCompleteContextType>({
  searchSymptom: "" as string,
  setSearchSymptom: null,
});

type searchSearchSymptomAutoCompleteProviderProps = {
  children: React.ReactNode;
};

export default function SearchSearchSymptomAutoCompleteProvider(
  { children }: searchSearchSymptomAutoCompleteProviderProps
) {

  const [searchSymptom, setSearchSymptom] = useState<string>("");

  return (
    <SearchSymptomAutoCompleteContext.Provider value={{ searchSymptom, setSearchSymptom }}>
      {children}
    </SearchSymptomAutoCompleteContext.Provider>
  );
}

