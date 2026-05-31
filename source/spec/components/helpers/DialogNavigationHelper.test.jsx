import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DialogNavigationHelper } from '../../../lib/components/helpers/DialogNavigationHelper.jsx';

describe('DialogNavigationHelper', () => {
  it('renders previous and next buttons when previous is enabled', () => {
    render(<div>{DialogNavigationHelper.renderNavigation(true, vi.fn(), vi.fn())}</div>);
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('renders only next button when previous is disabled', () => {
    render(<div>{DialogNavigationHelper.renderNavigation(false, vi.fn(), vi.fn())}</div>);
    expect(screen.queryByText('Previous')).toBeNull();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });
});
