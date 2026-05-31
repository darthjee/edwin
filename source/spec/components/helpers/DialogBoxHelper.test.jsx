import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DialogBoxHelper } from '../../../lib/components/helpers/DialogBoxHelper.jsx';

describe('DialogBoxHelper', () => {
  it('renders message and speaker block', () => {
    render(
      DialogBoxHelper.renderDialog({
        activeMessage: { text: 'Welcome hero!' },
        speaker: { name: 'Innkeeper', portraitUrl: '' },
        showPrevious: false,
        onPrevious: vi.fn(),
        onNext: vi.fn(),
      })
    );

    expect(screen.getByText('Welcome hero!')).toBeInTheDocument();
    expect(screen.getByText('Innkeeper')).toBeInTheDocument();
  });
});
