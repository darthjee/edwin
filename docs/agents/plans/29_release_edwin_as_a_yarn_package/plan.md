# Plan: Release Edwin as a Yarn Package

## Overview

Add automated npm release to the CircleCI pipeline, triggered when a version tag is pushed. This includes a version consistency check and the actual publish step.

## Context

Edwin is an npm package living in `source/`. Currently `.circleci/config.yml` only runs tests and linting. There is no mechanism to publish the package or validate that a git tag matches the declared version.

## Implementation Steps

### Step 1 — Create `scripts/check_tag_version.sh`

Create a shell script that reads the version from `source/package.json` and from `README.md`, and exits with an error if either does not match `$CIRCLE_TAG`.

The README version is expected to be declared as:
```
**Current Version:** [X.Y.Z]
```

If the README does not yet contain this line, it must be added.

### Step 2 — Add version line to `README.md`

Ensure `README.md` contains a `**Current Version:** [X.Y.Z]` line that matches the current version in `source/package.json` (`0.0.1`).

### Step 3 — Add `check-version-tag` job to `.circleci/config.yml`

New job that:
- Uses the `darthjee/circleci_node:0.2.1` Docker image
- Checks out the repo
- Runs `bash scripts/check_tag_version.sh`
- Has a filter: tags only matching `/\d+\.\d+\.\d+/`, branches ignored

### Step 4 — Add `npm-publish` job to `.circleci/config.yml`

New job that:
- Uses the `darthjee/circleci_node:0.2.1` Docker image
- Checks out the repo
- Installs dependencies: `cd source; yarn install --frozen-lockfile`
- Publishes: `echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc && cd source; npm publish --access public`
- Requires: all existing test/check jobs (`jasmine`, `basic_example_jasmine`, `advanced_example_jasmine`, `checks`) and `check-version-tag`
- Has the same tag-only filter as `check-version-tag`

### Step 5 — Wire jobs into the workflow

In the `test-and-release` workflow, add:
- `check-version-tag` with tag filter `/\d+\.\d+\.\d+/` and `branches: ignore: /.*/`
- `npm-publish` with `requires` listing all test/check jobs + `check-version-tag`, same tag filter

## Files to Change

- `scripts/check_tag_version.sh` — new script to validate tag vs `package.json` and `README.md` versions
- `README.md` — add `**Current Version:** [0.0.1]` line
- `.circleci/config.yml` — add `check-version-tag` and `npm-publish` jobs and wire them into the workflow

## Notes

- `NPM_TOKEN` must be set as an environment variable in the CircleCI project settings (not handled in this plan)
- The README version format must exactly match what `check_tag_version.sh` greps for
