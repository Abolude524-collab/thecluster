import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContentData } from '../../hooks/useContentData';
import { Badge } from '../../components/ui/Badge';
import { MetricCard } from '../dashboard/components/MetricCard';
import { ArrowLeft, ExternalLink, Eye, ThumbsUp, MessageSquare, Activity, Calendar } from 'lucide-react';
import { GrowthChart } from '../../components/charts/GrowthChart';
import { Skeleton } from '../../components/ui/Skeleton';
import { Button } from '../../components/ui/Button';

export const ContentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { content, isLoading } = useContentData();

  const item = content.find((c) => c.id === id) || content[0];

  if (isLoading || !item) {
    return (
      <div className="space-y-6">
        <Skeleton variant="text" width={120} height={20} />
        <Skeleton variant="rectangular" height={200} className="w-full" />
      </div>
    );
  }

  const mockPerformancePoints = [
    { date: 'Day 1', total: Math.round((item.metrics.views || 1000) * 0.2) },
    { date: 'Day 2', total: Math.round((item.metrics.views || 1000) * 0.45) },
    { date: 'Day 3', total: Math.round((item.metrics.views || 1000) * 0.75) },
    { date: 'Day 4', total: item.metrics.views || 1000 },
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        to="/content"
        className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-electric)] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Content Library</span>
      </Link>

      {/* Title & Metadata Hero Card */}
      <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <img
            src={item.thumbnailUrl}
            alt={item.title}
            className="w-24 h-24 rounded-xl object-cover border border-[var(--border-color)] shrink-0 shadow-sm"
          />
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant={item.platform} size="md">
                {item.platform}
              </Badge>
              <span className="text-xs text-[var(--text-secondary)] flex items-center gap-1 font-mono">
                <Calendar className="w-3.5 h-3.5" />
                Published {new Date(item.publishedAt).toLocaleDateString()}
              </span>
            </div>
            <h1 className="text-xl font-bold font-display text-[var(--text-primary)] tracking-tight">
              {item.title}
            </h1>
            <p className="text-xs text-[var(--text-secondary)] font-mono">
              Canonical URL: {item.url}
            </p>
          </div>
        </div>

        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0"
        >
          <Button variant="outline" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
            View Original Post
          </Button>
        </a>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Views"
          value={(item.metrics.views ?? 0).toLocaleString()}
          change={12.4}
          icon={<Eye className="w-4 h-4" />}
        />
        <MetricCard
          label="Likes"
          value={(item.metrics.likes ?? 0).toLocaleString()}
          change={5.2}
          icon={<ThumbsUp className="w-4 h-4" />}
        />
        <MetricCard
          label="Comments"
          value={(item.metrics.comments ?? 0).toLocaleString()}
          change={2.1}
          icon={<MessageSquare className="w-4 h-4" />}
        />
        <MetricCard
          label="Engagement Rate"
          value={`${item.metrics.engagementRate}%`}
          change={0.6}
          icon={<Activity className="w-4 h-4" />}
        />
      </div>

      {/* Performance Trajectory */}
      <GrowthChart
        dataPoints={mockPerformancePoints}
        activePlatforms={[item.platform]}
      />
    </div>
  );
};
