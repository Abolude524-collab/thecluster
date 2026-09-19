import React from 'react';
import { PlatformAccount } from '../../../types/domain';
import { Badge } from '../../../components/ui/Badge';
import { Skeleton } from '../../../components/ui/Skeleton';
import { TrendingUp, Youtube, Instagram, Twitter } from 'lucide-react';

export interface PlatformComparisonProps {
  accounts: PlatformAccount[];
  isLoading?: boolean;
}

export const PlatformComparisonCard: React.FC<PlatformComparisonProps> = ({
  accounts,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4">
        <Skeleton variant="text" width={160} height={24} />
        <div className="space-y-3">
          <Skeleton variant="rectangular" height={60} className="w-full" />
          <Skeleton variant="rectangular" height={60} className="w-full" />
          <Skeleton variant="rectangular" height={60} className="w-full" />
        </div>
      </div>
    );
  }

  const getPlatformIcon = (platform: string) => {
    if (platform === 'youtube') return <Youtube className="w-4 h-4 text-[#FF0000]" />;
    if (platform === 'instagram') return <Instagram className="w-4 h-4 text-[#E1306C]" />;
    return <Twitter className="w-4 h-4 text-[#1DA1F2]" />;
  };

  const getMetricLabel = (platform: string) => {
    if (platform === 'youtube') return 'subscribers';
    return 'followers';
  };

  return (
    <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] flex flex-col justify-between">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold font-display text-[var(--text-primary)]">
            Platform Breakdown
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Normalized metrics by platform
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {accounts.map((acc) => {
          const audience = acc.metrics.audience ?? 0;
          const growth = acc.metrics.growthRate ?? 0;
          return (
            <div
              key={acc.id}
              className="p-3.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-elevated)]/60 flex items-center justify-between transition-colors hover:border-[var(--accent-electric)]/40"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)]">
                  {getPlatformIcon(acc.platform)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-display text-[var(--text-primary)]">
                      {acc.platformName}
                    </span>
                    <Badge variant={acc.platform} size="sm">
                      {acc.handle}
                    </Badge>
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] mt-0.5 font-mono">
                    <strong className="text-[var(--text-primary)]">{audience.toLocaleString()}</strong>{' '}
                    {getMetricLabel(acc.platform)}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="inline-flex items-center gap-1 text-xs font-semibold font-mono text-[var(--accent-lime)]">
                  <TrendingUp className="w-3 h-3" />
                  <span>+{growth}%</span>
                </div>
                <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">Growth</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
