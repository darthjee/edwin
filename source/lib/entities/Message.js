import { Character } from './Character.js';

/**
 * @file Message – dialog message with optional speaker.
 */

export class Message {
  constructor({ text, character = null }) {
    if (!text) { throw new Error('Message requires text.'); }
    if (character && !(character instanceof Character)) {
      throw new Error('Message character must be a Character.');
    }

    this._text = text;
    this._character = character;
  }

  get text() {
    return this._text;
  }

  set text(text) {
    if (!text) { throw new Error('Message requires text.'); }
    this._text = text;
  }

  get character() {
    return this._character;
  }

  set character(character) {
    if (character && !(character instanceof Character)) {
      throw new Error('Message character must be a Character.');
    }
    this._character = character;
  }

  toJSON() {
    return {
      text: this._text,
      character: this._character?.toJSON?.() ?? null,
    };
  }
}

export default Message;
