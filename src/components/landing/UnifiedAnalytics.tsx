import React from 'react';
import { UNIFIED_COPY, UNIFIED_CARDS } from '../../data/landingData';
import { LayoutDashboard, TrendingUp, FileText, Radio } from 'lucide-react';

export const UnifiedAnalytics: React.FC = () => {
  const icons = [
    <LayoutDashboard className="w-5 h-5 text-[var(--accent-electric)]" />,
    <TrendingUp className="w-5 h-5 text-[var(--accent-lime)]" />,
    <FileText className="w-5 h-5 text-[var(--accent-electric)]" />,
    <Radio className="w-5 h-5 text-[var(--accent-lime)]" />,
  ];

  return (
    <section id="product" className="py-20 bg-[var(--bg-surface)]/40 border-y border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-[var(--text-primary)]">
            {UNIFIED_COPY.heading}
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)]">
            {UNIFIED_COPY.subheading}
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {UNIFIED_CARDS.map((card, idx) => (
            <div
              key={card.title}
              className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--accent-electric)]/50 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] flex items-center justify-center mb-4">
                  {icons[idx]}
                </div>
                <h3 className="text-xs font-bold font-display tracking-wider uppercase text-[var(--text-primary)] mb-2">
                  {card.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
