import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Activity, ArrowRight, Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsLoading(true);
    try {
      await signup(name, email);
      toast('Account created!', {
        type: 'success',
        message: 'Welcome to The Cluster. Connect your platforms to begin.',
      });
      navigate('/app/dashboard', { replace: true });
    } catch (err: any) {
      toast('Registration failed', { type: 'error', message: err.message });
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
            Create your workspace
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            One view. Every signal. Get started in seconds.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold font-display text-[var(--text-primary)]">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[var(--text-secondary)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]"
                placeholder="Testimony"
              />
            </div>
          </div>

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
                placeholder="creator@domain.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold font-display text-[var(--text-primary)]">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[var(--text-secondary)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-10 py-2 text-xs rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]"
                placeholder="••••••••••••"
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
            Create Account & Connect
          </Button>
        </form>

        <div className="pt-4 border-t border-[var(--border-color)] text-center text-xs text-[var(--text-secondary)]">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-[var(--accent-electric)] hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
