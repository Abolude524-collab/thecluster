import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Menu, X, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Product', href: '#product' },
    { label: 'Features', href: '#features' },
    { label: 'Platforms', href: '#platforms' },
    { label: 'How it works', href: '#how-it-works' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[var(--bg-primary)]/85 backdrop-blur-md border-b border-[var(--border-color)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-8 h-8 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-electric)] group-hover:border-[var(--accent-electric)] transition-colors">
            <Activity className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="leading-tight">
            <div className="text-[9px] tracking-[0.2em] text-[var(--text-secondary)] font-semibold font-display">THE</div>
            <div className="text-base font-bold tracking-tight text-[var(--text-primary)] font-display">CLUSTER</div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-display"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA Action */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/app/dashboard')}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Open Dashboard
            </Button>
          ) : (
            <>
              <Link to="/login" className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-3 py-1.5 transition-colors font-display">
                Sign in
              </Link>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/signup')}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Get started →
              </Button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--border-color)] bg-[var(--bg-surface)] px-4 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-[var(--text-primary)] font-display"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-[var(--border-color)] flex flex-col gap-2">
            {isAuthenticated ? (
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/app/dashboard');
                }}
              >
                Open Dashboard
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="md"
                  fullWidth
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/login');
                  }}
                >
                  Sign in
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/signup');
                  }}
                >
                  Get started →
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
