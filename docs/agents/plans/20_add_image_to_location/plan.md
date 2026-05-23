# Plan: Add Image to Location

## Overview

Add an optional `image` URL field to the `Location` entity and render it in `LocationView` above the location name and description. When absent, nothing extra is rendered.

## Context

- `Location` currently accepts: `id`, `name`, `description`, `shortDescription`, `paths`, `items`, `npcs`, `properties`.
- `LocationView` renders: name (`<h2>`), description (`<p>`), items list, NPCs list.
- Per architecture rules, any conditionally rendered JSX must be extracted into a helper method on `LocationViewHelper`.

## Implementation Steps

### Step 1 — Extend the `Location` entity

In `source/lib/entities/Location.js`:
- Add `image = null` as an optional constructor parameter.
- Store it as `this.image`.
- Include it in `toJSON()`.
- Update the JSDoc `@param` block.

### Step 2 — Add image rendering to `LocationViewHelper`

In `source/lib/components/helpers/LocationViewHelper.jsx`:
- Add a `renderImage(location)` method that returns an `<img>` with:
  - `src={location.image}`
  - `alt={location.name}`
  - Bootstrap classes `img-fluid w-100 mb-3`
- Return `null` when `location.image` is falsy.

### Step 3 — Wire the image into `LocationView`

In `source/lib/components/LocationView.jsx`:
- Call `helper.renderImage(location)` as the first child inside the wrapper `<div>`, before the `<h2>` name.
- Add `image: PropTypes.string` to the `PropTypes` shape.

### Step 4 — Update the example apps

In `examples/basic-rpg/lib/locations.js` and `examples/advanced-rpg/lib/locations.js`:
- Add `image: 'https://placehold.co/800x300'` to each location definition.

### Step 5 — Update tests

- `source/spec/unit/Location.test.js`: assert that `image` is stored and serialised in `toJSON()`, and defaults to `null`.
- `source/spec/components/LocationView.test.jsx`: assert the `<img>` is rendered with correct `src` and `alt` when `image` is provided, and absent when omitted.
- `source/spec/components/helpers/LocationViewHelper.test.jsx` (or equivalent): unit-test `renderImage`.

## Files to Change

- `source/lib/entities/Location.js` — add `image` field
- `source/lib/components/helpers/LocationViewHelper.jsx` — add `renderImage` method
- `source/lib/components/LocationView.jsx` — call `renderImage`, add PropType
- `examples/basic-rpg/lib/locations.js` — placeholder image URLs
- `examples/advanced-rpg/lib/locations.js` — placeholder image URLs
- `source/spec/unit/Location.test.js` — new field tests
- `source/spec/components/LocationView.test.jsx` — image rendering tests
- `source/spec/components/helpers/LocationViewHelper.test.jsx` — `renderImage` unit tests

## Notes

- Placeholder URL `https://placehold.co/800x300` will be replaced later when an `assets/` folder is introduced.
- No migration needed — `image` defaults to `null` and existing games without it are unaffected.
