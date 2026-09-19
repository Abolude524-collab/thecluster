import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface TabItem<T extends string = string> {
  id: T;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export interface TabsProps<T extends string = string> {
  tabs: TabItem<T>[];
  activeTab: T;
  onChange: (id: T) => void;
  variant?: 'underline' | 'pills';
  className?: string;
}

export function Tabs<T extends string = string>({
  tabs,
  activeTab,
  onChange,
  variant = 'underline',
  className,
}: TabsProps<T>) {
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    }

    if (nextIndex !== index && !tabs[nextIndex].disabled) {
      e.preventDefault();
      onChange(tabs[nextIndex].id);
    }
  };

  return (
    <div
      role="tablist"
      aria-label="Tabs"
      className={twMerge(
        clsx(
          'flex items-center gap-1 overflow-x-auto scrollbar-none',
          variant === 'underline' && 'border-b border-[var(--border-color)]',
          variant === 'pills' && 'p-1 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)]',
          className
        )
      )}
    >
      {tabs.map((tab, idx) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && onChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={clsx(
              'flex items-center gap-2 px-3.5 py-2 text-xs font-semibold font-display transition-all duration-150 rounded-lg whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-electric)] select-none',
              variant === 'underline' &&
                (isActive
                  ? 'text-[var(--text-primary)] border-b-2 border-[var(--accent-electric)] rounded-b-none bg-[var(--accent-electric)]/5'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'),
              variant === 'pills' &&
                (isActive
                  ? 'bg-[var(--accent-electric)] text-white shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'),
              tab.disabled && 'opacity-40 cursor-not-allowed'
            )}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={clsx(
                  'px-1.5 py-0.5 text-[10px] rounded-full font-mono',
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-color)]'
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
