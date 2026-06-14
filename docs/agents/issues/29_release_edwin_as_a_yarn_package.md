# Issue: Release Edwin as a Yarn Package

## Description

Edwin needs a CI/CD pipeline step to automatically publish the package to npm/yarn when a version tag is created. Currently, the CircleCI config only runs tests and checks — there is no release automation.

## Problem

- No automated release step exists in `.circleci/config.yml`
- Publishing the package to npm must be done manually
- There is no version tag validation to ensure the tag matches `package.json`

## Expected Behavior

- When a version tag (e.g. `1.0.0`) is pushed, CircleCI should:
  1. Validate that the tag matches the version declared in `package.json`
  2. Publish the package to npm with `npm publish`

## Solution

Add the following jobs to `.circleci/config.yml`:

- `check-version-tag`: runs `scripts/check_tag_version.sh` to verify the git tag matches the version in `package.json` and `README`; only triggers on version tags matching `/\d+\.\d+\.\d+/`
- `npm-publish`: installs dependencies from `source/`, publishes to npm using `npm publish --access public` authenticated via `NPM_TOKEN` environment variable; requires all test/check jobs and `check-version-tag`
- Both jobs should be added to the `test-and-release` workflow with tag-only filters (`/\d+\.\d+\.\d+/`) and `branches: ignore: /.*/`
- A `scripts/check_tag_version.sh` script must be created to validate the tag against `package.json` and `README` versions

## Benefits

- Automates package releases, reducing manual steps and human error
- Ensures the published version always matches the git tag

---
See issue for details: https://github.com/darthjee/edwin/issues/29
