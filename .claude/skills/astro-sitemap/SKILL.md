---
name: astro-sitemap
description: Use sempre que trabalhar no sitemap em Astro. @astrojs/sitemap
license: Unlicense
metadata:
  author: thiagoeti
  version: 1.0.0
---

# Astro Sitemap

Medido em `astro` 7.4.0 + `@astrojs/sitemap` 3.7.4 (2026-10-17).

## Regras

- Falha em silêncio: sem `site` ou com opção inválida, o build termina `Complete!` só com `[WARN] [@astrojs/sitemap]` e sem arquivo. Teste o arquivo no CI.
- O arquivo é `sitemap-index.xml`, não `sitemap.xml`. `robots.txt` aponta para ele.

## Config

```js
import sitemap from '@astrojs/sitemap'
import { contentUpdatedAt } from './sitemap-dates.mjs' // your source: file or JSON — not astro:content

export default defineConfig({
  site: 'https://exemplo.com', // required: origin of every <loc>
  integrations: [sitemap({
    filter: (page) => !new URL(page).pathname.startsWith('/draft/'),
    serialize: (item) => ({ ...item, lastmod: contentUpdatedAt(item.url) }), // undefined lastmod = field omitted
  })],
})
```

```bash
astro build && test -f dist/sitemap-index.xml   # CI: fails when the sitemap was skipped
```

```txt
# public/robots.txt
Sitemap: https://exemplo.com/sitemap-index.xml
```
