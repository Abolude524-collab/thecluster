import React from 'react';
import { Users, Eye, Activity, TrendingUp, AlertTriangle, ArrowRight, Play } from 'lucide-react';
import { useDashboardData } from '../../hooks/useDashboardData';
import { useContentData } from '../../hooks/useContentData';
import { MetricCard } from './components/MetricCard';
import { GrowthChart } from '../../components/charts/GrowthChart';
import { EngagementChart } from '../../components/charts/EngagementChart';
import { PlatformComparisonCard } from './components/PlatformComparisonCard';
import { useFilters } from '../../context/FilterContext';
import { ErrorState } from '../../components/ui/ErrorState';
import { EmptyState } from '../../components/ui/EmptyState';
import { Badge } from '../../components/ui/Badge';
import { Link } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const { filters } = useFilters();
  const {
    data,
    growthTimeSeries,
    engagementTimeSeries,
    isLoading,
    error,
    refetch,
  } = useDashboardData();

  const { content, isLoading: isContentLoading } = useContentData();

  if (error) {
    return (
      <div className="py-12">
        <ErrorState
          title="Failed to load dashboard overview"
          description={error}
          onRetry={refetch}
        />
      </div>
    );
  }

  const totals = data?.totals;
  const accounts = data?.accounts || [];
  const failedPlatforms = data?.failedPlatforms || [];

  const topRecentContent = content.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] font-display">
            Dashboard Overview
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Aggregated metrics for <span className="font-semibold text-[var(--text-primary)]">{filters.platforms.length} active platforms</span> across <span className="uppercase font-mono font-semibold text-[var(--accent-electric)]">{filters.range}</span>.
          </p>
        </div>
      </div>

      {/* Partial Failure Warning Banner */}
      {failedPlatforms.length > 0 && (
        <div className="p-4 rounded-xl border border-[var(--status-warning)]/40 bg-[var(--status-warning)]/10 text-[var(--text-primary)] flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-[var(--status-warning)] shrink-0" />
            <span>
              <strong>Partial Data Notice:</strong> Could not load analytics for{' '}
              <span className="font-semibold capitalize font-mono">
                {failedPlatforms.map((f) => f.platform).join(', ')}
              </span>
              . Remaining signals are displayed below.
            </span>
          </div>
          <button
            onClick={refetch}
            className="px-2.5 py-1 text-xs font-semibold rounded-md bg-[var(--status-warning)]/20 hover:bg-[var(--status-warning)]/30 text-[var(--text-primary)] transition-colors shrink-0"
          >
            Retry Failed
          </button>
        </div>
      )}

      {/* Zero Connections Empty State */}
      {!isLoading && accounts.length === 0 && failedPlatforms.length === 0 && (
        <EmptyState
          title="Your Cluster is Empty"
          description="Connect a social media platform to start aggregating audience, views, and content metrics."
          actionLabel="Connect Platforms"
          onAction={() => (window.location.href = '/connections')}
        />
      )}

      {/* 1. KPI Cards Row (4 Grid Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Audience"
          value={totals?.totalAudience !== undefined ? (totals.totalAudience >= 1000 ? `${(totals.totalAudience / 1000).toFixed(1)}K` : totals.totalAudience) : null}
          change={totals?.audienceChangePercent}
          icon={<Users className="w-4 h-4" />}
          isLoading={isLoading}
        />
        <MetricCard
          label="Total Views"
          value={totals?.totalViews !== undefined ? (totals.totalViews >= 1000 ? `${(totals.totalViews / 1000).toFixed(1)}K` : totals.totalViews) : null}
          change={totals?.viewsChangePercent}
          icon={<Eye className="w-4 h-4" />}
          isLoading={isLoading}
        />
        <MetricCard
          label="Avg. Engagement"
          value={totals?.averageEngagementRate !== undefined ? `${totals.averageEngagementRate}%` : null}
          change={totals?.engagementChangePercent}
          icon={<Activity className="w-4 h-4" />}
          isLoading={isLoading}
        />
        <MetricCard
          label="Growth Rate"
          value="+8.6%"
          change={8.6}
          icon={<TrendingUp className="w-4 h-4" />}
          isLoading={isLoading}
        />
      </div>

      {/* 2. Main Analytics Charts Grid (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GrowthChart
          dataPoints={growthTimeSeries}
          activePlatforms={filters.platforms}
          isLoading={isLoading}
        />
        <EngagementChart
          dataPoints={engagementTimeSeries}
          isLoading={isLoading}
        />
      </div>

      {/* 3. Bottom Grid: Platform Comparison & Recent Content Snippet */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Platform Breakdown */}
        <div className="lg:col-span-1">
          <PlatformComparisonCard accounts={accounts} isLoading={isLoading} />
        </div>

        {/* Column 2 & 3: Recent Content Performance Snippet */}
        <div className="lg:col-span-2 p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold font-display text-[var(--text-primary)]">
                  Top Recent Content
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Latest posts & video performance signals
                </p>
              </div>

              <Link
                to="/content"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent-electric)] hover:underline"
              >
                <span>View all content</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Snippet List */}
            <div className="space-y-3">
              {isContentLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-14 bg-[var(--bg-elevated)] rounded-lg animate-pulse" />
                  ))
                : topRecentContent.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-elevated)]/40 flex items-center justify-between gap-3 hover:border-[var(--accent-electric)]/40 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-[var(--border-color)] relative">
                          <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <Play className="w-3 h-3 text-white fill-white" />
                          </div>
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-semibold text-[var(--text-primary)] truncate font-sans">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <Badge variant={item.platform} size="sm">
                              {item.platform}
                            </Badge>
                            <span className="text-[10px] text-[var(--text-secondary)]">
                              {new Date(item.publishedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-xs font-bold font-mono text-[var(--text-primary)]">
                          {(item.metrics.views ?? 0).toLocaleString()} views
                        </div>
                        <div className="text-[10px] text-[var(--accent-lime)] font-mono">
                          {item.metrics.engagementRate}% eng.
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
