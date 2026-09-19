import React from 'react';
import { Calendar, RefreshCw } from 'lucide-react';
import { useFilters } from '../../context/FilterContext';
import { DateRangePreset } from '../../types/filters';
import { PlatformId } from '../../types/domain';
import { clsx } from 'clsx';

const DATE_RANGE_OPTIONS: { value: DateRangePreset; label: string }[] = [
  { value: 'today', label: 'Today' },
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: '12m', label: 'Last 12 months' },
];

const PLATFORM_OPTIONS: { id: PlatformId; label: string; color: string }[] = [
  { id: 'youtube', label: 'YouTube', color: '#FF0000' },
  { id: 'instagram', label: 'Instagram', color: '#E1306C' },
  { id: 'x', label: 'X', color: '#1DA1F2' },
];

interface HeaderFilterControlsProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export const HeaderFilterControls: React.FC<HeaderFilterControlsProps> = ({
  onRefresh,
  isRefreshing = false,
}) => {
  const { filters, setDateRange, togglePlatform, selectAllPlatforms } = useFilters();

  const isAllPlatformsSelected = filters.platforms.length === 3;

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      {/* Platform Filter Buttons */}
      <div className="flex items-center gap-1 p-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)]">
        <button
          onClick={selectAllPlatforms}
          className={clsx(
            'px-2.5 py-1 text-xs font-medium font-display rounded-md transition-all',
            isAllPlatformsSelected
              ? 'bg-[var(--accent-electric)] text-white shadow-xs'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          )}
        >
          All
        </button>
        {PLATFORM_OPTIONS.map((p) => {
          const isSelected = filters.platforms.includes(p.id);
          return (
            <button
              key={p.id}
              onClick={() => togglePlatform(p.id)}
              className={clsx(
                'px-2.5 py-1 text-xs font-medium font-display rounded-md transition-all flex items-center gap-1.5',
                isSelected
                  ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-color)] shadow-xs'
                  : 'text-[var(--text-secondary)] opacity-60 hover:opacity-100'
              )}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: p.color }}
              />
              <span className="hidden sm:inline">{p.label}</span>
            </button>
          );
        })}
      </div>

      {/* Date Range Selector */}
      <div className="relative inline-flex items-center">
        <Calendar className="w-3.5 h-3.5 text-[var(--text-secondary)] absolute left-3 pointer-events-none" />
        <select
          value={filters.range}
          onChange={(e) => setDateRange(e.target.value as DateRangePreset)}
          className="pl-8 pr-7 py-1.5 text-xs font-medium font-display rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)] hover:border-[var(--text-secondary)]/40 transition-colors"
          aria-label="Select date range"
        >
          {DATE_RANGE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[var(--bg-surface)] text-[var(--text-primary)]">
              {opt.label}
            </option>
          ))}
        </select>
        <span className="absolute right-2.5 pointer-events-none text-[var(--text-secondary)] text-[10px]">▼</span>
      </div>

      {/* Manual Refresh Button */}
      {onRefresh && (
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="p-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)] disabled:opacity-50"
          title="Refresh analytics data"
          aria-label="Refresh analytics data"
        >
          <RefreshCw className={clsx('w-3.5 h-3.5', isRefreshing && 'animate-spin text-[var(--accent-electric)]')} />
        </button>
      )}
    </div>
  );
};
