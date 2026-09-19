import { AccountMetrics, ContentItem, PlatformAccount, PlatformId, ProviderCapabilities } from '../../../types/domain';
import { ApiError, simConfig, simulatedFetch } from '../../api/apiClient';
import { INITIAL_MOCK_YOUTUBE, MOCK_CONTENT_ITEMS } from '../../api/mockDatabase';
import { ProviderAdapter } from '../base.adapter';
import { normalizeYouTubeAccount, normalizeYouTubeContentItem, YOUTUBE_CAPABILITIES } from './youtube.normalizer';

export class YouTubeAdapter implements ProviderAdapter {
  readonly platform: PlatformId = 'youtube';
  private isConnected = true;

  getCapabilities(): ProviderCapabilities {
    return YOUTUBE_CAPABILITIES;
  }

  async getProfile(): Promise<PlatformAccount> {
    return simulatedFetch(() => {
      if (simConfig.forceFailPlatform === 'youtube') {
        throw new ApiError('YouTube API rate limit exceeded.', 429, 'RATE_LIMITED');
      }
      return normalizeYouTubeAccount(INITIAL_MOCK_YOUTUBE, this.isConnected);
    });
  }

  async getOverview(): Promise<AccountMetrics> {
    const profile = await this.getProfile();
    return profile.metrics;
  }

  async getContent(): Promise<ContentItem[]> {
    return simulatedFetch(() => {
      if (simConfig.forceFailPlatform === 'youtube') {
        throw new ApiError('Failed to fetch YouTube videos.', 500, 'SERVER_ERROR');
      }
      return MOCK_CONTENT_ITEMS.filter((item) => item.platform === 'youtube').map(
        normalizeYouTubeContentItem
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
