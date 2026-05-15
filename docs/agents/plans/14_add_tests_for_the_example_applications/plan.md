# Plan: Add Tests for the Example Applications

## Overview

Add a Vitest test suite to both `examples/basic-rpg/` and `examples/advanced-rpg/`, mirroring the structure used in `source/`. Update CircleCI with two new jobs (`basic_example_jasmine` and `advanced_example_jasmine`) to run them in CI.

## Context

The example apps were refactored in issue #12 so that all game logic lives in `lib/` modules (items, interactions, npcs, locations, actions, game). Those modules are now pure JS with no React dependency, making them straightforwardly testable with Vitest — the same test runner used in `source/`.

## Implementation Steps

### Step 1 — Configure Vitest for `examples/basic-rpg/`

- Add Vitest and coverage devDependencies to `examples/basic-rpg/package.json`
- Add `spec`, `test`, and `coverage` scripts
- Extend `examples/basic-rpg/vite.config.js` with a `test` block (globals, jsdom environment, setupFiles, coverage)
- Create `examples/basic-rpg/spec/setup.js` (imports `@testing-library/jest-dom`)

### Step 2 — Write specs for `examples/basic-rpg/lib/`

Create one spec file per domain module under `examples/basic-rpg/spec/unit/`:

- `items.test.js` — verifies `potion` properties (id, name, isPickable, isUsable)
- `interactions.test.js` — verifies `innkeeperDialogue` steps structure
- `npcs.test.js` — verifies `innkeeper` id, name, and linked dialogue
- `locations.test.js` — verifies `tavern` and `townSquare` ids, names, paths, npcs, items
- `game.test.js` — verifies `game` has correct id/title/start location and `manager` is a `GameStateManager`

### Step 3 — Configure Vitest for `examples/advanced-rpg/`

Same as Step 1, for `examples/advanced-rpg/`.

### Step 4 — Write specs for `examples/advanced-rpg/lib/`

Create one spec file per domain module under `examples/advanced-rpg/spec/unit/`:

- `items.test.js` — verifies `rustySword`, `silverKey`, `healingHerb` properties and `healingHerb.onUse` callback
- `interactions.test.js` — verifies `guardDialogue` and `merchantDialogue` step structure
- `npcs.test.js` — verifies `guard` and `merchant` (id, name, inventory)
- `locations.test.js` — verifies all five locations (ids, names, paths, npcs, items, lock state)
- `actions.test.js` — verifies `unlockVaultAction` condition and execute logic
- `game.test.js` — verifies `game` has correct id/title/start location and `manager` is a `GameStateManager`

### Step 5 — Update CircleCI

Add two new jobs to `.circleci/config.yml` and include them in the workflow. Each job must copy `source/` into `edwin/` inside the example folder before running tests — replicating the Docker volume mount (`./source:/home/node/app/edwin`) that makes the `edwin` alias resolve correctly at runtime.

```
cp -r source examples/basic-rpg/edwin
cd examples/basic-rpg; yarn install && npm run coverage
```

The `edwin/` copy must be excluded from coverage so only the example's own `lib/` code is reported.

## Files to Change

- `examples/basic-rpg/package.json` — add Vitest devDependencies and test scripts
- `examples/basic-rpg/vite.config.js` — add `test` block
- `examples/basic-rpg/spec/setup.js` — new file
- `examples/basic-rpg/spec/unit/items.test.js` — new file
- `examples/basic-rpg/spec/unit/interactions.test.js` — new file
- `examples/basic-rpg/spec/unit/npcs.test.js` — new file
- `examples/basic-rpg/spec/unit/locations.test.js` — new file
- `examples/basic-rpg/spec/unit/game.test.js` — new file
- `examples/advanced-rpg/package.json` — add Vitest devDependencies and test scripts
- `examples/advanced-rpg/vite.config.js` — add `test` block
- `examples/advanced-rpg/spec/setup.js` — new file
- `examples/advanced-rpg/spec/unit/items.test.js` — new file
- `examples/advanced-rpg/spec/unit/interactions.test.js` — new file
- `examples/advanced-rpg/spec/unit/npcs.test.js` — new file
- `examples/advanced-rpg/spec/unit/locations.test.js` — new file
- `examples/advanced-rpg/spec/unit/actions.test.js` — new file
- `examples/advanced-rpg/spec/unit/game.test.js` — new file
- `.circleci/config.yml` — add `basic_example_jasmine` and `advanced_example_jasmine` jobs and workflow entries

## CI Checks

Before opening a PR, run the following checks for the folders being modified (after copying source into `edwin/`):

- `examples/basic-rpg/`: `cp -r source examples/basic-rpg/edwin && cd examples/basic-rpg && npm run coverage` (CircleCI job: `basic_example_jasmine`)
- `examples/advanced-rpg/`: `cp -r source examples/advanced-rpg/edwin && cd examples/advanced-rpg && npm run coverage` (CircleCI job: `advanced_example_jasmine`)

## Notes

- The framework is Vitest, not Jasmine — the CI job names use "jasmine" for historical consistency with the existing `jasmine` job in `source/`.
- In Docker, `./source` is mounted at `./edwin` inside each example (see `docker-compose.yml`). In CircleCI, `source/` must be copied to `examples/<name>/edwin/` before running tests to replicate this.
- The `edwin/` copy inside each example must be excluded from Vitest coverage (add `'edwin/'` to the coverage `exclude` list in `vite.config.js`) so it does not inflate coverage metrics.
- Coverage upload (Codacy) is only wired up for the `source/` library; the example jobs should run coverage locally but not upload it.
