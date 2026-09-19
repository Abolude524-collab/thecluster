import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../../data/landingData';

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[var(--bg-surface)]/40 border-y border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent-electric)]/30 bg-[var(--accent-electric)]/10 text-[var(--accent-electric)] text-[11px] font-bold font-display tracking-widest uppercase">
            HOW IT WORKS
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-[var(--text-primary)]">
            From disconnected accounts to one clear picture.
          </h2>
        </div>

        {/* 3 Step Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <div
              key={step.step}
              className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] flex flex-col justify-between space-y-6 relative group hover:border-[var(--accent-electric)]/40 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold font-display text-[var(--accent-electric)] font-mono">
                    {step.step}
                  </span>
                  <span className="text-[10px] font-bold font-display uppercase tracking-widest text-[var(--text-secondary)]">
                    {step.subtitle}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold font-display text-[var(--text-primary)]">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-color)] text-[11px] font-mono text-[var(--accent-lime)] text-center">
                {step.visualLabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
