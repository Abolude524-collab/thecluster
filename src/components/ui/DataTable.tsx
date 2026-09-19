import React, { useState, useMemo } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { Skeleton } from './Skeleton';
import { EmptyState } from './EmptyState';

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  isLoading?: boolean;
  pageSize?: number;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
  onRowClick?: (row: T) => void;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  pageSize = 10,
  emptyTitle,
  emptyDescription,
  className,
  onRowClick,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDirection === 'desc') {
        setSortDirection('asc');
      } else {
        setSortKey(null);
        setSortDirection('desc');
      }
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];

      if (valA === null || valA === undefined) return 1;
      if (valB === null || valB === undefined) return -1;

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortDirection === 'asc' ? valA - valB : valB - valA;
      }
      return sortDirection === 'asc'
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [data, sortKey, sortDirection]);

  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  if (isLoading) {
    return (
      <div className="space-y-3 p-4 border border-[var(--border-color)] rounded-xl bg-[var(--bg-surface)]">
        <div className="h-10 w-full bg-[var(--bg-elevated)] rounded-lg animate-pulse" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} height={48} className="w-full" />
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title={emptyTitle || 'No content found'}
        description={emptyDescription || 'Try adjusting your platform or date range filters.'}
      />
    );
  }

  return (
    <div className={`space-y-4 ${className || ''}`}>
      {/* Table Responsive Container */}
      <div className="w-full overflow-x-auto rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[var(--border-color)] bg-[var(--bg-elevated)]/60 text-[var(--text-secondary)] font-display uppercase tracking-wider font-semibold">
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ width: col.width }}
                  className={clsx(
                    'p-3.5 select-none',
                    col.align === 'right' && 'text-right',
                    col.align === 'center' && 'text-center',
                    col.sortable && 'cursor-pointer hover:text-[var(--text-primary)]'
                  )}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div
                    className={clsx(
                      'inline-flex items-center gap-1.5',
                      col.align === 'right' && 'justify-end w-full'
                    )}
                  >
                    <span>{col.header}</span>
                    {col.sortable && (
                      <span className="shrink-0 text-[var(--text-secondary)]">
                        {sortKey === col.key ? (
                          sortDirection === 'desc' ? (
                            <ArrowDown className="w-3.5 h-3.5 text-[var(--accent-electric)]" />
                          ) : (
                            <ArrowUp className="w-3.5 h-3.5 text-[var(--accent-electric)]" />
                          )
                        ) : (
                          <ArrowUpDown className="w-3.5 h-3.5 opacity-50" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)]/60">
            {paginatedData.map((row) => {
              const rowKey = keyExtractor(row);
              return (
                <tr
                  key={rowKey}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={clsx(
                    'transition-colors text-[var(--text-primary)]',
                    onRowClick
                      ? 'cursor-pointer hover:bg-[var(--bg-elevated)]'
                      : 'hover:bg-[var(--bg-elevated)]/50'
                  )}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={clsx(
                        'p-3.5 font-sans align-middle',
                        col.align === 'right' && 'text-right',
                        col.align === 'center' && 'text-center'
                      )}
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2 text-xs text-[var(--text-secondary)]">
          <div>
            Showing <span className="font-semibold text-[var(--text-primary)] font-mono">{(currentPage - 1) * pageSize + 1}</span> to{' '}
            <span className="font-semibold text-[var(--text-primary)] font-mono">
              {Math.min(currentPage * pageSize, sortedData.length)}
            </span>{' '}
            of <span className="font-semibold text-[var(--text-primary)] font-mono">{sortedData.length}</span> results
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs text-[var(--text-primary)]">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
