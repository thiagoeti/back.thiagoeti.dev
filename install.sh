#!/bin/sh

# init

bun init -y -m

# add — elysia

bun add elysia
bun add @elysiajs/cors
bun add @elysiajs/static

# add — astro build

bun add astro
bun add @astrojs/sitemap
bun add @tailwindcss/vite

# add — astro dev

bun add -d @astrojs/check
bun add -d typescript@6

#
