import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Play } from 'lucide-react';

describe('Button & IconButton UI Components', () => {
  it('renders button text correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('triggers onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Submit</Button>);
    fireEvent.click(screen.getByText('Submit'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables button when isLoading is true', () => {
    render(<Button isLoading>Save</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('IconButton requires aria-label', () => {
    render(<IconButton icon={<Play />} aria-label="Play video" />);
    expect(screen.getByRole('button', { name: /play video/i })).toBeInTheDocument();
  });
});
