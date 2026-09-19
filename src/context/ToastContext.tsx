import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { clsx } from 'clsx';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextType {
  toast: (title: string, options?: { type?: ToastType; message?: string }) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (title: string, options?: { type?: ToastType; message?: string }) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastMessage = {
        id,
        title,
        type: options?.type || 'info',
        message: options?.message,
      };

      setToasts((prev) => [...prev, newToast]);

      // Auto dismiss after 4 seconds
      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}

      {/* Floating Toasts Container */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none p-4"
      >
        {toasts.map((item) => (
          <div
            key={item.id}
            role="status"
            className={clsx(
              'pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl transition-all duration-200 animate-in slide-in-from-bottom-5 fade-in-0',
              item.type === 'success' && 'bg-[var(--bg-surface)] border-[var(--accent-lime)]/40 text-[var(--text-primary)]',
              item.type === 'error' && 'bg-[var(--bg-surface)] border-[var(--status-error)]/40 text-[var(--text-primary)]',
              item.type === 'warning' && 'bg-[var(--bg-surface)] border-[var(--status-warning)]/40 text-[var(--text-primary)]',
              item.type === 'info' && 'bg-[var(--bg-surface)] border-[var(--accent-electric)]/40 text-[var(--text-primary)]'
            )}
          >
            <div className="shrink-0 mt-0.5">
              {item.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[var(--accent-lime)]" />}
              {item.type === 'error' && <AlertCircle className="w-5 h-5 text-[var(--status-error)]" />}
              {item.type === 'warning' && <AlertTriangle className="w-5 h-5 text-[var(--status-warning)]" />}
              {item.type === 'info' && <Info className="w-5 h-5 text-[var(--accent-electric)]" />}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold font-display text-[var(--text-primary)] leading-tight">
                {item.title}
              </h4>
              {item.message && (
                <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 leading-snug">
                  {item.message}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(item.id)}
              className="p-1 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus:outline-none shrink-0"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
