import React, { useState } from 'react';
import { User } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy';
  platformIcon?: React.ReactNode;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  name,
  size = 'md',
  status,
  platformIcon,
  className,
  ...props
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeStyles = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  const getInitials = (str?: string) => {
    if (!str) return '';
    const parts = str.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return str.slice(0, 2).toUpperCase();
  };

  const initials = getInitials(name);

  return (
    <div className={twMerge(clsx('relative inline-block shrink-0 select-none', className))} {...props}>
      <div
        className={clsx(
          'rounded-full overflow-hidden flex items-center justify-center font-semibold font-display bg-[var(--bg-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] shadow-xs',
          sizeStyles[size]
        )}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : initials ? (
          <span>{initials}</span>
        ) : (
          <User className="w-1/2 h-1/2 text-[var(--text-secondary)]" />
        )}
      </div>

      {/* Online/Offline Status Indicator */}
      {status && (
        <span
          className={clsx(
            'absolute bottom-0 right-0 rounded-full ring-2 ring-[var(--bg-primary)]',
            size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5',
            status === 'online' && 'bg-[var(--accent-lime)]',
            status === 'offline' && 'bg-[var(--text-secondary)]',
            status === 'busy' && 'bg-[var(--status-error)]'
          )}
        />
      )}

      {/* Platform badge overlay */}
      {platformIcon && (
        <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)]">
          {platformIcon}
        </div>
      )}
    </div>
  );
};
