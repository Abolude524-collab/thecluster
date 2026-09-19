import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { OAuthSimulatorModal } from '../components/OAuthSimulatorModal';
import { AppProviders } from '../../../app/providers';

describe('OAuthSimulatorModal Component', () => {
  it('renders development simulation disclaimer and platform name', () => {
    render(
      <AppProviders>
        <OAuthSimulatorModal
          isOpen={true}
          onClose={() => {}}
          platform="youtube"
          onSuccess={() => {}}
        />
      </AppProviders>
    );

    expect(screen.getByText(/Connect YouTube/i)).toBeInTheDocument();
    expect(screen.getByText(/Development Simulation:/i)).toBeInTheDocument();
    expect(screen.getByText(/Allow Access & Connect/i)).toBeInTheDocument();
  });

  it('triggers onSuccess and toast notification upon authorization', async () => {
    const handleSuccess = vi.fn();
    const handleClose = vi.fn();

    render(
      <AppProviders>
        <OAuthSimulatorModal
          isOpen={true}
          onClose={handleClose}
          platform="youtube"
          onSuccess={handleSuccess}
        />
      </AppProviders>
    );

    fireEvent.click(screen.getByRole('button', { name: /Allow Access & Connect/i }));

    await waitFor(() => {
      expect(handleSuccess).toHaveBeenCalled();
      expect(handleClose).toHaveBeenCalled();
    }, { timeout: 3000 });
  });
});
