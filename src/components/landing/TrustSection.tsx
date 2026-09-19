import React from 'react';
import { ShieldCheck, Key, Lock } from 'lucide-react';

export const TrustSection: React.FC = () => {
  return (
    <section className="py-20 bg-[var(--bg-surface)]/40 border-y border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent-electric)]/30 bg-[var(--accent-electric)]/10 text-[var(--accent-electric)] text-[11px] font-bold font-display tracking-widest uppercase">
            PRIVACY & TRUST
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-[var(--text-primary)]">
            Your accounts stay yours.
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            The Cluster uses authorized platform connections to retrieve available analytics. You control which accounts are connected and can disconnect them at any time from your workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
          <div className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-2">
            <ShieldCheck className="w-5 h-5 text-[var(--accent-lime)]" />
            <h4 className="text-xs font-bold font-display text-[var(--text-primary)]">
              Authorized Scopes Only
            </h4>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              We only request read-only analytics permissions required to display metrics.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-2">
            <Key className="w-5 h-5 text-[var(--accent-electric)]" />
            <h4 className="text-xs font-bold font-display text-[var(--text-primary)]">
              Explicit Revocation
            </h4>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Disconnect any social platform instantly with one click from the connections manager.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-2">
            <Lock className="w-5 h-5 text-[var(--accent-lime)]" />
            <h4 className="text-xs font-bold font-display text-[var(--text-primary)]">
              Transparent OAuth
            </h4>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Built on standard OAuth 2.0 authorization code grant flows.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
