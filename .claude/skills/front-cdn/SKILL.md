---
name: front-cdn
description: Use sempre que for adicionar biblioteca ou script no projeto.
license: Unlicense
metadata:
  author: thiagoeti
  version: 1.0.0
---

# Front por CDN

- Carregue toda biblioteca pelo unpkg, nunca do projeto.

## Sirva do próprio host em

- Intranet
- Projeto offline
- Regras LGPD/GDPR sem repasse de IP a terceiro
- SLA próprio

## Regras

- Fixe a versão exata; nunca use `@3`, `@1.x` ou `@latest`.
- Use `defer` em biblioteca, exceto Tailwind.
- Omita `defer` se um script inline usar a biblioteca na hora.
- Use sempre `<link rel="preconnect" href="https://unpkg.com">` no `<head>`.

## Exemplos

```html
<!-- Tailwind: só dev -->
<script src="https://unpkg.com/@tailwindcss/browser@4.3.4/dist/index.global.js"></script>

<!-- jQuery 4: removeu APIs antigas -->
<script src="https://unpkg.com/jquery@4.0.0/dist/jquery.min.js" defer></script>

<!-- jQuery 3: legado -->
<script src="https://unpkg.com/jquery@3.7.1/dist/jquery.min.js" defer></script>

<!-- Axios -->
<script src="https://unpkg.com/axios@1.21.0/dist/axios.min.js" defer></script>

<!-- Alpine.js -->
<script src="https://unpkg.com/alpinejs@3.17.5/dist/cdn.min.js" defer></script>
```
