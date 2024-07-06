import { createContext, useState } from 'react';

export type SearchSymptomAutoCompleteContextType = {
  searchSymptomText: string;
  setSearchSymptomText: ((searchSymptom: string) => void);
};

export const SearchSymptomAutoCompleteContext = createContext<SearchSymptomAutoCompleteContextType>({
  searchSymptomText: "" as string,
  setSearchSymptomText: () => {},
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
