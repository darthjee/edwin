# Issue: Add Tests for the Example Applications

## Description

The example applications (`basic-rpg` and `advanced-rpg`) currently have no test suite. Tests should be added following the same structure used in the `source/` library, using Jasmine.

## Problem

- `examples/basic-rpg/` has no test suite
- `examples/advanced-rpg/` has no test suite
- CircleCI has no jobs to run example application tests

## Expected Behavior

- Each example app has a Jasmine test suite covering its domain modules
- CircleCI runs `basic_example_jasmine` and `advanced_example_jasmine` jobs as part of the pipeline

## Solution

- Add Jasmine test configuration and spec files to `examples/basic-rpg/`
- Add Jasmine test configuration and spec files to `examples/advanced-rpg/`
- Update `.circleci/config.yml` to include both new test jobs

## Benefits

- Ensures example code is correct and does not regress
- Demonstrates testability of Edwin-based game logic
- Aligns examples with the same quality standards as the source library

---
See issue for details: https://github.com/darthjee/edwin/issues/14
