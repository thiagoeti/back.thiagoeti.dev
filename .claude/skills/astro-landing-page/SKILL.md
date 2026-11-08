---
name: astro-landing-page
description: Use sempre que trabalhar em projetos Astro, arquivo .astro, landing pages, one-page, página única, hotsite, site institucional, sites ou páginas estáticas em Astro. Estrutura site Astro estático com islands, rotas e SSG/SSR.
license: Unlicense
metadata:
  author: thiagoeti
  version: 1.0.0
---

# Astro - Landing Page

**Utilize também a skill `/astro`.**

- Seções em componentes
- JS somente onde há interação
- Estático por padrão
- Navegação por âncora

## Contexto e Objetivo

- Landing é uma rota só: seções empilhadas em `index.astro`, navegação por âncora, build estático.
- Pode ter pontos fora da landing do estático como formulário — e quase nunca precisa.

## Fluxo Cognitivo (Workflow)

- Liste as seções; cada uma vira `src/components/sections/<Nome>.astro`.
- `Layout.astro` com `<head>`, meta e `<slot />`, recebendo `title`/`description` por props.
- `index.astro` importa o layout e empilha as seções na ordem da página.

## Regras Estritas de Execução

- Uma única rota: `src/pages/index.astro`. Sem subpáginas; `src/pages/api/` só com endpoint próprio.
- Navegação por âncora (`href="#contact"`), nunca por rota.
- Seção em PascalCase com `<section id>` em kebab-case igual ao nome: `Testimonials.astro` → `id="testimonials"`.
- `<head>`, meta e SEO só no `Layout.astro`.
- JS vanilla em `<script>` no próprio componente; componente de framework com `client:visible`.
- Formulário não justifica `output: 'server'`. Default: serviço externo, build 100% estático.
- Endpoint próprio exige `export const prerender = false` **e** adapter — declare esse custo antes de escrever.
