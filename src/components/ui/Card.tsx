import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outline';
  isHoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'default', isHoverable = false, className, ...props }, ref) => {
    const baseStyles =
      'rounded-xl border transition-all duration-200 overflow-hidden';

    const variantStyles = {
      default: 'bg-[var(--bg-surface)] border-[var(--border-color)]',
      elevated: 'bg-[var(--bg-elevated)] border-[var(--border-color)] shadow-sm',
      outline: 'bg-transparent border-[var(--border-color)]',
    };

    const hoverStyles = isHoverable
      ? 'hover:border-[var(--accent-electric)]/50 hover:shadow-md transition-border cursor-pointer'
      : '';

    return (
      <div
        ref={ref}
        className={twMerge(clsx(baseStyles, variantStyles[variant], hoverStyles, className))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={twMerge(clsx('p-6 pb-3 space-y-1', className))} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => (
  <h3 className={twMerge(clsx('text-lg font-semibold font-display text-[var(--text-primary)] tracking-tight', className))} {...props}>
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => (
  <p className={twMerge(clsx('text-xs text-[var(--text-secondary)]', className))} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={twMerge(clsx('p-6 pt-0', className))} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={twMerge(clsx('p-6 pt-0 flex items-center border-t border-[var(--border-color)]/50 mt-4', className))} {...props}>
    {children}
  </div>
);
