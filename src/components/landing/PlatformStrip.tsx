import React from 'react';
import { Youtube, Instagram, Twitter, Info } from 'lucide-react';

export const PlatformStrip: React.FC = () => {
  return (
    <section className="py-12 border-y border-[var(--border-color)] bg-[var(--bg-surface)]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h3 className="text-xs font-bold font-display uppercase tracking-widest text-[var(--text-secondary)]">
          YOUR PLATFORMS. ONE WORKSPACE.
        </h3>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
          <div className="flex items-center gap-2.5 group cursor-default">
            <Youtube className="w-6 h-6 text-[#FF0000]" />
            <span className="text-sm font-bold font-display text-[var(--text-primary)]">YouTube</span>
          </div>

          <div className="flex items-center gap-2.5 group cursor-default">
            <Instagram className="w-6 h-6 text-[#E1306C]" />
            <span className="text-sm font-bold font-display text-[var(--text-primary)]">Instagram</span>
          </div>

          <div className="flex items-center gap-2.5 group cursor-default">
            <Twitter className="w-6 h-6 text-[#1DA1F2]" />
            <span className="text-sm font-bold font-display text-[var(--text-primary)]">X (Twitter)</span>
          </div>
        </div>

        <p className="text-[11px] text-[var(--text-secondary)] max-w-xl mx-auto flex items-center justify-center gap-1.5 leading-relaxed">
          <Info className="w-3.5 h-3.5 shrink-0 text-[var(--text-secondary)]" />
          <span>
            Available metrics depend on platform capabilities, account type, permissions, and API access.
          </span>
        </p>
      </div>
    </section>
  );
};
