import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LandingPage } from '../LandingPage';
import { AppProviders } from '../../../app/providers';

describe('LandingPage Component', () => {
  it('renders headline, CTAs, and key marketing sections', () => {
    render(
      <AppProviders>
        <MemoryRouter>
          <LandingPage />
        </MemoryRouter>
      </AppProviders>
    );

    expect(screen.getByText(/Your social data,/i)).toBeInTheDocument();
    expect(screen.getByText(/finally in one cluster./i)).toBeInTheDocument();
    expect(screen.getByText(/3 platforms. 3 dashboards. Too many numbers./i)).toBeInTheDocument();
    expect(screen.getByText(/Numbers with context./i)).toBeInTheDocument();
    expect(screen.getByText(/Your accounts stay yours./i)).toBeInTheDocument();
  });
});
