import { useState, useEffect, useCallback } from 'react';
import { useFilters } from '../context/FilterContext';
import { analyticsService, DashboardOverviewData } from '../services/analyticsService';
import { GrowthTimeSeriesPoint, EngagementTimeSeriesPoint } from '../types/domain';

export function useDashboardData() {
  const { filters } = useFilters();
  const [data, setData] = useState<DashboardOverviewData | null>(null);
  const [growthTimeSeries, setGrowthTimeSeries] = useState<GrowthTimeSeriesPoint[]>([]);
  const [engagementTimeSeries, setEngagementTimeSeries] = useState<EngagementTimeSeriesPoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (isManualRefresh = false) => {
      if (isManualRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      setError(null);

      try {
        const overview = await analyticsService.getDashboardOverview(filters.platforms);
        const growth = analyticsService.generateGrowthTimeSeries(filters.range, filters.platforms);
        const engagement = analyticsService.generateEngagementTimeSeries(filters.range);

        setData(overview);
        setGrowthTimeSeries(growth);
        setEngagementTimeSeries(engagement);
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard data.');
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [filters.platforms, filters.range]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => fetchData(true);

  return {
    data,
    growthTimeSeries,
    engagementTimeSeries,
    isLoading,
    isRefreshing,
    error,
    refetch,
  };
}
