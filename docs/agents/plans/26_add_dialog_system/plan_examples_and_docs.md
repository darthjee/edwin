# Plan: Examples & Documentation

## Step 1 — Update example games

Update both `examples/basic-rpg/game.js` and `examples/advanced-rpg/game.js`:

- Add a `portraitUrl` to all `NPC` instances (use any public image URL or relative asset as a placeholder)
- Add a `Player` instance with a `portraitUrl` (if `Player` is a new class)
- Add at least one dialog triggered **on scene entry** (call `game.displayDialog(dialog)` from a scene's `onEnter` or equivalent hook)
- Add at least one dialog triggered **by a player choice**, using `onEnd` to navigate to the next scene after the dialog closes

## Step 2 — Update `docs/agents/` documentation

### `docs/agents/architecture.md`

Add a section describing the dialog system:

- `Dialog`, `Message`, and `Character` entities and their relationships
- How `game.displayDialog()` triggers the dialog state
- How `DialogBox` reads and renders the active dialog

### `docs/agents/entities.md` (or a new `docs/agents/dialog.md`)

Document the new entities:
- `Character` — base class, fields, `getName()`, `portraitUrl`
- `Message` — `text`, optional `character`
- `Dialog` — `messages`, optional `onEnd`
- `Player` — if newly created, document its role and how it differs from `NPC`

### `docs/agents/folder-structure.md`

Update the `source/lib/entities/` table to list `Character`, `Message`, `Dialog`, and `Player`.

## Step 3 — Update `docs/HOW-TO-USE-EDWIN.md`

Add a "Dialogs" section covering:

- How to create a `Character` (via `NPC` or `Player`)
- How to create `Message` objects
- How to create a `Dialog` with an optional `onEnd` callback
- How to trigger a dialog with `game.displayDialog(dialog)`
- How to associate a dialog with a player choice
- Example snippet showing a complete NPC-player dialog

## Files to Change

| File | Change |
|------|--------|
| `examples/basic-rpg/game.js` | Add portrait URLs, dialogs |
| `examples/advanced-rpg/game.js` | Add portrait URLs, dialogs with `onEnd` |
| `docs/agents/architecture.md` | Add dialog system section |
| `docs/agents/entities.md` | Document new entities (or new `docs/agents/dialog.md`) |
| `docs/agents/folder-structure.md` | Update entities table |
| `docs/HOW-TO-USE-EDWIN.md` | Add "Dialogs" usage section |
