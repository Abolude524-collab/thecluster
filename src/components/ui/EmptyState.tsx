import React from 'react';
import { Radio } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Your cluster is empty',
  description = 'Connect a social platform or adjust your date filters to start viewing analytics.',
  icon,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] ${className || ''}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-electric)] mb-4 shadow-sm">
        {icon || <Radio className="w-7 h-7" />}
      </div>
      <h3 className="text-base font-bold font-display text-[var(--text-primary)] tracking-tight">
        {title}
      </h3>
      <p className="text-xs text-[var(--text-secondary)] max-w-sm mt-1 mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
