import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type BadgeVariant =
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral'
  | 'youtube'
  | 'instagram'
  | 'x';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  icon,
  className,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center gap-1.5 font-medium rounded-full select-none shrink-0 tracking-wide font-display';

  const variantStyles: Record<BadgeVariant, string> = {
    success: 'bg-[var(--accent-lime)]/15 text-[var(--accent-lime)] border border-[var(--accent-lime)]/30',
    warning: 'bg-[var(--status-warning)]/15 text-[var(--status-warning)] border border-[var(--status-warning)]/30',
    error: 'bg-[var(--status-error)]/15 text-[var(--status-error)] border border-[var(--status-error)]/30',
    info: 'bg-[var(--accent-electric)]/15 text-[var(--accent-electric)] border border-[var(--accent-electric)]/30',
    neutral: 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-color)]',
    youtube: 'bg-[#FF0000]/15 text-[#FF6666] border border-[#FF0000]/30',
    instagram: 'bg-[#E1306C]/15 text-[#F56040] border border-[#E1306C]/30',
    x: 'bg-[#1DA1F2]/15 text-[#1DA1F2] border border-[#1DA1F2]/30',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
  };

  return (
    <span
      className={twMerge(clsx(baseStyles, variantStyles[variant], sizeStyles[size], className))}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
