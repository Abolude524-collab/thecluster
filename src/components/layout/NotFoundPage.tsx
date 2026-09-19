import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-color)] flex items-center justify-center text-2xl font-bold font-display text-[var(--accent-electric)]">
        404
      </div>
      <h1 className="text-2xl font-bold font-display text-[var(--text-primary)]">Signal Lost</h1>
      <p className="text-sm text-[var(--text-secondary)] max-w-md">
        The requested page does not exist or has been relocated.
      </p>
      <Link
        to="/"
        className="px-4 py-2 text-sm font-medium rounded-lg bg-[var(--accent-electric)] text-white hover:bg-opacity-90 transition-all shadow-sm"
      >
        Return to Dashboard
      </Link>
    </div>
  );
};
