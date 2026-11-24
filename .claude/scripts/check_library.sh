#!/usr/bin/env bash
set -euo pipefail
set -x

docker compose run --rm edwin_dev yarn coverage
docker compose run --rm edwin_dev yarn lint
