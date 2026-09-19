import { PlatformAccount, PlatformId } from '../types/domain';
import { delay, simulatedFetch } from './api/apiClient';
import { INITIAL_MOCK_INSTAGRAM, INITIAL_MOCK_X, INITIAL_MOCK_YOUTUBE } from './api/mockDatabase';
import { normalizeYouTubeAccount } from './providers/youtube/youtube.normalizer';
import { normalizeInstagramAccount } from './providers/instagram/instagram.normalizer';
import { normalizeXAccount } from './providers/x/x.normalizer';

export interface OAuthPermissions {
  readProfile: boolean;
  readAnalytics: boolean;
  readContent: boolean;
}

export class ConnectionService {
  private connectedAccounts: Map<PlatformId, PlatformAccount>;

  constructor() {
    this.connectedAccounts = new Map<PlatformId, PlatformAccount>([
      ['youtube', normalizeYouTubeAccount(INITIAL_MOCK_YOUTUBE, true)],
      ['instagram', normalizeInstagramAccount(INITIAL_MOCK_INSTAGRAM, true)],
      ['x', normalizeXAccount(INITIAL_MOCK_X, true)],
    ]);
  }

  getConnectedAccounts(): PlatformAccount[] {
    return Array.from(this.connectedAccounts.values());
  }

  isPlatformConnected(platform: PlatformId): boolean {
    const acc = this.connectedAccounts.get(platform);
    return acc ? acc.connectionState === 'connected' : false;
  }

  /**
   * Simulate OAuth authorization code flow
   */
  async simulateOAuthConnect(
    platform: PlatformId,
    _permissions: OAuthPermissions
  ): Promise<PlatformAccount> {
    return simulatedFetch(async () => {
      // Step 1: Simulate OAuth redirect & token exchange latency
      await delay(600);

      let account: PlatformAccount;
      if (platform === 'youtube') {
        account = normalizeYouTubeAccount(INITIAL_MOCK_YOUTUBE, true);
      } else if (platform === 'instagram') {
        account = normalizeInstagramAccount(INITIAL_MOCK_INSTAGRAM, true);
      } else {
        account = normalizeXAccount(INITIAL_MOCK_X, true);
      }

      this.connectedAccounts.set(platform, account);
      return account;
    });
  }

  /**
   * Disconnect a platform account
   */
  async disconnectPlatform(platform: PlatformId): Promise<boolean> {
    return simulatedFetch(() => {
      const acc = this.connectedAccounts.get(platform);
      if (acc) {
        acc.connectionState = 'disconnected';
        this.connectedAccounts.set(platform, acc);
      }
      return true;
    });
  }
}

export const connectionService = new ConnectionService();
