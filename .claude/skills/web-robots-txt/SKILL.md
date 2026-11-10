---
name: web-robots-txt
description: Use quando trabalhar em robots.txt.
license: Unlicense
metadata:
  author: thiagoeti
  version: 1.0.0
---

# Robots.txt

O `/robots.txt` controla **rastreamento**.

## Regras

- Deve conter endereço para o sitemap.
- Utilize mais para Disallow, em casos específicos.
- Normalmente Allow para tudo.
- Nunca bloqueie `Googlebot` para barrar IA — derruba a Busca. O token é `Google-Extended`.

- **NUNCA altere nada sem confirmação.**

## Rastejo ≠ índice

Para desindexar: **permita o rastejo** e sirva `noindex` (meta ou `X-Robots-Tag`). `Disallow` + `noindex` na mesma URL → o `noindex` nunca é lido e a URL fica indexada.
