import React from 'react';
import { Activity, LayoutDashboard, BarChart3, FileText, Radio, Settings } from 'lucide-react';

export const DashboardPreview: React.FC = () => {
  return (
    <section id="dashboard" className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent-electric)]/30 bg-[var(--accent-electric)]/10 text-[var(--accent-electric)] text-[11px] font-bold font-display tracking-widest uppercase">
            PRODUCT PREVIEW
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-[var(--text-primary)]">
            Everything important. One view.
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)]">
            A dashboard built around signals, not noise.
          </p>
        </div>

        {/* Product Dashboard Frame */}
        <div className="max-w-5xl mx-auto rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-2xl overflow-hidden text-left">
          {/* Topbar Simulation */}
          <div className="h-14 bg-[var(--bg-surface)] border-b border-[var(--border-color)] px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-electric)]">
                <Activity className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-xs font-bold font-display text-[var(--text-primary)]">
                THE CLUSTER WORKSPACE
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
              <span className="px-2 py-0.5 rounded-full bg-[var(--accent-lime)]/15 text-[var(--accent-lime)] font-mono text-[10px]">
                3 PLATFORMS CONNECTED
              </span>
            </div>
          </div>

          {/* Main Interface Layout */}
          <div className="flex min-h-[420px]">
            {/* Sidebar Mockup */}
            <div className="w-48 bg-[var(--bg-surface)] border-r border-[var(--border-color)] p-4 hidden sm:flex flex-col justify-between">
              <div className="space-y-4">
                <div className="text-[10px] font-bold font-display uppercase tracking-wider text-[var(--text-secondary)]">
                  OVERVIEW
                </div>
                <ul className="space-y-1 text-xs">
                  <li className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg bg-[var(--accent-electric)]/10 text-[var(--text-primary)] font-semibold border-l-2 border-[var(--accent-electric)]">
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Dashboard</span>
                  </li>
                  <li className="flex items-center gap-2.5 px-2.5 py-2 text-[var(--text-secondary)]">
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>Analytics</span>
                  </li>
                  <li className="flex items-center gap-2.5 px-2.5 py-2 text-[var(--text-secondary)]">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Content</span>
                  </li>
                </ul>

                <div className="text-[10px] font-bold font-display uppercase tracking-wider text-[var(--text-secondary)] pt-2">
                  WORKSPACE
                </div>
                <ul className="space-y-1 text-xs text-[var(--text-secondary)]">
                  <li className="flex items-center gap-2.5 px-2.5 py-2">
                    <Radio className="w-3.5 h-3.5" />
                    <span>Connections</span>
                  </li>
                  <li className="flex items-center gap-2.5 px-2.5 py-2">
                    <Settings className="w-3.5 h-3.5" />
                    <span>Settings</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Main Preview Content */}
            <div className="flex-1 p-6 space-y-6 bg-[var(--bg-primary)]/40">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold font-display text-[var(--text-primary)]">
                    Dashboard Overview
                  </h3>
                  <p className="text-[11px] text-[var(--text-secondary)]">Last 30 days • All platforms</p>
                </div>
              </div>

              {/* KPI Cards Row */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)]">
                  <div className="text-[10px] font-semibold text-[var(--text-secondary)] uppercase">
                    Followers
                  </div>
                  <div className="text-lg font-bold font-display text-[var(--text-primary)] mt-1">
                    128.4K
                  </div>
                  <div className="text-[10px] text-[var(--accent-lime)] font-mono mt-1">+8.4%</div>
                </div>

                <div className="p-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)]">
                  <div className="text-[10px] font-semibold text-[var(--text-secondary)] uppercase">
                    Views
                  </div>
                  <div className="text-lg font-bold font-display text-[var(--text-primary)] mt-1">
                    2.8M
                  </div>
                  <div className="text-[10px] text-[var(--accent-lime)] font-mono mt-1">+14.2%</div>
                </div>

                <div className="p-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)]">
                  <div className="text-[10px] font-semibold text-[var(--text-secondary)] uppercase">
                    Engagement
                  </div>
                  <div className="text-lg font-bold font-display text-[var(--text-primary)] mt-1">
                    8.42%
                  </div>
                  <div className="text-[10px] text-[var(--accent-lime)] font-mono mt-1">+2.1%</div>
                </div>
              </div>

              {/* Mini Trend Line Graphic */}
              <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-2">
                <div className="flex items-center justify-between text-xs font-bold font-display text-[var(--text-primary)]">
                  <span>Growth Trend</span>
                  <span className="text-[10px] text-[var(--text-secondary)] font-mono">30D History</span>
                </div>
                <div className="h-24 flex items-end justify-between gap-1 pt-4">
                  {[35, 45, 40, 60, 55, 75, 70, 90, 85, 100].map((val, i) => (
                    <div
                      key={i}
                      className="w-full bg-gradient-to-t from-[var(--accent-electric)]/30 to-[var(--accent-electric)] rounded-t-sm"
                      style={{ height: `${val}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
