# Plan: Integration — Game State & GameContainer

## Step 1 — Add dialog state to `Game` / `GameStateManager`

The chosen approach is **Option A — GameStateManager + Hook**:

- Add `activeDialog` to the state managed by `GameStateManager` (in `source/lib/core/`)
- `game.displayDialog(dialog)` updates `activeDialog` in the manager
- `game.closeDialog()` clears `activeDialog` and fires `dialog.onEnd()` if defined
- The existing state hook (e.g., `useGameState`) must be updated to expose `activeDialog` so components can read it and re-render when the dialog changes

> The exact field names and update mechanism must be confirmed by reading the code, but the pattern is fixed.

## Step 2 — Update `GameContainer` to render `DialogBox`

Update `source/lib/components/GameContainer.jsx` (or equivalent top-level component):

- Import and render `<DialogBox />` at the bottom of the page when `activeDialog` is set
- Pass `dialog={activeDialog}` and `onClose={game.closeDialog}` as props
- Hide the scene choices component (e.g., `<ChoiceList />`) while `activeDialog` is set

## Step 3 — Export new entities from `index.js`

Update `source/lib/index.js` to re-export:

- `Character`
- `Message`
- `Dialog`
- `Player` (if newly created)

## Files to Change

| File | Change |
|------|--------|
| `source/lib/entities/game.js` | Add `displayDialog()`, `closeDialog()`, `activeDialog` state |
| `source/lib/core/GameStateManager.js` | Add `activeDialog` to managed state (if applicable) |
| `source/lib/hooks/useGameState.js` (or equivalent) | Expose `activeDialog` (if applicable) |
| `source/lib/components/GameContainer.jsx` | Render `DialogBox`, hide choices when dialog active |
| `source/lib/index.js` | Export `Character`, `Message`, `Dialog`, `Player` |

## Notes

- `closeDialog()` must fire `onEnd` *after* clearing `activeDialog` to avoid re-rendering the closed dialog.
- The exact field names and hook API must be confirmed by reading `source/lib/core/` and `source/lib/hooks/` before implementing.
