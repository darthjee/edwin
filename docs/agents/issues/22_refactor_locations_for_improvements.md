# Issue: Refactor Locations for Improvements

## Description

Currently, locations are defined with all attributes public. This refactor aims to improve encapsulation and extensibility by introducing private attributes with getters and promoting paths to first-class objects.

## Problem

- Location attributes are all public, preventing controlled access and extension.
- Paths between locations are plain JSON objects, offering no way to customize behavior through inheritance.

## Expected Behavior

- Location attributes should be private and accessed through getters, enabling subclasses to override behavior.
- Paths between locations should be classes (inheriting from a `Path` base class) so that custom path behavior can be defined.
- When defining paths from a location, the developer should be able to pass either a plain JSON object (automatically wrapped in `Path`) or a custom class that inherits from `Path`.

## Solution

- Make location attributes private and expose them via getter methods.
- Introduce a `Path` class to encapsulate path definitions.
- Update location path definitions to accept both raw JSON objects (wrapped into `Path`) and custom `Path` subclass instances.

## Benefits

- Improved encapsulation and a cleaner public API for locations.
- Allows developers to extend `Location` and `Path` to add custom behavior without modifying core code.
- Backward-compatible: plain JSON path definitions continue to work.

---
See issue for details: https://github.com/darthjee/edwin/issues/22
