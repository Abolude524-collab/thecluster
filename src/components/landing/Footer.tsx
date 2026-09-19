import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-surface)] text-xs text-[var(--text-secondary)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <Link to="/" className="flex items-center gap-3 group focus:outline-none">
              <div className="w-8 h-8 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-electric)] group-hover:border-[var(--accent-electric)] transition-colors">
                <Activity className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div className="leading-tight">
                <div className="text-[9px] tracking-[0.2em] text-[var(--text-secondary)] font-semibold font-display">THE</div>
                <div className="text-base font-bold tracking-tight text-[var(--text-primary)] font-display">CLUSTER</div>
              </div>
            </Link>
            <p className="text-xs text-[var(--text-secondary)] max-w-sm leading-relaxed">
              One view. Every signal. A serious social-media analytics workspace built around signals, not noise.
            </p>
            <div className="pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-mono"
              >
                <Github className="w-4 h-4" />
                <span>Built in the open. Explore on GitHub →</span>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="font-bold font-display uppercase tracking-wider text-[var(--text-primary)] text-[11px]">
              Product
            </h4>
            <ul className="space-y-2 font-display">
              <li><Link to="/app/dashboard" className="hover:text-[var(--text-primary)] transition-colors">Dashboard</Link></li>
              <li><Link to="/app/analytics" className="hover:text-[var(--text-primary)] transition-colors">Analytics</Link></li>
              <li><Link to="/app/content" className="hover:text-[var(--text-primary)] transition-colors">Content</Link></li>
              <li><Link to="/app/connections" className="hover:text-[var(--text-primary)] transition-colors">Connections</Link></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-3">
            <h4 className="font-bold font-display uppercase tracking-wider text-[var(--text-primary)] text-[11px]">
              Resources
            </h4>
            <ul className="space-y-2 font-display">
              <li><a href="#how-it-works" className="hover:text-[var(--text-primary)] transition-colors">Documentation</a></li>
              <li><a href="#platforms" className="hover:text-[var(--text-primary)] transition-colors">Supported APIs</a></li>
              <li><a href="#features" className="hover:text-[var(--text-primary)] transition-colors">Architecture</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-3">
            <h4 className="font-bold font-display uppercase tracking-wider text-[var(--text-primary)] text-[11px]">
              Legal
            </h4>
            <ul className="space-y-2 font-display">
              <li><a href="#" className="hover:text-[var(--text-primary)] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[var(--text-primary)] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[var(--text-primary)] transition-colors">OAuth Disclosure</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--border-color)]/60 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px]">
          <div>© 2026 The Cluster. All rights reserved.</div>
          <div>Designed for high-performance social media intelligence.</div>
        </div>
      </div>
    </footer>
  );
};
