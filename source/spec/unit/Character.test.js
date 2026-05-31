import { describe, it, expect } from 'vitest';
import { Character } from '../../lib/entities/Character.js';

describe('Character', () => {
  it('requires id and name', () => {
    expect(() => new Character({ name: 'Hero' })).toThrow('Character requires an id.');
    expect(() => new Character({ id: 'hero' })).toThrow('Character requires a name.');
  });

  it('exposes getName and portraitUrl', () => {
    const character = new Character({ id: 'hero', name: 'Hero', portraitUrl: '/hero.png' });
    expect(character.getName()).toBe('Hero');
    expect(character.portraitUrl).toBe('/hero.png');
  });
});
