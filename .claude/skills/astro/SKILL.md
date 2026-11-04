---
name: astro
description: Use sempre que trabalhar em projetos Astro, arquivo .astro, ao criar landing pages, sites ou páginas estáticas. Estrutura site Astro estático com islands, rotas e SSG/SSR.
license: Unlicense
metadata:
  author: thiagoeti
  version: 1.0.0
---

# Astro

- [Astro](https://astro.build)
- [Astro - Docs](https://docs.astro.build)
- [Astro - MCP](https://mcp.docs.astro.build)

## MCP

**Instalar somente no projeto local:**

```bash
cd /path/project
claude mcp add --transport http --scope local astro-docs https://mcp.docs.astro.build/mcp
```

## Fluxo

- `.astro` por padrão. Island só com interatividade real.
- `client:visible` por padrão. `client:load` só para interação crítica acima da dobra.

## Fluxo

- `.astro` por padrão. Island só com interatividade real.
- `client:visible` por padrão. `client:load` só para interação crítica acima da dobra.

## Regras

- Nunca troque output para `server` nem adicione adapter.
- Imagem de `src/` → `<Image />` de `astro:assets`.
- View Transitions: `<ClientRouter />`.
- Alias `@`: só `compilerOptions.paths` no `tsconfig.json`. Não use `vite.resolve.alias`.
- O CORS não deve ficar no Astro.
