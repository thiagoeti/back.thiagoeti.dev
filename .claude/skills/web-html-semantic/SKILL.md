---
name: web-html-semantic
description: Use sempre que trabalhar em qualquer HTML.
license: Unlicense
metadata:
  author: thiagoeti
  version: 1.0.0
---

# HTML Semântico

Todo HTML de todo projeto deve seguir as regras semânticas do WHATWG (HTML Living Standard).

## Regras

- Tag pelo significado, nunca pela aparência.
- `<div>`/`<span>` só como último recurso. Tag nativa antes de ARIA.
- Toda página completa tem `<header>`, um único `<main>` visível e `<footer>`; `<aside>` e `<nav>` normalmente também.
- Um `<h1>` por página; headings sem pular nível.
- `<h1>` dentro de `<section>` não vira nível inferior — o outline algorithm saiu do WHATWG em 2022; o nível é o número da tag.
- HTML válido, 2 espaços, lowercase. NUNCA CSS ou JS inline (`style=""`, `<style>`, `on*=""`).
- `<img>` sempre com `alt` e `width`/`height`.
- Teste final: a estrutura continua compreensível sem CSS e sem JS.

## Decisões

```txt
Envia formulário             → <button type="submit">   (nunca <a href="#" onclick>)
Bloco temático com heading   → <section>   (landmark só com nome acessível)
Busca ou filtro              → <search><form>…</form></search>
```

## Nativos que dispensam JS e ARIA

- `<details name="faq">` com o mesmo `name` = accordion exclusivo.
- `<dialog>` + `showModal()`: foco preso, Esc fecha, fundo inerte; dispensa `role="dialog"`.
- `popover` para menu e tooltip; `<progress>` e `<meter>`.
- `<hgroup>` = heading + `<p>` de subtítulo, nunca segundo heading.

## Tabelas

- Só dado tabular.
- Tabela larga → `<div role="region" aria-labelledby="{id-do-caption}" tabindex="0">`: rolável por teclado e com nome.

## Formulários

- Todo input com `<label>`; erro, `autocomplete` e foco → `web-accessibility`.
- `inputmode` quando o `type` não basta: CPF `type="text" inputmode="numeric"`.

## IDs e classes

- kebab-case, por propósito (`btn-danger`, não `big-red-button`); sem `card1`.
- ID só para âncora, `label[for]`, `aria-*` e alvo de JS — nunca para estilo.
- Estado em `data-*` (`data-state="loading"`).

## Referências

Catálogo de tags por categoria. Leia só o arquivo da categoria em uso.

| Arquivo | Conteúdo |
|---|---|
| `references/01-estrutura-documento.md` | `<!DOCTYPE>`, `<html>`, `<head>`, `<title>`, `<body>` |
| `references/02-metadados.md` | `<base>`, `<link>`, `<meta>`, `<style>` |
| `references/03-secoes.md` | `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<h1>`–`<h6>`, `<hgroup>`, `<search>`, `<footer>`, `<address>` |
| `references/04-agrupamento-conteudo.md` | `<p>`, `<hr>`, `<pre>`, `<blockquote>`, `<ol>`, `<ul>`, `<menu>`, `<li>`, `<dl>`, `<dt>`, `<dd>`, `<figure>`, `<figcaption>`, `<div>` |
| `references/05-semantica-textual.md` | `<a>`, `<em>`, `<strong>`, `<small>`, `<s>`, `<cite>`, `<q>`, `<dfn>`, `<abbr>`, `<ruby>`, `<rt>`, `<rp>`, `<data>`, `<time>`, `<code>`, `<var>`, `<samp>`, `<kbd>`, `<sub>`, `<sup>`, `<i>`, `<b>`, `<u>`, `<mark>`, `<bdi>`, `<bdo>`, `<span>`, `<br>`, `<wbr>` |
| `references/06-edicoes.md` | `<ins>`, `<del>` |
| `references/07-conteudo-embutido.md` | `<picture>`, `<img>`, `<iframe>`, `<embed>`, `<object>`, `<video>`, `<audio>`, `<source>`, `<track>`, `<canvas>`, `<map>`, `<area>`, `<svg>`, `<math>` |
| `references/08-tabelas.md` | `<table>`, `<caption>`, `<colgroup>`, `<col>`, `<thead>`, `<tbody>`, `<tfoot>`, `<tr>`, `<th>`, `<td>` |
| `references/09-formularios.md` | `<form>`, `<label>`, `<input>`, `<button>`, `<select>`, `<selectedcontent>`, `<datalist>`, `<optgroup>`, `<option>`, `<textarea>`, `<output>`, `<progress>`, `<meter>`, `<fieldset>`, `<legend>` |
| `references/10-interativos.md` | `<details>`, `<summary>`, `<dialog>` |
| `references/11-scripting.md` | `<script>`, `<noscript>`, `<template>`, `<slot>` |
| `references/12-experimentais.md` | `<fencedframe>` |
| `references/13-obsoletas.md` | `<center>`, `<font>`, `<strike>`, `<big>`, `<tt>`, `<marquee>`, `<blink>`, `<frame>`, `<frameset>`, `<noframes>`, `<applet>`, `<acronym>`, `<dir>`, `<isindex>`, `<keygen>`, `<menuitem>`, `<plaintext>`, `<xmp>`, `<listing>`, `<basefont>`, `<bgsound>`, `<spacer>`, `<nobr>`, `<noembed>`, `<command>`, `<content>`, `<shadow>`, `<param>`, `<rb>`, `<rtc>`, `<image>`, `<multicol>`, `<nextid>`, `<portal>` (não usar) |

## Externas

- WHATWG HTML Living Standard: https://html.spec.whatwg.org/multipage
- MDN — HTML elements: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements
- WAI-ARIA 1.2: https://www.w3.org/TR/wai-aria-1.2
- HTML-AAM: https://www.w3.org/TR/html-aam-1.0
- Ferramenta: https://validator.w3.org
