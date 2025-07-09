import type { AnimalType } from 'pages/Announcement/types';
import { createContext, useContext, useState } from 'react';

export interface FilterFormValues {
  animalType: AnimalType | undefined;
  gender: string;
  breed: string;
  location: string;
  age: string;
  size: string;
  sortByDate?: 'newest' | 'oldest';
}

type FiltersContextType = {
  filtersParams: Partial<FilterFormValues>;
  setFiltersParams: React.Dispatch<
    React.SetStateAction<Partial<FilterFormValues>>
  >;
};

const FiltersContext = createContext<FiltersContextType | null>(null);

export const FiltersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [filtersParams, setFiltersParams] = useState<Partial<FilterFormValues>>(
    {}
  );

  const contextValue: FiltersContextType = {
    filtersParams,
    setFiltersParams,
  };

  return (
    <FiltersContext.Provider value={contextValue}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFilters must be used within FiltersProvider');
  }
  return context;
};
