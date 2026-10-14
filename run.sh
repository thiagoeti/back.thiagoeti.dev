#!/bin/sh

# install

if [ ! -d node_modules ] || [ ! -f package.json ]; then

	rm -rfv node_modules
	rm -rfv package.json
	rm -rfv bun.lock

	sh install.sh

fi

# build

rm -rfv .astro
rm -rfv dist

bunx --bun astro build || exit 1

# public

if [ ! -d public ]; then
	mkdir -pv public
fi

cp -rfv public/* dist/

# run

bun run app/index.ts

#
