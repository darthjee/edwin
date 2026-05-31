# Plan: Tests — Dialog System

## Entity Tests

### `source/spec/entities/character.spec.js`

- Constructor stores `name` and `portraitUrl`
- `name` getter and `getName()` return the name
- `portraitUrl` getter returns the URL (or `null` when not set)
- `portraitUrl` setter updates the value; `null`/`undefined` normalizes to `null`

### `source/spec/entities/message.spec.js`

- Constructor stores `text` and optional `character`
- Throws when `text` is missing
- `character` defaults to `null`
- Getters return stored values

### `source/spec/entities/dialog.spec.js`

- Constructor stores `messages` and optional `onEnd`
- Throws when `messages` is empty or missing
- `messages` getter returns a defensive copy
- `onEnd` defaults to `null`
- Getters return stored values

### `source/spec/entities/player.spec.js` (if `Player` is new)

- Same structure as NPC spec, confirming `Character` inheritance

## Component Tests

### `source/spec/components/controllers/dialog_box_controller.spec.js`

- `currentMessage()` returns first message on init
- `isFirst()` returns `true` on first message, `false` otherwise
- `isLast()` returns `true` on last message, `false` otherwise
- `next()` advances index when not on last message
- `next()` on last message calls `closeDialog` and fires `onEnd` if defined
- `prev()` goes back when not on first message
- `prev()` is a no-op on first message

### `source/spec/components/helpers/dialog_box_helper.spec.jsx`

- `portraitSection()` returns `null` when message has no character
- `portraitSection()` renders portrait image and character name when character is present
- Portrait image uses `portraitUrl` when set; falls back to silhouette asset when `portraitUrl` is `null`
- `messageSection()` renders message text
- `prevButton()` returns `null` when controller reports `isFirst()`
- `prevButton()` renders a button otherwise
- `nextButton()` always renders a button

## Files to Change

| File | Change |
|------|--------|
| `source/spec/entities/character.spec.js` | **New** |
| `source/spec/entities/message.spec.js` | **New** |
| `source/spec/entities/dialog.spec.js` | **New** |
| `source/spec/entities/player.spec.js` | **New** (if Player is new) |
| `source/spec/components/controllers/dialog_box_controller.spec.js` | **New** |
| `source/spec/components/helpers/dialog_box_helper.spec.jsx` | **New** |
