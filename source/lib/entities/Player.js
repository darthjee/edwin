/**
 * @file Player – the player character representation.
 */

import { Character } from './Character.js';

export class Player extends Character {
  constructor({ id, name, portraitUrl = null, properties = {} }) {
    super({ id, name, portraitUrl });
    this._properties = { ...properties };
  }

  get properties() {
    return { ...this._properties };
  }

  set properties(properties) {
    this._properties = { ...(properties ?? {}) };
  }

  toJSON() {
    return {
      ...super.toJSON(),
      properties: { ...this._properties },
    };
  }
}

export default Player;
