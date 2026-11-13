---
name: web-metadata
description: Use sempre que trabalhar em HTML `<head>` ou metadados.
license: Unlicense
metadata:
  author: thiagoeti
  version: 1.0.0
---

# Metadados

O `<head>` da página.

## Regras

- TODAS páginas devem ter seus dados diferentes, que definem a página (title, description, canonical, etc..).
- Canonical em URL absoluta sem UTMs.
- `lang` BCP 47 (`pt-BR`) igual ao idioma do conteúdo.

## Bloco obrigatório e ordem

**Esté é o mínimo que toda página deve ter:**

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="robots" content="index, follow" />
  <title>Título da página | Marca</title>
  <meta name="description" content="Resumo da página.">
	<meta name="author" content="@thiagoeti" />
	<link rel="alternate" type="text/plain" href="https://exemplo.com/llms.txt" title="llms.txt" />
  <link rel="canonical" href="https://exemplo.com/pagina">
  <link rel="icon" href="/favicon.ico" sizes="32x32">
  <link rel="icon" href="/icon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#0f172a">
  <!-- og:* -->
</head>
```
