import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '../ui/Button';
import { HERO_COPY } from '../../data/landingData';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  const handleSeeHowItWorks = () => {
    const el = document.querySelector('#how-it-works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background Subtle Gradient Highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[var(--accent-electric)]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent-electric)]/30 bg-[var(--accent-electric)]/10 text-[var(--accent-electric)] text-[11px] font-bold font-display tracking-widest uppercase">
          {HERO_COPY.eyebrow}
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-display tracking-tight text-[var(--text-primary)] max-w-4xl mx-auto leading-[1.1]">
          Your social data, <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] via-[var(--accent-electric)] to-[var(--accent-lime)]">
            finally in one cluster.
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-sm sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
          {HERO_COPY.subheadline}
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/signup')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            {HERO_COPY.primaryCTA}
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={handleSeeHowItWorks}
            leftIcon={<Play className="w-4 h-4" />}
          >
            {HERO_COPY.secondaryCTA}
          </Button>
        </div>

        {/* Hero Product Interface Mockup Container */}
        <div className="pt-10 max-w-5xl mx-auto">
          <div className="p-2 sm:p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)]/90 backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* Window Top Controls */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--border-color)]/60 mb-4 text-xs text-[var(--text-secondary)]">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              </div>
              <div className="font-mono text-[11px] text-[var(--text-secondary)]">app.thecluster.io/dashboard</div>
              <div className="w-12" />
            </div>

            {/* Simulated Live Preview Metric Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left p-2">
              <div className="p-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-elevated)]">
                <div className="text-[10px] font-bold font-display uppercase tracking-wider text-[var(--text-secondary)]">
                  TOTAL AUDIENCE
                </div>
                <div className="text-xl font-bold font-display text-[var(--text-primary)] mt-1">
                  128.4K
                </div>
                <div className="text-[10px] text-[var(--accent-lime)] font-mono mt-1">+8.4%</div>
              </div>

              <div className="p-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-elevated)]">
                <div className="text-[10px] font-bold font-display uppercase tracking-wider text-[var(--text-secondary)]">
                  TOTAL VIEWS
                </div>
                <div className="text-xl font-bold font-display text-[var(--text-primary)] mt-1">
                  2.8M
                </div>
                <div className="text-[10px] text-[var(--accent-lime)] font-mono mt-1">+14.2%</div>
              </div>

              <div className="p-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-elevated)]">
                <div className="text-[10px] font-bold font-display uppercase tracking-wider text-[var(--text-secondary)]">
                  ENGAGEMENT
                </div>
                <div className="text-xl font-bold font-display text-[var(--text-primary)] mt-1">
                  8.42%
                </div>
                <div className="text-[10px] text-[var(--accent-lime)] font-mono mt-1">+2.1%</div>
              </div>

              <div className="p-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-elevated)]">
                <div className="text-[10px] font-bold font-display uppercase tracking-wider text-[var(--text-secondary)]">
                  CONNECTED PLATFORMS
                </div>
                <div className="text-xl font-bold font-display text-[var(--accent-electric)] mt-1">
                  3 ACTIVE
                </div>
                <div className="text-[10px] text-[var(--text-secondary)] font-mono mt-1">YouTube • IG • X</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
