#!/bin/sh

# -- ----- ----- -----

# pwd
PWD="$(cd "$(dirname "$0")" && pwd)"

# -- ----- ----- -----

# env
[ -f "$PWD/.env" ] || { echo "error: .env notfound"; exit 1; }
. "$PWD/.env"

# test
[ -n "$GROUP" ] || { echo "error: .env GROUP"; exit 1; }
[ -n "$PROJECT" ] || { echo "error: .env PROJECT"; exit 1; }
[ -n "$PORT" ] || { echo "error: .env PORT"; exit 1; }

# name
NAME="${GROUP}_${PROJECT}"

# -- ----- ----- -----

# pull
docker pull "oven/bun:1.4.2-alpine"

# drop
docker rm -f "$NAME"

# run
docker run --name "$NAME" \
	-v "$PWD":"/data" \
	-w "/data" \
	-p "$PORT":"$PORT" \
	--restart=always \
	-d "oven/bun:1.4.2-alpine" /bin/sh run.sh

# -- ----- ----- -----

exit 0

# -- ----- ----- -----

# exec
docker start "$NAME"
docker attach "$NAME"

# exec
docker exec -it "$NAME" "/bin/sh"

# -- ----- ----- -----

#
