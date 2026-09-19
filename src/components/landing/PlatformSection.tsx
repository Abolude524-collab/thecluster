import React from 'react';
import { LANDING_PLATFORMS } from '../../data/landingData';
import { Youtube, Instagram, Twitter, Check, ShieldAlert } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const PlatformSection: React.FC = () => {
  const getPlatformIcon = (id: string) => {
    if (id === 'youtube') return <Youtube className="w-6 h-6 text-[#FF0000]" />;
    if (id === 'instagram') return <Instagram className="w-6 h-6 text-[#E1306C]" />;
    return <Twitter className="w-6 h-6 text-[#1DA1F2]" />;
  };

  return (
    <section id="platforms" className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent-electric)]/30 bg-[var(--accent-electric)]/10 text-[var(--accent-electric)] text-[11px] font-bold font-display tracking-widest uppercase">
            INTEGRATIONS
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-[var(--text-primary)]">
            Your platforms. One workspace.
          </h2>
        </div>

        {/* 3 Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LANDING_PLATFORMS.map((platform) => (
            <div
              key={platform.id}
              className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)]">
                    {getPlatformIcon(platform.id)}
                  </div>
                  <Badge variant={platform.id} size="sm">
                    {platform.badge}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-lg font-bold font-display text-[var(--text-primary)]">
                    {platform.name}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                    {platform.description}
                  </p>
                </div>

                <div className="pt-2 space-y-2">
                  <div className="text-[11px] font-bold font-display uppercase tracking-wider text-[var(--text-secondary)]">
                    Supported Signals
                  </div>
                  <div className="space-y-1.5">
                    {platform.signals.map((sig, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[var(--text-primary)] font-mono">
                        <Check className="w-3.5 h-3.5 text-[var(--accent-lime)] shrink-0" />
                        <span>{sig}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {platform.note && (
                <div className="p-3 rounded-lg bg-[var(--bg-elevated)]/60 border border-[var(--border-color)]/60 text-[11px] text-[var(--text-secondary)] leading-snug">
                  {platform.note}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Platform Trust Message */}
        <div className="p-6 rounded-xl border border-[var(--accent-electric)]/30 bg-[var(--accent-electric)]/10 text-center max-w-3xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 font-bold font-display text-xs uppercase tracking-wider text-[var(--accent-electric)]">
            <ShieldAlert className="w-4 h-4" />
            <span>Honest Capability Commitment</span>
          </div>
          <p className="text-xs text-[var(--text-primary)] leading-relaxed">
            Not every platform exposes the same data. The Cluster does not invent missing metrics. When a metric isn't supported by an API, you'll see that clearly as <code className="px-1.5 py-0.5 rounded bg-[var(--bg-surface)] font-mono text-[var(--text-secondary)]">— Not available</code>.
          </p>
        </div>
      </div>
    </section>
  );
};
