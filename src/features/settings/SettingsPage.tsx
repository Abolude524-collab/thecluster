import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Sun, Moon, Monitor, LogOut, Check } from 'lucide-react';
import { Tabs } from '../../components/ui/Tabs';

type SettingsSection = 'profile' | 'appearance' | 'notifications' | 'security';

export const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SettingsSection>('profile');
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  // Profile Form Local State
  const [profileName, setProfileName] = useState('Testimony');
  const [profileEmail, setProfileEmail] = useState('creator@thecluster.app');

  // Notifications Local State
  const [growthAlerts, setGrowthAlerts] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(true);
  const [connectionFailures, setConnectionFailures] = useState(true);

  const sectionsList: { id: SettingsSection; label: string }[] = [
    { id: 'profile', label: 'Profile' },
    { id: 'appearance', label: 'Appearance' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'security', label: 'Security' },
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast('Profile updated', {
      type: 'success',
      message: 'Your personal settings have been saved.',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] font-display">
          Settings
        </h1>
        <p className="text-xs text-[var(--text-secondary)] mt-1">
          Manage your account profile, theme preferences, notifications, and security.
        </p>
      </div>

      <Tabs
        tabs={sectionsList}
        activeTab={activeSection}
        onChange={(id) => setActiveSection(id as SettingsSection)}
        variant="pills"
      />

      {/* Section 1: Profile */}
      {activeSection === 'profile' && (
        <Card className="animate-in fade-in-50 duration-200">
          <CardHeader>
            <CardTitle>Personal Profile</CardTitle>
            <CardDescription>Update your display name and email address</CardDescription>
          </CardHeader>
          <form onSubmit={handleSaveProfile}>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 py-2">
                <Avatar name={profileName} size="xl" />
                <div>
                  <h4 className="text-sm font-bold font-display text-[var(--text-primary)]">
                    {profileName}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)]">Primary Cluster Account</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold font-display text-[var(--text-primary)]">
                  Display Name
                </label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold font-display text-[var(--text-primary)]">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" variant="primary" size="sm">
                Save Profile Changes
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}

      {/* Section 2: Appearance */}
      {activeSection === 'appearance' && (
        <Card className="animate-in fade-in-50 duration-200">
          <CardHeader>
            <CardTitle>Appearance & Color Theme</CardTitle>
            <CardDescription>Choose how The Cluster interface looks on your device</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all ${
                theme === 'dark'
                  ? 'border-[var(--accent-electric)] bg-[var(--accent-electric)]/10 text-[var(--text-primary)] ring-1 ring-[var(--accent-electric)]'
                  : 'border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <Moon className="w-5 h-5 text-[var(--accent-electric)]" />
                {theme === 'dark' && <Check className="w-4 h-4 text-[var(--accent-electric)]" />}
              </div>
              <div className="mt-4">
                <div className="text-xs font-bold font-display text-[var(--text-primary)]">Dark Mode</div>
                <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">Primary dark graphite aesthetic</div>
              </div>
            </button>

            <button
              onClick={() => setTheme('light')}
              className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all ${
                theme === 'light'
                  ? 'border-[var(--accent-electric)] bg-[var(--accent-electric)]/10 text-[var(--text-primary)] ring-1 ring-[var(--accent-electric)]'
                  : 'border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <Sun className="w-5 h-5 text-yellow-400" />
                {theme === 'light' && <Check className="w-4 h-4 text-[var(--accent-electric)]" />}
              </div>
              <div className="mt-4">
                <div className="text-xs font-bold font-display text-[var(--text-primary)]">Light Mode</div>
                <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">High-contrast slate theme</div>
              </div>
            </button>

            <button
              onClick={() => setTheme('system')}
              className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all ${
                theme === 'system'
                  ? 'border-[var(--accent-electric)] bg-[var(--accent-electric)]/10 text-[var(--text-primary)] ring-1 ring-[var(--accent-electric)]'
                  : 'border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <Monitor className="w-5 h-5 text-[var(--accent-lime)]" />
                {theme === 'system' && <Check className="w-4 h-4 text-[var(--accent-electric)]" />}
              </div>
              <div className="mt-4">
                <div className="text-xs font-bold font-display text-[var(--text-primary)]">System Preference</div>
                <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">Matches OS color scheme</div>
              </div>
            </button>
          </CardContent>
        </Card>
      )}

      {/* Section 3: Notifications */}
      {activeSection === 'notifications' && (
        <Card className="animate-in fade-in-50 duration-200">
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Configure growth milestones and connection alert notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-elevated)]">
              <div>
                <h4 className="text-xs font-bold font-display text-[var(--text-primary)]">
                  Growth Spike Alerts
                </h4>
                <p className="text-[11px] text-[var(--text-secondary)]">
                  Receive notifications when audience growth exceeds 5% in 24 hours.
                </p>
              </div>
              <input
                type="checkbox"
                checked={growthAlerts}
                onChange={(e) => setGrowthAlerts(e.target.checked)}
                className="w-4 h-4 accent-[var(--accent-electric)] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-elevated)]">
              <div>
                <h4 className="text-xs font-bold font-display text-[var(--text-primary)]">
                  Weekly Analytics Digest
                </h4>
                <p className="text-[11px] text-[var(--text-secondary)]">
                  Summary email containing cross-platform performance signals.
                </p>
              </div>
              <input
                type="checkbox"
                checked={weeklySummary}
                onChange={(e) => setWeeklySummary(e.target.checked)}
                className="w-4 h-4 accent-[var(--accent-electric)] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-elevated)]">
              <div>
                <h4 className="text-xs font-bold font-display text-[var(--text-primary)]">
                  Connection Error Warnings
                </h4>
                <p className="text-[11px] text-[var(--text-secondary)]">
                  Immediate alerts when a platform OAuth token expires or encounters rate limits.
                </p>
              </div>
              <input
                type="checkbox"
                checked={connectionFailures}
                onChange={(e) => setConnectionFailures(e.target.checked)}
                className="w-4 h-4 accent-[var(--accent-electric)] cursor-pointer"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Section 4: Security */}
      {activeSection === 'security' && (
        <Card className="animate-in fade-in-50 duration-200">
          <CardHeader>
            <CardTitle>Security & Active Sessions</CardTitle>
            <CardDescription>Manage active browser sessions and security preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-elevated)] flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold font-display text-[var(--text-primary)]">
                  Current Session
                </h4>
                <p className="text-[11px] text-[var(--text-secondary)]">
                  Windows 11 • Chrome 126 • Active Now
                </p>
              </div>
              <Badge variant="success" size="sm">
                Active
              </Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="danger"
              size="sm"
              leftIcon={<LogOut className="w-3.5 h-3.5" />}
              onClick={() =>
                toast('Sign Out Clicked', {
                  type: 'info',
                  message: 'Security session ended cleanly.',
                })
              }
            >
              Sign Out of Cluster
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
