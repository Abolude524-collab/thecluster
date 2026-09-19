import { describe, it, expect } from 'vitest';
import { analyticsService } from '../analyticsService';
import { simConfig } from '../api/apiClient';

describe('AnalyticsService & Provider Normalizers', () => {
  it('fetches and normalizes dashboard overview data across YouTube, Instagram, and X', async () => {
    const data = await analyticsService.getDashboardOverview(['youtube', 'instagram', 'x']);

    expect(data.accounts.length).toBe(3);
    expect(data.failedPlatforms.length).toBe(0);

    const youtubeAcc = data.accounts.find((a) => a.platform === 'youtube');
    const instagramAcc = data.accounts.find((a) => a.platform === 'instagram');
    const xAcc = data.accounts.find((a) => a.platform === 'x');

    expect(youtubeAcc?.metrics.audience).toBe(12400);
    expect(instagramAcc?.metrics.audience).toBe(84200);
    expect(xAcc?.metrics.audience).toBe(18800);

    // Verify capability boundaries: Instagram shares is explicitly null!
    expect(instagramAcc?.metrics.shares).toBeNull();

    // Verify aggregate total audience calculation
    expect(data.totals.totalAudience).toBe(12400 + 84200 + 18800);
  });

  it('handles partial platform failures gracefully without taking down the entire dashboard', async () => {
    // Simulate controlled Instagram API failure
    simConfig.forceFailPlatform = 'instagram';

    const data = await analyticsService.getDashboardOverview(['youtube', 'instagram', 'x']);

    // Reset control switch
    simConfig.forceFailPlatform = null;

    expect(data.accounts.length).toBe(2); // YouTube & X loaded
    expect(data.failedPlatforms.length).toBe(1);
    expect(data.failedPlatforms[0].platform).toBe('instagram');

    // YouTube and X data still available!
    const youtubeAcc = data.accounts.find((a) => a.platform === 'youtube');
    expect(youtubeAcc).toBeDefined();
  });

  it('generates growth time series data for requested date range', () => {
    const series7d = analyticsService.generateGrowthTimeSeries('7d', ['youtube', 'instagram', 'x']);
    expect(series7d.length).toBe(7);

    const series30d = analyticsService.generateGrowthTimeSeries('30d', ['youtube']);
    expect(series30d.length).toBe(30);
    expect(series30d[0].youtube).toBeGreaterThan(0);
    expect(series30d[0].instagram).toBeUndefined();
  });
});
