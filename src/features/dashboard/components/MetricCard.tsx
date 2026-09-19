import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Skeleton } from '../../../components/ui/Skeleton';
import { clsx } from 'clsx';

export interface MetricCardProps {
  label: string;
  value: string | number | null;
  change?: number | null;
  comparisonPeriod?: string;
  icon: React.ReactNode;
  isLoading?: boolean;
  sparklineData?: number[];
  helpText?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  change,
  comparisonPeriod = 'vs previous period',
  icon,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton variant="text" width={100} height={16} />
          <Skeleton variant="circular" width={32} height={32} />
        </div>
        <Skeleton variant="text" width={140} height={36} />
        <Skeleton variant="text" width={120} height={14} />
      </div>
    );
  }

  const isPositive = change !== undefined && change !== null && change > 0;
  const isNegative = change !== undefined && change !== null && change < 0;

  const formattedValue =
    value === null || value === undefined
      ? '—'
      : typeof value === 'number'
      ? value.toLocaleString()
      : value;

  return (
    <div className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--accent-electric)]/40 transition-all duration-200 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider font-display text-[var(--text-secondary)]">
          <span>{label}</span>
          <div className="w-8 h-8 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-electric)]">
            {icon}
          </div>
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-bold font-display tracking-tight text-[var(--text-primary)] tabular-nums">
            {formattedValue}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[var(--border-color)]/50 flex items-center justify-between text-xs">
        {change !== undefined && change !== null ? (
          <div
            className={clsx(
              'inline-flex items-center gap-1 font-semibold font-mono px-2 py-0.5 rounded-full',
              isPositive && 'bg-[var(--accent-lime)]/15 text-[var(--accent-lime)]',
              isNegative && 'bg-[var(--status-error)]/15 text-[var(--status-error)]',
              !isPositive && !isNegative && 'bg-[var(--bg-elevated)] text-[var(--text-secondary)]'
            )}
          >
            {isPositive && <TrendingUp className="w-3.5 h-3.5" />}
            {isNegative && <TrendingDown className="w-3.5 h-3.5" />}
            {!isPositive && !isNegative && <Minus className="w-3.5 h-3.5" />}
            <span>
              {isPositive ? '+' : ''}
              {change}%
            </span>
          </div>
        ) : (
          <span className="text-[var(--text-secondary)] text-[11px]">No trend baseline</span>
        )}

        <span className="text-[11px] text-[var(--text-secondary)] truncate">{comparisonPeriod}</span>
      </div>
    </div>
  );
};
