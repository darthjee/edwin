import { describe, it, expect, vi } from 'vitest';
import { Dialog } from '../../lib/entities/Dialog.js';
import { Message } from '../../lib/entities/Message.js';

describe('Dialog', () => {
  it('normalizes message inputs', () => {
    const dialog = new Dialog({ messages: [{ text: 'Hello' }] });
    expect(dialog.messages[0]).toBeInstanceOf(Message);
  });

  it('validates onEnd callback', () => {
    expect(() => new Dialog({ messages: [], onEnd: 'x' })).toThrow('Dialog onEnd must be a function.');
  });

  it('keeps onEnd callback', () => {
    const onEnd = vi.fn();
    const dialog = new Dialog({ messages: [{ text: 'Bye' }], onEnd });
    expect(dialog.onEnd).toBe(onEnd);
  });
});
