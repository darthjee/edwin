# Issue: Refactor Components

## Description

The components in `source/components` currently mix HTML rendering and behavior logic in a single file. This needs to be split into distinct, single-responsibility units.

## Problem

- Components in `source/components` combine HTML structure, rendering helpers, and control logic in one place, making them harder to maintain, test, and reason about.

## Expected Behavior

- Each component is split into three distinct parts:
  - **Component** — the React component responsible for rendering
  - **Helper** — a class that generates HTML/markup, placed in `source/lib/components/helpers`
  - **Controller** — a class controlling the actual code logic, placed in `source/lib/components/controllers`
- Documentation under `docs/agents` is updated to reflect the new structure.

## Solution

- Identify all components in `source/components` that mix concerns.
- Extract helper classes into `source/lib/components/helpers`.
- Extract controller classes into `source/lib/components/controllers`.
- Keep the React component as the thin rendering layer.
- When JSX/HTML appears behind a conditional (e.g., `someCondition && <JSX />`), extract that JSX into its own method to keep render logic minimal.
- Aim for the smallest possible methods — each method should do exactly one thing.
- Update `docs/agents` to document the new folder structure and conventions.

## Benefits

- Clearer separation of concerns — easier to understand and maintain each layer independently.
- Improved testability — helpers and controllers can be tested without rendering.
- More consistent codebase structure aligned with single-responsibility principles.

---
See issue for details: https://github.com/darthjee/edwin/issues/10
