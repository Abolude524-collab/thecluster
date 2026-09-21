import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Activity, ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('creator@thecluster.app');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/app/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      await login(email);
      toast('Signed in successfully', {
        type: 'success',
        message: 'Welcome back to The Cluster.',
      });
      navigate(from, { replace: true });
    } catch (err: any) {
      toast('Sign in failed', { type: 'error', message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col justify-center items-center p-4 sm:p-6">
      {/* Brand Header */}
      <Link to="/" className="flex items-center gap-3 mb-8 group focus:outline-none">
        <div className="w-10 h-10 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-electric)] group-hover:border-[var(--accent-electric)] transition-colors">
          <Activity className="w-6 h-6 stroke-[2.5]" />
        </div>
        <div className="leading-tight">
          <div className="text-[11px] tracking-[0.2em] text-[var(--text-secondary)] font-semibold font-display">THE</div>
          <div className="text-xl font-bold tracking-tight text-[var(--text-primary)] font-display">CLUSTER</div>
        </div>
      </Link>

      {/* Form Box */}
      <div className="w-full max-w-md p-6 sm:p-8 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-2xl space-y-6">
        <div>
          <h1 className="text-xl font-bold font-display text-[var(--text-primary)]">
            Sign in to your workspace
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Access your unified social signals and dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold font-display text-[var(--text-primary)]">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[var(--text-secondary)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]"
                placeholder="creator@thecluster.app"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold font-display text-[var(--text-primary)]">
                Password
              </label>
              <span className="text-[11px] text-[var(--text-secondary)]">Demo Mode Active</span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[var(--text-secondary)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-10 py-2 text-xs rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus:outline-none transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" variant="primary" size="md" fullWidth isLoading={isLoading} rightIcon={<ArrowRight className="w-4 h-4" />}>
            Sign In to Workspace
          </Button>
        </form>

        <div className="pt-4 border-t border-[var(--border-color)] text-center text-xs text-[var(--text-secondary)]">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-[var(--accent-electric)] hover:underline">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};
