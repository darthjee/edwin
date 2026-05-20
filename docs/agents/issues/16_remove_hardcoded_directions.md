# Issue: Remove Hardcoded Directions

## Description

`source/lib/components/helpers/NavigationHelper.jsx` contains a hardcoded `DIRECTION_LABELS` map that defines direction names (north, south, east, west, up, down, in, out) along with their display labels and arrow symbols. The game engine should not be aware of game-specific content like direction names — this information belongs in the consumer applications (example projects or any app using Edwin).

## Problem

- `DIRECTION_LABELS` in `NavigationHelper.jsx` couples the engine to a specific set of directions and labels.
- Adding or renaming directions requires modifying the engine source instead of the game definition.
- The engine imposes a default vocabulary on all games, which may not match every game's world model.

## Expected Behavior

- Direction labels should be defined in the game definition (e.g., the example projects), not inside the engine.
- `NavigationHelper` should render whatever label the game definition supplies, without any built-in fallback dictionary.

## Solution

- Remove the `DIRECTION_LABELS` constant from `NavigationHelper.jsx`.
- Update `getLabel` to accept the label directly from the path/scene definition rather than looking it up internally.
- Update the example projects to supply direction labels as part of their game data.

## Benefits

- Keeps the engine generic and reusable across games with different navigation models.
- Gives game authors full control over direction naming and iconography.

---
See issue for details: https://github.com/darthjee/edwin/issues/16
