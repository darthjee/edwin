# Issue: Organize Files in Examples

## Description

The example projects (`examples/basic-rpg` and `examples/advanced-rpg`) currently have all their JavaScript files placed directly in the root of each folder. They need to be reorganized for better structure and testability.

## Problem

- JS files in `examples/basic-rpg` and `examples/advanced-rpg` are all placed at the root level of each example folder.
- The flat structure makes it harder to test individual parts of the examples.
- No separation between library/logic code and entry-point files.

## Expected Behavior

- JS files should be moved into a `lib/` subdirectory within each example folder.
- The code should be split into multiple files to make each unit easier to test independently.

## Solution

- Create a `lib/` folder inside `examples/basic-rpg` and `examples/advanced-rpg`.
- Break the existing JS files into smaller, focused modules placed under `lib/`.
- Update any imports or entry points to reflect the new file locations.

## Benefits

- Cleaner project structure that mirrors how a real project would be organized.
- Enables unit testing of individual example modules.
- Easier to navigate and understand each example.

---
See issue for details: https://github.com/darthjee/edwin/issues/12
