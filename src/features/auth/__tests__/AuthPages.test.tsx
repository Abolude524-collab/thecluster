import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LoginPage } from '../LoginPage';
import { SignupPage } from '../SignupPage';
import { AppProviders } from '../../../app/providers';

describe('Auth Pages - Password Reveal', () => {
  it('toggles password visibility on LoginPage', () => {
    render(
      <AppProviders>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </AppProviders>
    );

    const toggleButton = screen.getByRole('button', { name: /show password/i });
    const passwordInput = screen.getByDisplayValue('••••••••••••');

    expect(passwordInput).toHaveAttribute('type', 'password');

    // Click to show password
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
    expect(screen.getByRole('button', { name: /hide password/i })).toBeInTheDocument();

    // Click to hide password
    fireEvent.click(screen.getByRole('button', { name: /hide password/i }));
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('toggles password visibility on SignupPage', () => {
    render(
      <AppProviders>
        <MemoryRouter>
          <SignupPage />
        </MemoryRouter>
      </AppProviders>
    );

    const toggleButton = screen.getByRole('button', { name: /show password/i });
    const passwordInput = screen.getByPlaceholderText('••••••••••••');

    expect(passwordInput).toHaveAttribute('type', 'password');

    // Click to show password
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
    expect(screen.getByRole('button', { name: /hide password/i })).toBeInTheDocument();

    // Click to hide password
    fireEvent.click(screen.getByRole('button', { name: /hide password/i }));
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
