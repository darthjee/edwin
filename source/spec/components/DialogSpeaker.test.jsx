import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import DialogSpeaker from '../../lib/components/DialogSpeaker.jsx';

describe('DialogSpeaker', () => {
  it('renders nothing without speaker', () => {
    const { container } = render(<DialogSpeaker speaker={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders speaker name and portrait', () => {
    render(<DialogSpeaker speaker={{ name: 'Innkeeper', portraitUrl: 'portrait.png' }} />);
    expect(screen.getByText('Innkeeper')).toBeInTheDocument();
    expect(screen.getByAltText('Innkeeper')).toHaveAttribute('src', 'portrait.png');
  });
});
