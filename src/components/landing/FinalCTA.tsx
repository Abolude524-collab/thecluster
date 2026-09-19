import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Activity } from 'lucide-react';
import { Button } from '../ui/Button';

export const FinalCTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background Accent Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[var(--accent-electric)]/15 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-14 rounded-2xl border-2 border-[var(--accent-electric)] bg-[var(--bg-surface)] text-center space-y-6 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-electric)] mx-auto">
            <Activity className="w-6 h-6 stroke-[2.5]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-[var(--text-primary)]">
            Bring your signals together.
          </h2>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
            Connect your platforms and see your social ecosystem from one workspace.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/signup')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Get started →
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const el = document.querySelector('#dashboard');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore the product
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
