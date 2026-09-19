import React from 'react';
import { Youtube, Instagram, Twitter, ArrowDown } from 'lucide-react';
import { PROBLEM_COPY } from '../../data/landingData';

export const ProblemSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-[var(--text-primary)]">
            {PROBLEM_COPY.heading}
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)]">
            {PROBLEM_COPY.subheading}
          </p>
        </div>

        {/* Problem Consolidation Flow Visual */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Disconnected Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-5 rounded-xl border border-red-500/30 bg-[var(--bg-surface)] space-y-2 opacity-85 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-2 text-xs font-bold font-display text-red-400">
                <Youtube className="w-4 h-4" />
                <span>YouTube Studio</span>
              </div>
              <ul className="text-xs text-[var(--text-secondary)] space-y-1 font-mono">
                <li>• Subscribers: 12.4K</li>
                <li>• Video Views: 832K</li>
                <li>• Watch time: 42.1 hrs</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl border border-pink-500/30 bg-[var(--bg-surface)] space-y-2 opacity-85 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-2 text-xs font-bold font-display text-pink-400">
                <Instagram className="w-4 h-4" />
                <span>Instagram Insights</span>
              </div>
              <ul className="text-xs text-[var(--text-secondary)] space-y-1 font-mono">
                <li>• Followers: 84.2K</li>
                <li>• Impressions: 1.4M</li>
                <li>• Post Likes: 92.4K</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl border border-blue-500/30 bg-[var(--bg-surface)] space-y-2 opacity-85 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-2 text-xs font-bold font-display text-blue-400">
                <Twitter className="w-4 h-4" />
                <span>X Analytics</span>
              </div>
              <ul className="text-xs text-[var(--text-secondary)] space-y-1 font-mono">
                <li>• Followers: 18.8K</li>
                <li>• Impressions: 263K</li>
                <li>• Retweets: 4.8K</li>
              </ul>
            </div>
          </div>

          {/* Consolidation Arrow */}
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-electric)] animate-bounce">
              <ArrowDown className="w-5 h-5" />
            </div>
          </div>

          {/* Consolidated Destination Box */}
          <div className="p-6 sm:p-8 rounded-2xl border-2 border-[var(--accent-electric)] bg-[var(--accent-electric)]/10 text-center space-y-3 shadow-xl">
            <div className="text-xs tracking-[0.2em] font-bold font-display text-[var(--accent-electric)] uppercase">
              CONSOLIDATED INTO
            </div>
            <h3 className="text-2xl font-bold font-display text-[var(--text-primary)]">
              THE CLUSTER WORKSPACE
            </h3>
            <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto">
              One unified dashboard aggregating audience, total views, engagement, and cross-platform growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
