# Issue: Add Image to Location

## Description

When defining a `Location`, it should be possible to provide an optional `image` attribute that is displayed as a visual representation of the place.

## Problem

- The `Location` class has no `image` field — there is no way to associate an image with a location.
- `LocationView` does not render any image, so even if an image URL were stored (e.g. via `properties`), it would never be displayed.

## Expected Behavior

- A `Location` can be defined with an optional `image` attribute (e.g. a URL or asset path).
- When the `image` attribute is present, `LocationView` displays it as a picture depicting the location.
- When no `image` attribute is provided, no image element is rendered (current behaviour is preserved).
- For the example apps, placeholder images are used in place of real assets.

## Solution

- Add an optional `image` parameter (URL string, default `null`) to the `Location` constructor.
- Store it as `this.image` and include it in `toJSON()`.
- Update `LocationView` to render an `<img>` **above the location name and description** when `location.image` is truthy; render nothing extra when it is absent.
- Add `image: PropTypes.string` to the `PropTypes` shape in `LocationView`.
- Use a placeholder URL (e.g. `https://placehold.co/800x300`) in the example apps (`basic-rpg` and `advanced-rpg`); real asset paths will be added later when an `assets/` folder is introduced.

## Benefits

- Enriches the visual experience of the game without breaking existing games that omit the field.
- Keeps the API consistent with how other optional attributes (e.g. `shortDescription`) are handled.

---
See issue for details: https://github.com/darthjee/edwin/issues/20
