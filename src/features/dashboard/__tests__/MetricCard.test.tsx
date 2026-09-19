import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MetricCard } from '../components/MetricCard';
import { Users } from 'lucide-react';

describe('MetricCard Component', () => {
  it('renders label, value, and positive change indicator correctly', () => {
    render(
      <MetricCard
        label="Total Audience"
        value="248.4K"
        change={8.6}
        icon={<Users data-testid="users-icon" />}
      />
    );

    expect(screen.getByText('Total Audience')).toBeInTheDocument();
    expect(screen.getByText('248.4K')).toBeInTheDocument();
    expect(screen.getByText('+8.6%')).toBeInTheDocument();
  });

  it('renders null values safely with placeholder', () => {
    render(
      <MetricCard
        label="Shares"
        value={null}
        icon={<Users />}
      />
    );

    expect(screen.getByText('Shares')).toBeInTheDocument();
    expect(screen.getByText('—')).toBeInTheDocument();
  });
});
