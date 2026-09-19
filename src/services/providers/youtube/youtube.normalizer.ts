import { ContentItem, PlatformAccount, ProviderCapabilities } from '../../../types/domain';
import { RawProviderContent, RawYouTubeChannel } from '../../api/mockDatabase';

export const YOUTUBE_CAPABILITIES: ProviderCapabilities = {
  audience: true,
  views: true,
  likes: true,
  comments: true,
  shares: false, // Known unsupported by YouTube basic API
  historicalAnalytics: true,
};

export function normalizeYouTubeAccount(raw: RawYouTubeChannel, isConnected = true): PlatformAccount {
  const views = parseInt(raw.statistics.viewCount, 10);
  const audience = parseInt(raw.statistics.subscriberCount, 10);
  const likes = parseInt(raw.statistics.likeCount, 10);
  const comments = parseInt(raw.statistics.commentCount, 10);

  // Derived engagement rate calculation: (likes + comments) / views * 100
  const engagementRate = views > 0 ? parseFloat((((likes + comments) / views) * 100).toFixed(1)) : 0;

  return {
    id: raw.id,
    platform: 'youtube',
    platformName: 'YouTube',
    accountName: raw.snippet.title,
    handle: raw.snippet.customUrl,
    avatarUrl: raw.snippet.thumbnails.default.url,
    connectionState: isConnected ? 'connected' : 'disconnected',
    connectedAt: '2026-09-01T10:00:00Z',
    capabilities: YOUTUBE_CAPABILITIES,
    metrics: {
      audience,
      views,
      likes,
      comments,
      shares: null, // Unsupported metric explicitly null!
      engagementRate,
      growthRate: 4.2,
      audienceChange: 520,
      viewsChange: 42000,
      engagementChange: 0.4,
    },
    lastSyncedAt: new Date().toISOString(),
  };
}

export function normalizeYouTubeContentItem(raw: RawProviderContent): ContentItem {
  const views = raw.rawMetrics.views ?? 0;
  const likes = raw.rawMetrics.likes ?? 0;
  const comments = raw.rawMetrics.comments ?? 0;
  const engagementRate = views > 0 ? parseFloat((((likes + comments) / views) * 100).toFixed(1)) : 0;

  return {
    id: raw.id,
    platform: 'youtube',
    title: raw.title,
    thumbnailUrl: raw.thumbnailUrl,
    publishedAt: raw.publishedAt,
    url: raw.url,
    metrics: {
      views,
      likes,
      comments,
      shares: null, // Unsupported explicitly null
      engagementRate,
    },
  };
}
