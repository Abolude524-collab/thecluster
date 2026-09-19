import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  className,
  style,
  ...props
}) => {
  const baseStyles =
    'animate-pulse bg-[var(--bg-elevated)]/70 border border-[var(--border-color)]/30';

  const variantStyles = {
    text: 'h-4 rounded-md w-full my-1',
    circular: 'rounded-full shrink-0',
    rectangular: 'rounded-xl',
    card: 'rounded-xl h-36 w-full p-6',
  };

  const inlineStyles: React.CSSProperties = {
    ...style,
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  };

  return (
    <div
      className={twMerge(clsx(baseStyles, variantStyles[variant], className))}
      style={inlineStyles}
      aria-hidden="true"
      {...props}
    />
  );
};
