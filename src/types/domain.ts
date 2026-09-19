export type PlatformId = 'youtube' | 'instagram' | 'x';

export type ConnectionState =
  | 'available'
  | 'connecting'
  | 'connected'
  | 'refreshing'
  | 'expired'
  | 'permission_required'
  | 'rate_limited'
  | 'unavailable'
  | 'error'
  | 'disconnected';

export interface ProviderCapabilities {
  audience: boolean;
  views: boolean;
  likes: boolean;
  comments: boolean;
  shares: boolean | null;
  historicalAnalytics: boolean | null;
}

export interface AccountMetrics {
  audience: number | null;
  views: number | null;
  likes: number | null;
  comments: number | null;
  shares?: number | null;
  engagementRate: number | null;
  growthRate?: number | null;
  audienceChange?: number | null;
  viewsChange?: number | null;
  engagementChange?: number | null;
}

export interface PlatformAccount {
  id: string;
  platform: PlatformId;
  platformName: string;
  accountName: string;
  handle: string;
  avatarUrl: string;
  connectionState: ConnectionState;
  connectedAt?: string;
  capabilities: ProviderCapabilities;
  metrics: AccountMetrics;
  lastSyncedAt?: string;
  errorMessage?: string;
}

export interface ContentMetrics {
  views: number | null;
  likes: number | null;
  comments: number | null;
  shares?: number | null;
  engagementRate: number | null;
}

export interface ContentItem {
  id: string;
  platform: PlatformId;
  title: string;
  thumbnailUrl: string;
  publishedAt: string;
  url: string;
  metrics: ContentMetrics;
}

export interface GrowthTimeSeriesPoint {
  date: string;
  youtube?: number;
  instagram?: number;
  x?: number;
  total: number;
}

export interface EngagementTimeSeriesPoint {
  date: string;
  likes: number;
  comments: number;
  shares: number;
  total: number;
}
