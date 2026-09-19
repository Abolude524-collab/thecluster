import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContentData } from '../../hooks/useContentData';
import { DataTable, Column } from '../../components/ui/DataTable';
import { ContentItem } from '../../types/domain';
import { Badge } from '../../components/ui/Badge';
import { Search } from 'lucide-react';
import { Dropdown } from '../../components/ui/Dropdown';

export const ContentPage: React.FC = () => {
  const { content, isLoading } = useContentData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const navigate = useNavigate();

  const platformOptions = [
    { value: 'all', label: 'All Platforms' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'x', label: 'X (Twitter)' },
  ];

  const filteredContent = useMemo(() => {
    return content.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPlatform =
        selectedPlatform === 'all' || item.platform === selectedPlatform;
      return matchesSearch && matchesPlatform;
    });
  }, [content, searchQuery, selectedPlatform]);

  const columns: Column<ContentItem>[] = [
    {
      key: 'title',
      header: 'Content',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.thumbnailUrl}
            alt={row.title}
            className="w-12 h-12 rounded-lg object-cover border border-[var(--border-color)] shrink-0"
          />
          <div className="min-w-0">
            <h4 className="font-semibold text-xs text-[var(--text-primary)] font-sans line-clamp-1 group-hover:text-[var(--accent-electric)] transition-colors">
              {row.title}
            </h4>
            <span className="text-[10px] text-[var(--text-secondary)] font-mono">
              Published {new Date(row.publishedAt).toLocaleDateString()}
            </span>
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
      key: 'comments',
      header: 'Comments',
      sortable: true,
      align: 'right',
      render: (row) => (
        <span className="font-mono text-[var(--text-primary)]">
          {(row.metrics.comments ?? 0).toLocaleString()}
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
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] font-display">
          Content Library
        </h1>
        <p className="text-xs text-[var(--text-secondary)] mt-1">
          Search, filter, and analyze individual posts and videos across all connected accounts.
        </p>
      </div>

      {/* Search & Platform Filter Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)]">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[var(--text-secondary)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search content by title..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)] transition-colors"
          />
        </div>

        {/* Platform Dropdown */}
        <Dropdown
          options={platformOptions}
          value={selectedPlatform}
          onChange={(val) => setSelectedPlatform(val)}
        />
      </div>

      {/* Content Table */}
      <DataTable
        columns={columns}
        data={filteredContent}
        keyExtractor={(row) => row.id}
        isLoading={isLoading}
        onRowClick={(row) => navigate(`/content/${row.id}`)}
      />
    </div>
  );
};
