import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DialogBox from '../../lib/components/DialogBox.jsx';

describe('DialogBox', () => {
  const dialog = {
    messages: [
      { text: 'Welcome hero!', character: { id: 'npc', name: 'Innkeeper', portraitUrl: '' } },
      { text: 'The cellar is downstairs.', character: null },
    ],
  };

  it('renders first message and speaker', () => {
    render(<DialogBox dialog={dialog} onClose={vi.fn()} />);
    expect(screen.getByText('Welcome hero!')).toBeInTheDocument();
    expect(screen.getByText('Innkeeper')).toBeInTheDocument();
  });

  it('hides Previous button on first message and shows after Next', () => {
    render(<DialogBox dialog={dialog} onClose={vi.fn()} />);
    expect(screen.queryByText('Previous')).toBeNull();
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Previous')).toBeInTheDocument();
  });

  it('calls onClose when advancing past the last message', () => {
    const onClose = vi.fn();
    render(<DialogBox dialog={dialog} onClose={onClose} />);
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Next'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
