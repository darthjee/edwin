# Plan: Refactor Components

## Overview

Split each component in `source/lib/components/` into three single-responsibility units: a thin React component, a helper class (HTML/markup generation), and a controller class (logic). Extract any conditional JSX blocks into dedicated methods and aim for the smallest possible methods throughout.

## Context

Components in `source/lib/components/` currently mix rendering, HTML generation, and behaviour logic in a single file. This makes them harder to maintain and test. The refactor introduces two new subdirectories — `helpers/` and `controllers/` — and a strict method-size discipline: any JSX guarded by a condition (e.g. `flag && <JSX />`) must be extracted into its own method.

## Implementation Steps

### Step 1 — Audit existing components

Review each file in `source/lib/components/` and classify what logic belongs to which layer (component / helper / controller). Document any conditional JSX blocks that need extraction.

### Step 2 — Create the new subdirectories

Create `source/lib/components/helpers/` and `source/lib/components/controllers/` with appropriate index files if needed.

### Step 3 — Extract helper classes

For each component, extract HTML/markup-generation logic into a class in `source/lib/components/helpers/`. The helper should have no knowledge of React or component lifecycle.

### Step 4 — Extract controller classes

Extract behaviour and state-control logic into a class in `source/lib/components/controllers/`. Controllers should be plain JS classes with no JSX.

### Step 5 — Slim down the React components

After extraction, each React component should be a thin rendering layer. Any remaining conditional JSX (`condition && <Block />`) must be extracted into a dedicated render method (e.g. `renderBlock()`). Aim for the smallest possible methods throughout.

### Step 6 — Write specs for new files

Each new helper and controller class must have its own dedicated spec file in `source/spec/`, mirroring the source structure (e.g. `source/spec/lib/components/helpers/foo_helper.spec.js`). Ensure existing component specs still pass.

### Step 7 — Update documentation

Update `docs/agents/architecture.md` and `docs/agents/folder-structure.md` to describe the new `helpers/` and `controllers/` subdirectories and the method-size convention.

## Files to Change

- `source/lib/components/*.jsx` — slimmed-down React components (thin rendering layer only)
- `source/lib/components/helpers/` — new folder; one helper class per component
- `source/lib/components/controllers/` — new folder; one controller class per component
- `source/spec/lib/components/helpers/*.spec.js` — one spec file per helper class
- `source/spec/lib/components/controllers/*.spec.js` — one spec file per controller class
- `source/spec/lib/components/*.spec.jsx` — existing component specs updated as needed
- `docs/agents/architecture.md` — document new structure and conventions
- `docs/agents/folder-structure.md` — add entries for `helpers/` and `controllers/`

## Notes

- Do not look at implementation details until the user confirms this plan.
- The order of Step 3 and Step 4 can be swapped per component — do whichever is easier to isolate first.
- "Smallest possible methods" is a guiding principle, not a hard line count — use judgment.
- Helpers and controllers should be independently unit-testable (no React renderer needed).
