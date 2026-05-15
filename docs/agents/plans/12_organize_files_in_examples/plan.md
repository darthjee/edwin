# Plan: Organize Files in Examples

## Overview

Reorganize the JS files in `examples/basic-rpg/` and `examples/advanced-rpg/` by moving them into a `lib/` subdirectory and splitting them into smaller, focused modules to improve structure and testability.

## Context

Both example apps currently have all their JavaScript placed at the root of each example folder (`game.js`, `main.jsx`). This mirrors the source library's own structure, where source code lives under `lib/`. Moving example JS into `lib/` and splitting it into multiple files makes each example easier to navigate, test independently, and extend.

## Implementation Steps

### Step 1 — Create `lib/` in each example

Create a `lib/` subdirectory inside `examples/basic-rpg/` and `examples/advanced-rpg/`.

### Step 2 — Split `game.js` into domain modules

Break `game.js` into multiple files under `lib/`, each representing a distinct concern of the game world. Likely splits (to be confirmed after inspecting the file):

- `lib/locations.js` — location definitions
- `lib/npcs.js` — NPC definitions
- `lib/items.js` — item definitions
- `lib/actions.js` — action definitions
- `lib/game.js` — assembles the above into the top-level `Game` instance

Apply the same split to both examples, adapting to whatever concepts each one contains.

### Step 3 — Update `main.jsx` to import from `lib/`

Update the import in `main.jsx` (or wherever the `Game` instance is consumed) to point to the new `lib/game.js` entry point.

### Step 4 — Verify examples still run

Start each example dev server and confirm the game loads and plays correctly after the reorganization.

## Files to Change

- `examples/basic-rpg/game.js` — split into multiple files under `examples/basic-rpg/lib/`
- `examples/basic-rpg/main.jsx` — update import path to `./lib/game.js`
- `examples/advanced-rpg/game.js` — split into multiple files under `examples/advanced-rpg/lib/`
- `examples/advanced-rpg/main.jsx` — update import path to `./lib/game.js`

## Notes

- The exact split of `game.js` depends on what concepts each example defines — this plan assumes locations, NPCs, items, and actions, but the actual breakdown should follow the file's content.
- No changes to `index.html`, `vite.config.js`, or `package.json` are expected unless import aliases need updating.
- Adding tests for the new modules is out of scope for this issue but becomes possible once the code is split.
