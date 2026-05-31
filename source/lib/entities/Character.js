/**
 * @file Character – base speaker abstraction shared by NPC and Player.
 */

export class Character {
  constructor({ id, name, portraitUrl = null }) {
    if (!id) { throw new Error('Character requires an id.'); }
    if (!name) { throw new Error('Character requires a name.'); }

    this._id = id;
    this._name = name;
    this._portraitUrl = portraitUrl ?? null;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    if (!id) { throw new Error('Character requires an id.'); }
    this._id = id;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    if (!name) { throw new Error('Character requires a name.'); }
    this._name = name;
  }

  get portraitUrl() {
    return this._portraitUrl;
  }

  set portraitUrl(portraitUrl) {
    this._portraitUrl = portraitUrl ?? null;
  }

  getName() {
    return this._name;
  }

  toJSON() {
    return {
      id: this._id,
      name: this._name,
      portraitUrl: this._portraitUrl,
    };
  }
}

export default Character;
