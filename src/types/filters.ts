import { PlatformId } from './domain';

export type DateRangePreset = 'today' | '7d' | '30d' | '90d' | '12m' | 'custom';

export interface GlobalFilterState {
  range: DateRangePreset;
  startDate: string | null;
  endDate: string | null;
  platforms: PlatformId[];
}

export interface FilterContextType {
  filters: GlobalFilterState;
  setDateRange: (range: DateRangePreset, customDates?: { startDate: string; endDate: string }) => void;
  togglePlatform: (platform: PlatformId) => void;
  selectAllPlatforms: () => void;
  resetFilters: () => void;
}
