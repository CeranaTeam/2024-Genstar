import { createContext, useState } from 'react';

export type SearchSymptomAutoCompleteContextType = {
  searchSymptomText: string;
  setSearchSymptomText: ((searchSymptom: string) => void) | undefined;
};

export const SearchSymptomAutoCompleteContext = createContext<SearchSymptomAutoCompleteContextType>({
  searchSymptomText: "" as string,
  setSearchSymptomText: undefined,
});

type searchSearchSymptomAutoCompleteProviderProps = {
  children: React.ReactNode;
};

export default function SearchSearchSymptomAutoCompleteProvider(
  { children }: searchSearchSymptomAutoCompleteProviderProps
) {

  const [searchSymptom, setSearchSymptom] = useState<string>("");

  return (
    <SearchSymptomAutoCompleteContext.Provider value={{ searchSymptomText: searchSymptom, setSearchSymptomText: setSearchSymptom }}>
      {children}
    </SearchSymptomAutoCompleteContext.Provider>
  );
}
