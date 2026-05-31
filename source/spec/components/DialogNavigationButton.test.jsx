import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import DialogNavigationButton from '../../lib/components/DialogNavigationButton.jsx';

describe('DialogNavigationButton', () => {
  it('renders label and variant class', () => {
    render(<DialogNavigationButton label="Next" variant="primary" onClick={vi.fn()} />);
    const button = screen.getByText('Next');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn-primary');
  });

  it('calls callback on click', () => {
    const onClick = vi.fn();
    render(<DialogNavigationButton label="Previous" variant="outline-secondary" onClick={onClick} />);
    fireEvent.click(screen.getByText('Previous'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
