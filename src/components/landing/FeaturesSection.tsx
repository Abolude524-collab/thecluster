import React from 'react';
import { LANDING_FEATURES } from '../../data/landingData';
import { LayoutDashboard, TrendingUp, FileText, Radio, ShieldCheck } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const iconsMap: Record<string, React.ReactNode> = {
    LayoutDashboard: <LayoutDashboard className="w-5 h-5 text-[var(--accent-electric)]" />,
    TrendingUp: <TrendingUp className="w-5 h-5 text-[var(--accent-lime)]" />,
    FileText: <FileText className="w-5 h-5 text-[var(--accent-electric)]" />,
    Radio: <Radio className="w-5 h-5 text-[var(--accent-lime)]" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-[var(--accent-electric)]" />,
  };

  return (
    <section id="features" className="py-20 md:py-28 bg-[var(--bg-surface)]/40 border-y border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent-electric)]/30 bg-[var(--accent-electric)]/10 text-[var(--accent-electric)] text-[11px] font-bold font-display tracking-widest uppercase">
            FEATURES
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-[var(--text-primary)]">
            Built around the signals that matter.
          </h2>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LANDING_FEATURES.map((feat) => (
            <div
              key={feat.id}
              className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--accent-electric)]/40 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="text-[10px] font-bold font-display tracking-wider text-[var(--text-secondary)] uppercase mb-3">
                  {feat.eyebrow}
                </div>
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] flex items-center justify-center mb-4">
                  {iconsMap[feat.iconName]}
                </div>
                <h3 className="text-base font-bold font-display text-[var(--text-primary)] mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
