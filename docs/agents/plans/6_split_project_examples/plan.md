# Plan: Split Project Examples

## Overview

Move the example projects from `source/examples/` to a new top-level `examples/` directory. Each example becomes a standalone application with its own configuration files and its own Docker container, while Edwin's source code is mounted as a sibling dependency.

## Context

Currently, `basic-rpg` and `advanced-rpg` live inside `source/examples/`, which nests them inside the Edwin package tree. The goal is to promote them to first-class sibling applications at the project root, better reflecting how real consumers would use Edwin as an external npm package.

## Implementation Steps

### Step 1 — Move the example projects to the root

Move `source/examples/basic-rpg` and `source/examples/advanced-rpg` to `examples/basic-rpg` and `examples/advanced-rpg` at the project root.

Remove the now-empty `source/examples/` directory.

### Step 2 — Add standalone configuration files to each example

Each example needs its own project configuration to run independently:
- `package.json` — declares the app, its scripts, and dependencies (including Edwin as a local path dependency)
- `vite.config.js` — dev server and build configuration
- `.eslintrc.json` — linting rules

### Step 3 — Update import paths inside the examples

Since Edwin no longer lives as a parent folder but as a sibling mounted at `./edwin`, all imports referencing Edwin inside the examples must be updated to use the new path or package name.

### Step 4 — Update `docker-compose.yml`

Add separate service entries (or update existing ones) for each example container:
- Mount point for the example app: `./examples/<folder>:/home/node/app`
- Mount point for Edwin source: `./source/lib:/home/node/app/edwin`

`node_modules` can remain shared for now (no change needed there).

### Step 5 — Update `docs/agents/folder-structure.md` and add an examples doc

- Update `docs/agents/folder-structure.md` to reflect the new top-level `examples/` directory.
- Add a new file `docs/agents/examples.md` documenting the structure and purpose of the examples folder, how each example is configured, and how Edwin is injected as a sibling dependency.

## Files to Change

- `source/examples/basic-rpg/` → `examples/basic-rpg/` (move)
- `source/examples/advanced-rpg/` → `examples/advanced-rpg/` (move)
- `examples/basic-rpg/package.json` — new file
- `examples/basic-rpg/vite.config.js` — new file
- `examples/basic-rpg/.eslintrc.json` — new file
- `examples/advanced-rpg/package.json` — new file
- `examples/advanced-rpg/vite.config.js` — new file
- `examples/advanced-rpg/.eslintrc.json` — new file
- `docker-compose.yml` — add/update service definitions for both examples
- `docs/agents/folder-structure.md` — add `examples/` entry
- `docs/agents/examples.md` — new file documenting examples structure

## Notes

- `node_modules` sharing strategy should be revisited in a future issue once the examples are fully standalone.
- The exact Edwin import path inside each example depends on how Vite resolves the sibling mount — this may need an alias in `vite.config.js`.
- It is unclear whether the examples currently share the same `vite.config.js` or have separate ones; this should be verified before Step 2.
