# Plan: Add Dialog System

## Overview

Introduce a full dialog system to Edwin across five areas:

1. [Entities](plan_entities.md) — `Character`, `Message`, `Dialog`, refactor `NPC`, create `Player`
2. [UI Component](plan_ui.md) — `DialogBox` (three-layer pattern)
3. [Integration](plan_integration.md) — Game state, `GameContainer`, public exports
4. [Examples & Docs](plan_examples_and_docs.md) — Example games and documentation updates
5. [Tests](plan_tests.md) — Specs for all new code

## Context

Edwin has no dialog system. `NPC` and `Player` need a shared `Character` abstraction (with `getName()` and a portrait URL). A `Dialog` holds an ordered list of `Message` objects and an optional `onEnd` callback. When active, a `DialogBox` renders at the bottom of the page — portrait + name on the left, message text on the right — with "Previous" / "Next" navigation. Scene choices are hidden while a dialog is open. Pressing "Next" on the last message closes the dialog and fires `onEnd`.

## Open Questions (resolve by reading the code)

- Does `Player` already exist as a class? If not, create `source/lib/entities/player.js`.

## Decisions

- State propagation: **GameStateManager + Hook** (Option A) — `activeDialog` lives in `GameStateManager`; the existing state hook exposes it to components.
