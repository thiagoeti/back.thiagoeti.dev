---
name: web-sitemap-xml
description: Use que trabalhar no sitemap.
license: Unlicense
metadata:
  author: thiagoeti
  version: 1.0.0
---

# Sitemap.xml

**Coloque todas rotas sempre.**

## Regras

- Gere a partir da fonte de verdade rotas, nunca rastejando o próprio site.
- `lastmod` tente colocar a data real de alteração do conteúdo.
- `<priority>` e `<changefreq>`: o Google ignora. Não use.
- Escape: `&` → `&amp;`; um `&` cru invalida o arquivo inteiro. Não-ASCII percent-encoded. UTF-8.
- Confirme antes de substituir um sitemap em produção.

## Qual URL entra

| Entra | Fica de fora |
|---|---|
| canônica de si mesma | variante com parâmetro, filtro, ordenação, busca interna |
| responde 200 | 3xx, 404, 5xx |
| indexável | `noindex` ou bloqueada no `robots.txt` |
| pública | login, carrinho, checkout |

## Limites

- 50k de URLs.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>https://exemplo.com/sitemap-produtos-1.xml</loc><lastmod>2026-09-14</lastmod></sitemap>
  <sitemap><loc>https://exemplo.com/sitemap-blog.xml</loc></sitemap>
</sitemapindex>
```
