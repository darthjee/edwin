import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import DialogNavigation from '../../lib/components/DialogNavigation.jsx';

describe('DialogNavigation', () => {
  it('hides previous button when disabled', () => {
    render(<DialogNavigation showPrevious={false} onPrevious={vi.fn()} onNext={vi.fn()} />);
    expect(screen.queryByText('Previous')).toBeNull();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('handles previous and next clicks', () => {
    const onPrevious = vi.fn();
    const onNext = vi.fn();

    render(<DialogNavigation showPrevious onPrevious={onPrevious} onNext={onNext} />);

    fireEvent.click(screen.getByText('Previous'));
    fireEvent.click(screen.getByText('Next'));

    expect(onPrevious).toHaveBeenCalledTimes(1);
    expect(onNext).toHaveBeenCalledTimes(1);
  });
});
