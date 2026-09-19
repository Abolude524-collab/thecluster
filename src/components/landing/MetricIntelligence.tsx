import React from 'react';
import { Badge } from '../ui/Badge';

export const MetricIntelligence: React.FC = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent-electric)]/30 bg-[var(--accent-electric)]/10 text-[var(--accent-electric)] text-[11px] font-bold font-display tracking-widest uppercase">
            DATA PHILOSOPHY
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-[var(--text-primary)]">
            Numbers with context.
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)]">
            A metric is only useful when you know where it came from, what it means, and whether it is actually available.
          </p>
        </div>

        {/* Comparison Cards: Available Metric vs Unsupported Metric */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1: Supported Metric Example */}
          <div className="p-6 rounded-xl border border-[var(--accent-lime)]/40 bg-[var(--bg-surface)] space-y-4 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-display uppercase tracking-wider text-[var(--text-secondary)]">
                FOLLOWERS / SUBSCRIBERS
              </span>
              <Badge variant="success" size="sm">
                STATUS: AVAILABLE
              </Badge>
            </div>

            <div className="text-4xl font-bold font-display text-[var(--text-primary)] font-mono">
              128,420
            </div>

            <div className="text-xs text-[var(--accent-lime)] font-mono font-semibold">
              ↑ +8.4% vs previous period
            </div>

            <div className="pt-3 border-t border-[var(--border-color)] text-[11px] text-[var(--text-secondary)] flex items-center justify-between">
              <span>SOURCE PLATFORMS</span>
              <span className="font-mono text-[var(--text-primary)]">YouTube + Instagram + X</span>
            </div>
          </div>

          {/* Card 2: Unsupported Metric Example */}
          <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-display uppercase tracking-wider text-[var(--text-secondary)]">
                POST SHARES
              </span>
              <Badge variant="neutral" size="sm">
                STATUS: NOT AVAILABLE
              </Badge>
            </div>

            <div className="text-4xl font-bold font-display text-[var(--text-secondary)] font-mono">
              —
            </div>

            <div className="text-xs text-[var(--text-secondary)] font-mono">
              Not exposed by basic platform API
            </div>

            <div className="pt-3 border-t border-[var(--border-color)] text-[11px] text-[var(--text-secondary)] flex items-center justify-between">
              <span>EXPLICIT STATE</span>
              <span className="font-mono text-[var(--status-warning)]">No manufactured estimates</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
