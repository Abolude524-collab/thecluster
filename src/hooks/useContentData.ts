import { useState, useEffect, useCallback } from 'react';
import { useFilters } from '../context/FilterContext';
import { analyticsService } from '../services/analyticsService';
import { ContentItem } from '../types/domain';

export function useContentData() {
  const { filters } = useFilters();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const items = await analyticsService.getContentItems(filters.platforms);
      setContent(items);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch content data.');
    } finally {
      setIsLoading(false);
    }
  }, [filters.platforms]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return {
    content,
    isLoading,
    error,
    refetch: fetchContent,
  };
}
