# Plan: Remove Hardcoded Directions

## Overview

Remove the `DIRECTION_LABELS` constant from `NavigationHelper` so the engine no longer knows about specific directions. Direction labels will be defined in the game data, co-located with the path they describe, using an object format.

## Context

`NavigationHelper.jsx` currently holds a hardcoded map of direction keys to display labels (e.g. `north → '↑ North'`). This couples the engine to a fixed vocabulary. The fix moves label ownership to the game definition, where each path value becomes an object with a `target` and a `label` field.

## Implementation Steps

### Step 1 — Update the path format in example games

Change `paths` values from plain location ID strings to objects:

```js
// before
paths: { north: 'town_square' }

// after
paths: { north: { target: 'town_square', label: '↑ North' } }
```

Apply to:
- `examples/basic-rpg/lib/locations.js`
- `examples/advanced-rpg/lib/locations.js` (including custom directions: `deeper`, `back`, `inside`)

### Step 2 — Update engine entities to handle the new path format

Any entity or helper that reads `paths` to resolve a target location ID must now read `path.target` instead of `path` directly. Identify all callers in `source/lib/` that access path values and update them.

### Step 3 — Update `NavigationHelper`

- Remove the `DIRECTION_LABELS` constant.
- Update `getLabel(direction, path)` to return `path.label` (falling back to `direction` if no label is provided, for safety).
- Update `getExits` if it needs to return `{ direction, label, target }` tuples instead of just keys.

### Step 4 — Update the component that uses `NavigationHelper`

The navigation component must pass the full path object when calling `getLabel`, rather than just the direction key.

### Step 5 — Update specs

- Update `source/spec/components/helpers/` tests for `NavigationHelper` to reflect the new `getLabel` signature.
- Update any example specs that reference the old path format.

## Files to Change

- `source/lib/components/helpers/NavigationHelper.jsx` — remove `DIRECTION_LABELS`, update `getLabel`
- `source/lib/components/` — update the navigation component to pass path objects to the helper
- `source/spec/components/helpers/` — update `NavigationHelper` tests
- `examples/basic-rpg/lib/locations.js` — convert paths to `{ target, label }` objects
- `examples/advanced-rpg/lib/locations.js` — convert paths to `{ target, label }` objects
- `examples/*/spec/` — update example specs if they reference path values

## Notes

- The fallback `path.label ?? direction` in `getLabel` is a safety net; ideally all paths define a label.
- Steps 2 and 4 depend on a codebase survey to find all callers of path values — the exact files are TBD until the code is explored.
