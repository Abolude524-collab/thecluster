import { AccountMetrics, ContentItem, PlatformAccount, PlatformId, ProviderCapabilities } from '../../../types/domain';
import { ApiError, simConfig, simulatedFetch } from '../../api/apiClient';
import { INITIAL_MOCK_X, MOCK_CONTENT_ITEMS } from '../../api/mockDatabase';
import { ProviderAdapter } from '../base.adapter';
import { normalizeXAccount, normalizeXContentItem, X_CAPABILITIES } from './x.normalizer';

export class XAdapter implements ProviderAdapter {
  readonly platform: PlatformId = 'x';
  private isConnected = true;

  getCapabilities(): ProviderCapabilities {
    return X_CAPABILITIES;
  }

  async getProfile(): Promise<PlatformAccount> {
    return simulatedFetch(() => {
      if (simConfig.forceFailPlatform === 'x') {
        throw new ApiError('X API rate limit encountered. Try again shortly.', 429, 'RATE_LIMITED');
      }
      return normalizeXAccount(INITIAL_MOCK_X, this.isConnected);
    });
  }

  async getOverview(): Promise<AccountMetrics> {
    const profile = await this.getProfile();
    return profile.metrics;
  }

  async getContent(): Promise<ContentItem[]> {
    return simulatedFetch(() => {
      if (simConfig.forceFailPlatform === 'x') {
        throw new ApiError('X endpoint temporarily unavailable under current access level.', 503, 'SERVER_ERROR');
      }
      return MOCK_CONTENT_ITEMS.filter((item) => item.platform === 'x').map(
        normalizeXContentItem
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
