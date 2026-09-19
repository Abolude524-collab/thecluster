import { ContentItem, EngagementTimeSeriesPoint, GrowthTimeSeriesPoint, PlatformAccount, PlatformId } from '../types/domain';
import { DateRangePreset } from '../types/filters';
import { YouTubeAdapter } from './providers/youtube/youtube.adapter';
import { InstagramAdapter } from './providers/instagram/instagram.adapter';
import { XAdapter } from './providers/x/x.adapter';
import { ProviderAdapter } from './providers/base.adapter';

export interface DashboardOverviewData {
  accounts: PlatformAccount[];
  failedPlatforms: { platform: PlatformId; message: string }[];
  totals: {
    totalAudience: number;
    totalViews: number;
    totalLikes: number;
    totalComments: number;
    averageEngagementRate: number;
    audienceChangePercent: number;
    viewsChangePercent: number;
    engagementChangePercent: number;
  };
}

export class AnalyticsService {
  private adapters: Map<PlatformId, ProviderAdapter>;

  constructor() {
    this.adapters = new Map<PlatformId, ProviderAdapter>([
      ['youtube', new YouTubeAdapter()],
      ['instagram', new InstagramAdapter()],
      ['x', new XAdapter()],
    ]);
  }

  /**
   * Fetch profiles across all selected platforms with partial failure resiliency.
   */
  async getDashboardOverview(activePlatforms: PlatformId[]): Promise<DashboardOverviewData> {
    const accounts: PlatformAccount[] = [];
    const failedPlatforms: { platform: PlatformId; message: string }[] = [];

    const promises = activePlatforms.map(async (platform) => {
      const adapter = this.adapters.get(platform);
      if (!adapter) return;

      try {
        const account = await adapter.getProfile();
        accounts.push(account);
      } catch (err: any) {
        failedPlatforms.push({
          platform,
          message: err.message || `Failed to fetch data from ${platform}`,
        });
      }
    });

    await Promise.all(promises);

    // Calculate aggregated totals from successfully loaded accounts
    let totalAudience = 0;
    let totalViews = 0;
    let totalLikes = 0;
    let totalComments = 0;
    let engagementSum = 0;
    let validEngagementCount = 0;

    accounts.forEach((acc) => {
      const m = acc.metrics;
      if (m.audience !== null) totalAudience += m.audience;
      if (m.views !== null) totalViews += m.views;
      if (m.likes !== null) totalLikes += m.likes;
      if (m.comments !== null) totalComments += m.comments;
      if (m.engagementRate !== null) {
        engagementSum += m.engagementRate;
        validEngagementCount += 1;
      }
    });

    const averageEngagementRate =
      validEngagementCount > 0 ? parseFloat((engagementSum / validEngagementCount).toFixed(1)) : 0;

    return {
      accounts,
      failedPlatforms,
      totals: {
        totalAudience,
        totalViews,
        totalLikes,
        totalComments,
        averageEngagementRate,
        audienceChangePercent: 8.6,
        viewsChangePercent: 14.2,
        engagementChangePercent: 0.8,
      },
    };
  }

  /**
   * Fetch all content items across active platforms
   */
  async getContentItems(activePlatforms: PlatformId[]): Promise<ContentItem[]> {
    const allContent: ContentItem[] = [];

    const promises = activePlatforms.map(async (platform) => {
      const adapter = this.adapters.get(platform);
      if (!adapter) return;

      try {
        const items = await adapter.getContent();
        allContent.push(...items);
      } catch (err) {
        // Log & proceed to render content from working platforms
        console.warn(`[AnalyticsService] Could not fetch content for ${platform}:`, err);
      }
    });

    await Promise.all(promises);

    // Sort by publish date descending
    return allContent.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  /**
   * Generate time-series historical data points for Growth Line Chart
   */
  generateGrowthTimeSeries(range: DateRangePreset, activePlatforms: PlatformId[]): GrowthTimeSeriesPoint[] {
    const count = range === '7d' ? 7 : range === '90d' ? 90 : range === '12m' ? 12 : 30;
    const points: GrowthTimeSeriesPoint[] = [];

    const baseYouTube = 11500;
    const baseInstagram = 76000;
    const baseX = 18000;

    for (let i = 0; i < count; i++) {
      const dateLabel = range === '12m' ? `Month ${i + 1}` : `Day ${i + 1}`;
      
      const ytVal = activePlatforms.includes('youtube')
        ? Math.round(baseYouTube + i * 30 + Math.sin(i) * 150)
        : 0;
      const igVal = activePlatforms.includes('instagram')
        ? Math.round(baseInstagram + i * 270 + Math.cos(i) * 300)
        : 0;
      const xVal = activePlatforms.includes('x')
        ? Math.round(baseX + i * 25 + Math.sin(i * 0.5) * 80)
        : 0;

      points.push({
        date: dateLabel,
        youtube: activePlatforms.includes('youtube') ? ytVal : undefined,
        instagram: activePlatforms.includes('instagram') ? igVal : undefined,
        x: activePlatforms.includes('x') ? xVal : undefined,
        total: ytVal + igVal + xVal,
      });
    }

    return points;
  }

  /**
   * Generate time-series data for Engagement Overview Chart
   */
  generateEngagementTimeSeries(range: DateRangePreset): EngagementTimeSeriesPoint[] {
    const count = range === '7d' ? 7 : 12;
    const points: EngagementTimeSeriesPoint[] = [];

    for (let i = 0; i < count; i++) {
      const dateLabel = range === '7d' ? `Day ${i + 1}` : `W${i + 1}`;
      const likes = Math.round(3000 + Math.sin(i) * 1200 + i * 150);
      const comments = Math.round(400 + Math.cos(i) * 150 + i * 20);
      const shares = Math.round(250 + Math.sin(i * 1.5) * 80 + i * 10);

      points.push({
        date: dateLabel,
        likes,
        comments,
        shares,
        total: likes + comments + shares,
      });
    }

    return points;
  }
}

export const analyticsService = new AnalyticsService();
