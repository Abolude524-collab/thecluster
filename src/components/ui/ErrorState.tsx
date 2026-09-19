import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "We couldn't load this data",
  description = "The analytics service didn't respond or encountered a rate limit. Please check your connection and try again.",
  onRetry,
  isRetrying = false,
  className,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-6 sm:p-8 text-center rounded-xl border border-[var(--status-error)]/30 bg-[var(--bg-surface)] ${className || ''}`}
    >
      <div className="w-12 h-12 rounded-xl bg-[var(--status-error)]/10 border border-[var(--status-error)]/20 flex items-center justify-center text-[var(--status-error)] mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-bold font-display text-[var(--text-primary)] tracking-tight">
        {title}
      </h3>
      <p className="text-xs text-[var(--text-secondary)] max-w-sm mt-1 mb-4 leading-relaxed">
        {description}
      </p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          isLoading={isRetrying}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
        >
          Retry
        </Button>
      )}
    </div>
  );
};
