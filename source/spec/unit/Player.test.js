import { describe, it, expect } from 'vitest';
import { Player } from '../../lib/entities/Player.js';

describe('Player', () => {
  it('inherits character behavior', () => {
    const player = new Player({ id: 'player', name: 'Ari', portraitUrl: '/ari.png' });
    expect(player.getName()).toBe('Ari');
    expect(player.portraitUrl).toBe('/ari.png');
  });

  it('serializes properties', () => {
    const player = new Player({ id: 'player', name: 'Ari', properties: { rank: 'rookie' } });
    expect(player.toJSON().properties).toEqual({ rank: 'rookie' });
  });
});
