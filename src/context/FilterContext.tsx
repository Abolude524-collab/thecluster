import React, { createContext, useContext, useState } from 'react';
import { DateRangePreset, FilterContextType, GlobalFilterState } from '../types/filters';
import { PlatformId } from '../types/domain';

const DEFAULT_FILTERS: GlobalFilterState = {
  range: '30d',
  startDate: null,
  endDate: null,
  platforms: ['youtube', 'instagram', 'x'],
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<GlobalFilterState>(DEFAULT_FILTERS);

  const setDateRange = (range: DateRangePreset, customDates?: { startDate: string; endDate: string }) => {
    setFilters((prev) => ({
      ...prev,
      range,
      startDate: customDates ? customDates.startDate : null,
      endDate: customDates ? customDates.endDate : null,
    }));
  };

  const togglePlatform = (platform: PlatformId) => {
    setFilters((prev) => {
      const isSelected = prev.platforms.includes(platform);
      // Ensure at least one platform remains selected
      if (isSelected && prev.platforms.length === 1) {
        return prev;
      }
      const updatedPlatforms = isSelected
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform];

      return {
        ...prev,
        platforms: updatedPlatforms,
      };
    });
  };

  const selectAllPlatforms = () => {
    setFilters((prev) => ({
      ...prev,
      platforms: ['youtube', 'instagram', 'x'],
    }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        setDateRange,
        togglePlatform,
        selectAllPlatforms,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};
