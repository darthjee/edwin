/**
 * @file Dialog – ordered message sequence with optional completion callback.
 */

import { Message } from './Message.js';

export class Dialog {
  constructor({ messages = [], onEnd = null }) {
    this.messages = messages;
    this.onEnd = onEnd;
  }

  get messages() {
    return [...this._messages];
  }

  set messages(messages) {
    if (!Array.isArray(messages)) { throw new Error('Dialog messages must be an array.'); }
    this._messages = messages.map((message) => (
      message instanceof Message ? message : new Message(message)
    ));
  }

  get onEnd() {
    return this._onEnd;
  }

  set onEnd(onEnd) {
    if (onEnd !== null && typeof onEnd !== 'function') {
      throw new Error('Dialog onEnd must be a function.');
    }
    this._onEnd = onEnd;
  }

  toJSON() {
    return {
      messages: this._messages.map((message) => message.toJSON()),
    };
  }
}

export default Dialog;
