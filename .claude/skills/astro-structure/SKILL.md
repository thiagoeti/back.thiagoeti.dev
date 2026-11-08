---
name: astro-structure
description: Use sempre que trabalhar em projetos Astro, arquivo .astro, landing pages, one-page, página única, hotsite, site institucional, sites ou páginas estáticas em Astro. Estrutura site Astro estático com islands, rotas e SSG/SSR.
license: Unlicense
metadata:
  author: thiagoeti
  version: 1.0.0
---

# Astro - Structure

**Utilize também a skill `/astro`.**

## Regras

- Só pastas da árvore abaixo. Fora dela → pergunte antes de criar.
- `src/pages/` só rota. Componente ali vira página (`pages/Card.astro` → `/Card/`); prefixo `_` tira do roteamento.
- Coleções em `src/content.config.ts`. `src/content/config.ts` → `LegacyContentConfigError`.
- `public/` por caminho (`/og.jpg`); `src/assets/` por `import`. Nunca o contrário.
- Import entre diretórios por `@/`, nunca `../../`.
- `.astro/` e `dist/` são gerados — nunca edite.
- Landing one-page: só `pages/index.astro`, seções em `components/sections/`, navegação por âncora.

## Árvore

```txt
.
├── astro.config.ts           # output: 'static'
├── tsconfig.json             # paths @/* → src/*
├── public/                   # served as-is: favicon, robots.txt, og.jpg, fonts
└── src/
    ├── pages/                # each file is a route
    ├── layouts/
    │   └── base.astro        # <html>, <head>, <slot />
    ├── components/
    │   ├── ui/               # generic: Button.astro, Card.astro
    │   ├── sections/         # page block: Hero.astro, Contact.astro
    │   └── islands/          # React/Vue/Svelte with client:*
    ├── content/              # collection .md/.mdx
    ├── assets/               # images via <Image>
    ├── styles/               # global.css
    ├── scripts/              # client-side TS imported by <script>
    ├── lib/                  # plain TS: data, formatting, API client
    └── content.config.ts
```

## Nomes

| Alvo | Padrão | Exemplo |
|---|---|---|
| Componente | PascalCase | `CardBlog.astro` |
| Layout | minúsculo | `base.astro` |
| Rota | kebab-case — vira a URL | `about-us.astro` → `/about-us` |
| Módulo em `lib/`, `scripts/` | minúsculo | `data.ts`, `glyph.ts` |
| Entrada de coleção | kebab-case — vira o `id` | `my-post.md` → `id: 'my-post'` |
