import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Radio,
  Settings,
  Sun,
  Moon,
  Bell,
  Menu,
  X,
  Activity,
  LogOut,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useFilters } from '../../context/FilterContext';
import { useAuth } from '../../context/AuthContext';
import { HeaderFilterControls } from './HeaderFilterControls';
import { useDashboardData } from '../../hooks/useDashboardData';

interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: 'OVERVIEW',
    items: [
      { label: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
      { label: 'Analytics', path: '/app/analytics', icon: BarChart3 },
      { label: 'Content', path: '/app/content', icon: FileText },
    ],
  },
  {
    title: 'WORKSPACE',
    items: [
      { label: 'Connections', path: '/app/connections', icon: Radio },
    ],
  },
  {
    title: 'SYSTEM',
    items: [
      { label: 'Settings', path: '/app/settings', icon: Settings },
    ],
  },
];

export const AppShell: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { effectiveTheme, toggleTheme } = useTheme();
  const { filters } = useFilters();
  const { user, logout } = useAuth();
  const { refetch, isRefreshing } = useDashboardData();
  const location = useLocation();
  const navigate = useNavigate();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'Dashboard';
    if (path.includes('/analytics')) return 'Analytics';
    if (path.includes('/content')) return 'Content';
    if (path.includes('/connections')) return 'Connections';
    if (path.includes('/settings')) return 'Settings';
    return 'The Cluster';
  };

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  const userInitials = user?.name ? user.name.slice(0, 2).toUpperCase() : 'TC';

  return (
    <div className="min-h-screen flex bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200">
      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[var(--bg-surface)] border-r border-[var(--border-color)] flex flex-col transition-transform duration-200 lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-[var(--border-color)] flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)] rounded-lg p-1">
            <div className="w-9 h-9 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-electric)] group-hover:border-[var(--accent-electric)] transition-colors">
              <Activity className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="leading-tight">
              <div className="text-[10px] tracking-[0.2em] text-[var(--text-secondary)] font-semibold font-display">THE</div>
              <div className="text-lg font-bold tracking-tight text-[var(--text-primary)] font-display">CLUSTER</div>
            </div>
          </NavLink>
          
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Section List */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6" aria-label="Main Navigation">
          {NAV_SECTIONS.map((section) => (
            <div key={section.title} className="space-y-1">
              <div className="px-3 text-[11px] font-semibold tracking-wider text-[var(--text-secondary)] uppercase font-display">
                {section.title}
              </div>
              <ul className="space-y-1 mt-2">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)] ${
                            isActive
                              ? 'bg-[var(--accent-electric)]/10 text-[var(--text-primary)] border-l-2 border-[var(--accent-electric)] shadow-sm'
                              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
                          }`
                        }
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{item.label}</span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer Status & User Sign Out */}
        <div className="p-4 border-t border-[var(--border-color)] bg-[var(--bg-elevated)]/50 text-xs text-[var(--text-secondary)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium text-[var(--text-primary)]">Active Signals</span>
            <span className="text-[var(--accent-lime)] font-mono text-[11px]">{filters.platforms.length} platforms</span>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--status-error)] transition-colors text-xs font-medium"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Topbar Header */}
        <header className="sticky top-0 z-30 min-h-16 bg-[var(--bg-surface)]/80 backdrop-blur-md border-b border-[var(--border-color)] px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base font-semibold font-display text-[var(--text-primary)]">{getPageTitle()}</h1>
              <p className="text-xs text-[var(--text-secondary)] hidden sm:block">Welcome, {user?.name || 'Creator'}</p>
            </div>
          </div>

          {/* Topbar Filter Controls & User Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            <HeaderFilterControls onRefresh={refetch} isRefreshing={isRefreshing} />

            <div className="h-4 w-px bg-[var(--border-color)] hidden sm:block mx-1" />

            {/* Notifications */}
            <button
              className="relative p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]"
              title="Notifications"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--accent-electric)]" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]"
              title={`Switch to ${effectiveTheme === 'dark' ? 'light' : 'dark'} mode`}
              aria-label="Toggle theme"
            >
              {effectiveTheme === 'dark' ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* User Avatar */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[var(--accent-electric)] text-white font-semibold font-display flex items-center justify-center text-xs shadow-sm">
                {userInitials}
              </div>
            </div>
          </div>
        </header>

        {/* Page Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
