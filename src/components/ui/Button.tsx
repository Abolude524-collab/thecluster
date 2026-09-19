import React from 'react';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-electric)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none select-none';

    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        'bg-[var(--accent-electric)] text-white hover:bg-[var(--accent-electric)]/90 active:scale-[0.98] shadow-sm',
      secondary:
        'bg-[var(--accent-lime)] text-[#0B0D10] font-semibold hover:bg-[var(--accent-lime)]/90 active:scale-[0.98]',
      outline:
        'border border-[var(--border-color)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] hover:border-[var(--text-secondary)]/50 active:scale-[0.98]',
      ghost:
        'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] active:scale-[0.98]',
      danger:
        'bg-[var(--status-error)] text-white hover:bg-[var(--status-error)]/90 active:scale-[0.98]',
    };

    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'px-3 py-1.5 text-xs gap-1.5 min-h-[32px]',
      md: 'px-4 py-2 text-sm gap-2 min-h-[40px]',
      lg: 'px-5 py-2.5 text-base gap-2.5 min-h-[48px]',
    };

    const combinedClassName = twMerge(
      clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        className
      )
    );

    return (
      <button
        ref={ref}
        type={type}
        className={combinedClassName}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
