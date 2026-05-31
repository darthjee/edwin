import { describe, it, expect } from 'vitest';
import { Character } from '../../lib/entities/Character.js';
import { Message } from '../../lib/entities/Message.js';

describe('Message', () => {
  it('requires text', () => {
    expect(() => new Message({})).toThrow('Message requires text.');
  });

  it('accepts optional character speaker', () => {
    const speaker = new Character({ id: 'npc', name: 'Innkeeper' });
    const message = new Message({ text: 'Welcome!', character: speaker });
    expect(message.character.getName()).toBe('Innkeeper');
  });

  it('validates speaker interface', () => {
    expect(() => new Message({ text: 'x', character: {} })).toThrow('Message character must implement getName().');
  });
});
