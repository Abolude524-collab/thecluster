import React, { useState } from 'react';
import { Tabs } from '../../components/ui/Tabs';
import { useDashboardData } from '../../hooks/useDashboardData';
import { useContentData } from '../../hooks/useContentData';
import { useFilters } from '../../context/FilterContext';
import { GrowthChart } from '../../components/charts/GrowthChart';
import { EngagementChart } from '../../components/charts/EngagementChart';
import { PlatformComparisonCard } from '../dashboard/components/PlatformComparisonCard';
import { DataTable, Column } from '../../components/ui/DataTable';
import { ContentItem } from '../../types/domain';
import { Badge } from '../../components/ui/Badge';
import { Calculator, Info } from 'lucide-react';

type AnalyticsTab = 'overview' | 'audience' | 'engagement' | 'content';

export const AnalyticsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AnalyticsTab>('overview');
  const { filters } = useFilters();
  const { data, growthTimeSeries, engagementTimeSeries, isLoading } = useDashboardData();
  const { content, isLoading: isContentLoading } = useContentData();

  const tabsList: { id: AnalyticsTab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'audience', label: 'Audience & Growth' },
    { id: 'engagement', label: 'Engagement Analytics' },
    { id: 'content', label: 'Content Performance' },
  ];

  const contentColumns: Column<ContentItem>[] = [
    {
      key: 'title',
      header: 'Content Item',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.thumbnailUrl}
            alt={row.title}
            className="w-10 h-10 rounded-lg object-cover border border-[var(--border-color)] shrink-0"
          />
          <div>
            <div className="font-semibold text-xs text-[var(--text-primary)] font-sans line-clamp-1">
              {row.title}
            </div>
            <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">
              Published {new Date(row.publishedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'platform',
      header: 'Platform',
      sortable: true,
      render: (row) => (
        <Badge variant={row.platform} size="sm">
          {row.platform}
        </Badge>
      ),
    },
    {
      key: 'views',
      header: 'Views',
      sortable: true,
      align: 'right',
      render: (row) => (
        <span className="font-mono font-semibold text-[var(--text-primary)]">
          {(row.metrics.views ?? 0).toLocaleString()}
        </span>
      ),
    },
    {
      key: 'likes',
      header: 'Likes',
      sortable: true,
      align: 'right',
      render: (row) => (
        <span className="font-mono text-[var(--text-primary)]">
          {(row.metrics.likes ?? 0).toLocaleString()}
        </span>
      ),
    },
    {
      key: 'engagementRate',
      header: 'Engagement Rate',
      sortable: true,
      align: 'right',
      render: (row) => (
        <span className="font-mono font-semibold text-[var(--accent-lime)]">
          {row.metrics.engagementRate}%
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] font-display">
            Analytics Deep-Dive
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Detailed performance breakdown, time-series metrics, and reach analysis.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={tabsList}
        activeTab={activeTab}
        onChange={(id) => setActiveTab(id as AnalyticsTab)}
        variant="pills"
      />

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GrowthChart dataPoints={growthTimeSeries} activePlatforms={filters.platforms} isLoading={isLoading} />
            <EngagementChart dataPoints={engagementTimeSeries} isLoading={isLoading} />
          </div>

          <PlatformComparisonCard accounts={data?.accounts || []} isLoading={isLoading} />
        </div>
      )}

      {/* Tab 2: Audience & Growth */}
      {activeTab === 'audience' && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <GrowthChart dataPoints={growthTimeSeries} activePlatforms={filters.platforms} isLoading={isLoading} />

          {/* Metric Calculation Explanation Box */}
          <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold font-display text-[var(--accent-electric)]">
              <Calculator className="w-4 h-4" />
              <span>Growth Rate Calculation Definition</span>
            </div>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Growth Rate is calculated as{' '}
              <code className="px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] font-mono text-[var(--text-primary)]">
                ((Current Period Audience - Previous Period Audience) / Previous Period Audience) × 100
              </code>
              . Cross-platform totals adjust automatically based on provider availability.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Engagement Analytics */}
      {activeTab === 'engagement' && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <EngagementChart dataPoints={engagementTimeSeries} isLoading={isLoading} />

          {/* Engagement Rate Formula Explanation */}
          <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold font-display text-[var(--accent-lime)]">
              <Info className="w-4 h-4" />
              <span>Engagement Rate Denominator Notice</span>
            </div>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Engagement rate uses reachable impressions or video views as its primary denominator:{' '}
              <code className="px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] font-mono text-[var(--text-primary)]">
                ((Likes + Comments + Retweets) / Total Views) × 100
              </code>
              . Unsupported platform metrics (such as Instagram shares) are preserved as <code className="text-[var(--status-warning)] font-mono">null</code> rather than fabricated.
            </p>
          </div>
        </div>
      )}

      {/* Tab 4: Content Performance Table */}
      {activeTab === 'content' && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <DataTable
            columns={contentColumns}
            data={content}
            keyExtractor={(row) => row.id}
            isLoading={isContentLoading}
          />
        </div>
      )}
    </div>
  );
};
