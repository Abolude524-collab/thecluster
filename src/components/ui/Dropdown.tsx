import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface DropdownOption<T extends string = string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface DropdownProps<T extends string = string> {
  options: DropdownOption<T>[];
  value?: T;
  onChange: (value: T) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  align?: 'left' | 'right';
}

export function Dropdown<T extends string = string>({
  options,
  value,
  onChange,
  placeholder = 'Select option',
  label,
  disabled = false,
  className,
  align = 'left',
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      if (!isOpen) {
        e.preventDefault();
        setIsOpen(true);
      }
    }
  };

  return (
    <div className={twMerge(clsx('relative inline-block text-left w-full sm:w-auto', className))} ref={dropdownRef}>
      {label && (
        <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5 font-display">
          {label}
        </label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={clsx(
          'w-full sm:w-auto inline-flex items-center justify-between gap-2 px-3 py-2 text-xs font-medium rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-all hover:bg-[var(--bg-elevated)] hover:border-[var(--text-secondary)]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-electric)] disabled:opacity-50 disabled:cursor-not-allowed shadow-xs',
          isOpen && 'border-[var(--accent-electric)]'
        )}
      >
        <span className="flex items-center gap-2 truncate">
          {selectedOption?.icon}
          <span>{selectedOption ? selectedOption.label : placeholder}</span>
        </span>
        <ChevronDown
          className={clsx(
            'w-4 h-4 text-[var(--text-secondary)] shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180 text-[var(--accent-electric)]'
          )}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className={clsx(
            'absolute z-50 mt-1 min-w-[180px] w-full rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] shadow-xl py-1 focus:outline-none animate-in fade-in-50 zoom-in-95 duration-100',
            align === 'right' ? 'right-0' : 'left-0'
          )}
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                disabled={option.disabled}
                onClick={() => {
                  if (!option.disabled) {
                    onChange(option.value);
                    setIsOpen(false);
                  }
                }}
                className={clsx(
                  'w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left transition-colors font-sans focus:outline-none focus:bg-[var(--accent-electric)]/10',
                  isSelected
                    ? 'text-[var(--accent-electric)] bg-[var(--accent-electric)]/10 font-semibold'
                    : 'text-[var(--text-primary)] hover:bg-[var(--bg-surface)]',
                  option.disabled && 'opacity-40 cursor-not-allowed'
                )}
              >
                <span className="flex items-center gap-2 truncate">
                  {option.icon}
                  <span>{option.label}</span>
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[var(--accent-electric)] shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
