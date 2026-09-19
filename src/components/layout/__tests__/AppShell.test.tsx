import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AppShell } from '../AppShell';
import { AppProviders } from '../../../app/providers';

describe('AppShell Component', () => {
  it('renders the brand title THE CLUSTER', () => {
    render(
      <AppProviders>
        <MemoryRouter initialEntries={['/app/dashboard']}>
          <AppShell />
        </MemoryRouter>
      </AppProviders>
    );

    expect(screen.getByText('THE')).toBeInTheDocument();
    expect(screen.getByText('CLUSTER')).toBeInTheDocument();
  });

  it('renders main navigation sections and items', () => {
    render(
      <AppProviders>
        <MemoryRouter initialEntries={['/app/dashboard']}>
          <AppShell />
        </MemoryRouter>
      </AppProviders>
    );

    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(within(nav).getByText('OVERVIEW')).toBeInTheDocument();
    expect(within(nav).getByText('Dashboard')).toBeInTheDocument();
    expect(within(nav).getByText('Analytics')).toBeInTheDocument();
    expect(within(nav).getByText('Content')).toBeInTheDocument();
    expect(within(nav).getByText('Connections')).toBeInTheDocument();
    expect(within(nav).getByText('Settings')).toBeInTheDocument();
  });
});
