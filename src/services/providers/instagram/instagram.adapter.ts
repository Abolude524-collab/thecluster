import { AccountMetrics, ContentItem, PlatformAccount, PlatformId, ProviderCapabilities } from '../../../types/domain';
import { ApiError, simConfig, simulatedFetch } from '../../api/apiClient';
import { INITIAL_MOCK_INSTAGRAM, MOCK_CONTENT_ITEMS } from '../../api/mockDatabase';
import { ProviderAdapter } from '../base.adapter';
import { INSTAGRAM_CAPABILITIES, normalizeInstagramAccount, normalizeInstagramContentItem } from './instagram.normalizer';

export class InstagramAdapter implements ProviderAdapter {
  readonly platform: PlatformId = 'instagram';
  private isConnected = true;

  getCapabilities(): ProviderCapabilities {
    return INSTAGRAM_CAPABILITIES;
  }

  async getProfile(): Promise<PlatformAccount> {
    return simulatedFetch(() => {
      if (simConfig.forceFailPlatform === 'instagram') {
        throw new ApiError('Instagram session expired. Please re-authenticate.', 401, 'UNAUTHORIZED');
      }
      return normalizeInstagramAccount(INITIAL_MOCK_INSTAGRAM, this.isConnected);
    });
  }

  async getOverview(): Promise<AccountMetrics> {
    const profile = await this.getProfile();
    return profile.metrics;
  }

  async getContent(): Promise<ContentItem[]> {
    return simulatedFetch(() => {
      if (simConfig.forceFailPlatform === 'instagram') {
        throw new ApiError('Instagram analytics service unavailable.', 503, 'SERVER_ERROR');
      }
      return MOCK_CONTENT_ITEMS.filter((item) => item.platform === 'instagram').map(
        normalizeInstagramContentItem
      );
    });
  }

  async disconnect(): Promise<boolean> {
    return simulatedFetch(() => {
      this.isConnected = false;
      return true;
    });
  }
}
