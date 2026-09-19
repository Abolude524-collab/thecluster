import { ContentItem, PlatformAccount, ProviderCapabilities } from '../../../types/domain';
import { RawInstagramBusinessAccount, RawProviderContent } from '../../api/mockDatabase';

export const INSTAGRAM_CAPABILITIES: ProviderCapabilities = {
  audience: true,
  views: true,
  likes: true,
  comments: true,
  shares: null, // Basic Instagram Graph API does not expose post shares -> represented as null!
  historicalAnalytics: true,
};

export function normalizeInstagramAccount(
  raw: RawInstagramBusinessAccount,
  isConnected = true
): PlatformAccount {
  const audience = raw.followers_count;
  const views = raw.impressions_count;
  const likes = raw.likes_count;
  const comments = raw.comments_count;

  // Engagement calculation: (likes + comments) / impressions * 100
  const engagementRate = views > 0 ? parseFloat((((likes + comments) / views) * 100).toFixed(1)) : 0;

  return {
    id: raw.id,
    platform: 'instagram',
    platformName: 'Instagram',
    accountName: raw.name,
    handle: `@${raw.username}`,
    avatarUrl: raw.profile_picture_url,
    connectionState: isConnected ? 'connected' : 'disconnected',
    connectedAt: '2026-09-02T14:20:00Z',
    capabilities: INSTAGRAM_CAPABILITIES,
    metrics: {
      audience,
      views,
      likes,
      comments,
      shares: null, // Unsupported metric represented as null!
      engagementRate,
      growthRate: 11.4,
      audienceChange: 8600,
      viewsChange: 180000,
      engagementChange: 1.2,
    },
    lastSyncedAt: new Date().toISOString(),
  };
}

export function normalizeInstagramContentItem(raw: RawProviderContent): ContentItem {
  const views = raw.rawMetrics.views ?? 0;
  const likes = raw.rawMetrics.likes ?? 0;
  const comments = raw.rawMetrics.comments ?? 0;
  const engagementRate = views > 0 ? parseFloat((((likes + comments) / views) * 100).toFixed(1)) : 0;

  return {
    id: raw.id,
    platform: 'instagram',
    title: raw.title,
    thumbnailUrl: raw.thumbnailUrl,
    publishedAt: raw.publishedAt,
    url: raw.url,
    metrics: {
      views,
      likes,
      comments,
      shares: null,
      engagementRate,
    },
  };
}
