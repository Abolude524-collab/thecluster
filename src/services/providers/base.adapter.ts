import { AccountMetrics, ContentItem, PlatformAccount, PlatformId, ProviderCapabilities } from '../../types/domain';

export interface ProviderAdapter {
  platform: PlatformId;
  getProfile(): Promise<PlatformAccount>;
  getCapabilities(): ProviderCapabilities;
  getOverview(): Promise<AccountMetrics>;
  getContent(): Promise<ContentItem[]>;
  disconnect(): Promise<boolean>;
}
