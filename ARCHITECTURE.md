# The Cluster — System Architecture & Data Flow

This document details the layered software architecture, provider adapter pattern, normalization rules, and state management strategies implemented in **The Cluster**.

---

## 🏗️ Layered Architecture Pattern

The application strictly enforces a clear separation of concerns across six layers:

```text
┌───────────────────────────────────────────────────────────┐
│                      React UI Layer                       │
│    (DashboardPage, AnalyticsPage, ContentPage, AppShell)  │
└─────────────────────────────┬─────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────┐
│                   Custom Feature Hooks                    │
│             (useDashboardData, useContentData)            │
└─────────────────────────────┬─────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────┐
│                      Service Layer                        │
│            (analyticsService, connectionService)          │
└─────────────────────────────┬─────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────┐
│                    API Client Layer                       │
│      (apiClient with 400-1200ms latency & failure simulation) │
└─────────────────────────────┬─────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────┐
│             Provider Adapters & Normalizers               │
│       (YouTubeAdapter, InstagramAdapter, XAdapter)       │
└─────────────────────────────┬─────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────┐
│             Provider Payload / Backend APIs               │
│    (Raw YouTube Data API, Instagram Graph, X API v2)     │
└───────────────────────────────────────────────────────────┘
```

---

## 🔌 Provider Adapter Contract

Each social platform adapter implements a unified conceptual interface:

```typescript
export interface ProviderAdapter {
  platform: PlatformId;
  getProfile(): Promise<PlatformAccount>;
  getCapabilities(): ProviderCapabilities;
  getOverview(): Promise<AccountMetrics>;
  getContent(): Promise<ContentItem[]>;
  disconnect(): Promise<boolean>;
}
```

### Normalization Rules

- **YouTube**:
  - `subscriberCount` → `audience`
  - `viewCount` → `views`
  - `shares`: Explicitly `null` (known unsupported on basic API).

- **Instagram**:
  - `followers_count` → `audience`
  - `impressions_count` → `views`
  - `shares`: Explicitly `null` (unsupported by basic Instagram Graph API).

- **X (Twitter)**:
  - `followers_count` → `audience`
  - `total_retweets_received` → `shares`

---

## 🛡️ Resiliency & Partial Failure Handling

When fetching metrics across multiple social accounts, `AnalyticsService` executes provider fetches independently using `Promise.all`:

```typescript
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
      failedPlatforms.push({ platform, message: err.message });
    }
  });

  await Promise.all(promises);
  return { accounts, failedPlatforms, totals: ... };
}
```

If one provider throws an exception or rate-limit error, the dashboard catches the exception, logs a partial failure notice, and continues rendering metrics from all functional platforms.

---

## 🔐 OAuth Authorization Simulation

1. **User Action**: Click "Connect Platform" on the Connections page.
2. **Modal Trigger**: `OAuthSimulatorModal` opens displaying requested scopes and a simulation banner.
3. **Authorization**: User clicks "Allow Access & Connect".
4. **Token Exchange Simulation**: `connectionService.simulateOAuthConnect()` simulates a 600ms latency code exchange, updates account connection state, and notifies the UI via `ToastContext`.
