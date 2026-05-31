import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DialogMessage from '../../lib/components/DialogMessage.jsx';

describe('DialogMessage', () => {
  it('renders dialog text with the expected classes', () => {
    render(<DialogMessage text="Welcome, traveler." />);

    const message = screen.getByText('Welcome, traveler.');

    expect(message).toBeInTheDocument();
    expect(message).toHaveClass('dialog-box__text', 'mb-0');
    expect(message.parentElement).toHaveClass('dialog-box__content');
  });
});
