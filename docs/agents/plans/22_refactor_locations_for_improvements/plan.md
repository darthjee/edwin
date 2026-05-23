# Plan: Refactor Locations for Improvements

## Overview

Refactor the `Location` entity to use private attributes exposed via getters, and introduce a `Path` class to encapsulate path definitions between locations. The change must remain backward-compatible and be reflected across the library, examples, and documentation.

## Context

Currently, `Location` attributes are all public and paths are plain JSON objects. This prevents developers from extending `Location` or `Path` with custom behavior. After this refactor:
- `Location` attributes become private, accessed via getter methods.
- `Path` becomes a first-class class that can be subclassed.
- When defining paths, developers may pass a plain JSON object (auto-wrapped in `Path`) or a custom `Path` subclass instance.

## Implementation Steps

### Step 1 — Introduce the `Path` class

Create `source/lib/entities/path.js` with a `Path` base class that:
- Accepts a plain JSON object in its constructor (storing path properties as private attributes).
- Exposes getters for all relevant path properties (e.g., destination, label, conditions).

### Step 2 — Refactor `Location` attributes to private with getters

In `source/lib/entities/location.js`:
- Convert all public attributes to private (e.g., using `#` private fields or a naming convention).
- Add public getter methods for each attribute.

### Step 3 — Wrap plain path definitions in `Path`

Update the `Location` class to normalize path definitions at construction time:
- If a path entry is a plain JSON object, wrap it in a `Path` instance.
- If it is already a `Path` instance (or subclass), use it as-is.

### Step 4 — Update tests

- Add unit tests for the new `Path` class in `source/spec/entities/`.
- Update existing `Location` tests to reflect the new private attribute / getter API.

### Step 5 — Update examples

Review `examples/basic-rpg/game.js` and `examples/advanced-rpg/game.js` to verify that existing path definitions (plain JSON) still work correctly with the new wrapping behavior. Adjust if any example uses attributes directly.

### Step 6 — Update documentation

- Review `docs/agents/architecture.md` and any other files under `docs/agents/` that describe the `Location` entity or path definitions, and update them to reflect the new API.
- Review `docs/HOW-TO-USE-EDWIN.md` and update any sections that show how to define locations and paths.

## Files to Change

- `source/lib/entities/path.js` — new `Path` class
- `source/lib/entities/location.js` — private attributes, getters, path normalization
- `source/lib/index.js` — export `Path` as part of the public API
- `source/spec/entities/path.spec.js` — new tests for `Path`
- `source/spec/entities/location.spec.js` — update tests to use getters
- `examples/basic-rpg/game.js` — verify / update path definitions
- `examples/advanced-rpg/game.js` — verify / update path definitions
- `docs/agents/architecture.md` — update entity descriptions if needed
- `docs/HOW-TO-USE-EDWIN.md` — update usage examples for locations and paths

## Notes

- Backward-compatibility: plain JSON path definitions must continue to work — they are auto-wrapped in `Path`.
- `Path` is part of the public API and must be exported from `source/lib/index.js` so developers can subclass it.
- Open question: which private field strategy to use — JS native `#` private fields or a convention like `_name`? Should follow whatever convention `Location` and other entities already use.
