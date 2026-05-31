# Plan: Entities — Dialog System

## Step 1 — Define the `Character` base class

Create `source/lib/entities/character.js` following the entity rules (`_` fields + getters/setters):

- `_name` — character name; expose `name` getter and `getName()` alias
- `_portraitUrl` — optional portrait image URL (UI falls back to silhouette when not set)

```js
export class Character {
  constructor({ name, portraitUrl = null }) {
    this._name = name;
    this._portraitUrl = portraitUrl;
  }

  get name() { return this._name; }
  getName() { return this._name; }

  get portraitUrl() { return this._portraitUrl; }
  set portraitUrl(url) { this._portraitUrl = url ?? null; }
}
```

## Step 2 — Refactor `NPC` to extend `Character`

Update `source/lib/entities/npc.js`:

- Extend `Character`
- Remove duplicate `_name` / `getName()` logic (now inherited)
- Pass `name` and `portraitUrl` to `super()`

## Step 3 — Create (or refactor) `Player`

If `Player` does not exist:

- Create `source/lib/entities/player.js` extending `Character`
- Follow the same entity pattern
- Export from `source/lib/index.js`

If `Player` already exists, refactor it to extend `Character` the same way as `NPC`.

## Step 4 — Implement `Message` entity

Create `source/lib/entities/message.js`:

- `_text` — the message string (required)
- `_character` — optional `Character` reference (nullable)
- Getters: `text`, `character`

```js
export class Message {
  constructor({ text, character = null }) {
    if (!text) throw new Error('Message requires text.');
    this._text = text;
    this._character = character ?? null;
  }

  get text() { return this._text; }
  get character() { return this._character; }
}
```

## Step 5 — Implement `Dialog` entity

Create `source/lib/entities/dialog.js`:

- `_messages` — ordered array of `Message` objects (required, non-empty)
- `_onEnd` — optional callback function (executed when the dialog closes)
- Getters: `messages` (defensive copy), `onEnd`

```js
export class Dialog {
  constructor({ messages, onEnd = null }) {
    if (!messages?.length) throw new Error('Dialog requires at least one message.');
    this._messages = [...messages];
    this._onEnd = onEnd ?? null;
  }

  get messages() { return [...this._messages]; }
  get onEnd() { return this._onEnd; }
}
```

## Files to Change

| File | Change |
|------|--------|
| `source/lib/entities/character.js` | **New** — `Character` base class |
| `source/lib/entities/message.js` | **New** — `Message` entity |
| `source/lib/entities/dialog.js` | **New** — `Dialog` entity |
| `source/lib/entities/npc.js` | Extend `Character`, remove duplicate name logic |
| `source/lib/entities/player.js` | Extend `Character` (create if missing) |
