import { ContentItem, PlatformAccount, ProviderCapabilities } from '../../../types/domain';
import { RawProviderContent, RawXUserAccount } from '../../api/mockDatabase';

export const X_CAPABILITIES: ProviderCapabilities = {
  audience: true,
  views: true,
  likes: true,
  comments: true, // Replies
  shares: true, // Retweets
  historicalAnalytics: null, // Dependent on X API v2 plan access
};

export function normalizeXAccount(raw: RawXUserAccount, isConnected = true): PlatformAccount {
  const audience = raw.public_metrics.followers_count;
  const likes = raw.public_metrics.total_likes_received;
  const comments = raw.public_metrics.total_replies_received;
  const shares = raw.public_metrics.total_retweets_received;
  // Estimated impressions/views derived from tweet activity ratio
  const views = audience * 14;

  const engagementRate = views > 0 ? parseFloat((((likes + comments + shares) / views) * 100).toFixed(1)) : 0;

  return {
    id: raw.id,
    platform: 'x',
    platformName: 'X',
    accountName: raw.name,
    handle: `@${raw.username}`,
    avatarUrl: raw.profile_image_url,
    connectionState: isConnected ? 'connected' : 'disconnected',
    connectedAt: '2026-09-03T16:00:00Z',
    capabilities: X_CAPABILITIES,
    metrics: {
      audience,
      views,
      likes,
      comments,
      shares,
      engagementRate,
      growthRate: 2.1,
      audienceChange: 380,
      viewsChange: 12400,
      engagementChange: 0.2,
    },
    lastSyncedAt: new Date().toISOString(),
  };
}

export function normalizeXContentItem(raw: RawProviderContent): ContentItem {
  const views = raw.rawMetrics.views ?? 0;
  const likes = raw.rawMetrics.likes ?? 0;
  const comments = raw.rawMetrics.comments ?? 0;
  const shares = raw.rawMetrics.retweets ?? 0;
  const engagementRate = views > 0 ? parseFloat((((likes + comments + shares) / views) * 100).toFixed(1)) : 0;

  return {
    id: raw.id,
    platform: 'x',
    title: raw.title,
    thumbnailUrl: raw.thumbnailUrl,
    publishedAt: raw.publishedAt,
    url: raw.url,
    metrics: {
      views,
      likes,
      comments,
      shares,
      engagementRate,
    },
  };
}
