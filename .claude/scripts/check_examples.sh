#!/usr/bin/env bash
set -euo pipefail
set -x

docker compose run --rm basic_example yarn coverage
docker compose run --rm basic_example yarn lint
docker compose run --rm advanced_example yarn coverage
docker compose run --rm advanced_example yarn lint
