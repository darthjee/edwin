# Issue: Split Project Examples

## Description

The example projects currently live inside the source project (`source/examples`). They need to be moved to the root of the project as `/examples`, making them standalone applications with their own configuration files.

## Problem

- Example projects are nested inside the source directory (`source/examples`), tightly coupling them to the main project structure.
- They lack their own `package.json`, `.eslintrc.json`, `vite.config.js`, and similar configuration files needed to run as independent applications.
- The current Docker Compose setup does not treat them as separate mount points.
- Imports within the examples are incorrect for a sibling-folder structure.

## Expected Behavior

- Two standalone example projects at:
  - `examples/basic-rpg`
  - `examples/advanced-rpg`
- Each example has its own project configuration files (`package.json`, `.eslintrc.json`, `vite.config.js`, etc.).
- Each example has its own container with separate mount points:
  - `./examples/<folder>:/home/node/app`
  - `./source/lib:/home/node/app/edwin` (to access Edwin source code)
- Imports updated to reflect that Edwin lives side-by-side with the examples rather than as a parent folder.
- `node_modules` can remain shared across all three containers for now.
- `docs/agents` updated with a dedicated file explaining the examples folder structure.

## Solution

- Move `source/examples/basic-rpg` and `source/examples/advanced-rpg` to `examples/basic-rpg` and `examples/advanced-rpg` at the project root.
- Add independent configuration files (`package.json`, `.eslintrc.json`, `vite.config.js`, etc.) to each example folder.
- Update `docker-compose.yml` to add separate services/mount points for each example.
- Update import paths inside both examples to reference Edwin as a sibling dependency.
- Add a documentation file under `docs/agents/` describing the examples structure.

## Benefits

- Clearer separation of concerns between the Edwin library and the example applications.
- Example projects can be developed and run independently.
- Easier for external contributors to understand and run the examples.
- Better reflects real-world usage of Edwin as an external npm package.

---
See issue for details: https://github.com/darthjee/edwin/issues/6
