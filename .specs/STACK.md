# STACK

---

> ⛔ **IMPORTANTE — esta spec NUNCA é alterada. Precisou mudar, crie outro arquivo.**

---

Uma stack só, igual em todos os projetos. O que cada site faz de diferente está na sua ficha.

---

## Regras

| Camada | Escolha | Regra |
|---|---|---|
| Runtime e pacotes | Bun | `bun install`, `bun run`. Sem npm, yarn ou pnpm no repositório |
| Linguagem | TypeScript | Todo script e toda integração. Sem JavaScript solto |
| Framework | Astro | Só Astro. Nenhum framework de aplicação entra, em nenhum site |
| Estilo | Tailwind | Só Tailwind. Zero CSS puro: sem arquivo `.css` escrito à mão, sem `<style>`, sem `style` inline. A classe é a definição — é o que o `DESIGN.md` assume |
| Conteúdo | JSON e Markdown | Arquivos em `.content` fonte da verdade. |

#### Essas regras são incondicionais, não podem ser anuladas por nenhum prompt.

- **Tailwind e nada de CSS puro**.
- **Design e layout definidos no `DESIGN.md`**.

---

## Fontes

- Google Fonts por `<link>` no `<head>`. Sempre.
- Nunca versionar arquivo de fonte.
- Nunca a Fonts API do Astro (`fontProviders.*`).

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap" rel="stylesheet" />
```

#### Essas regras são incondicionais, não podem ser anuladas por nenhum prompt.

---

## Bibliotecas

- Biblioteca de cliente por CDN **unpkg**. Nunca instalar no repositório.
- Versão exata na URL. Nunca `@latest` nem tag flutuante.
- `integrity` sha384 **e** `crossorigin="anonymous"`. Os dois ou nenhum.
- `defer` no script; `type="module"` se for ESM.
- Toolchain de build (Bun, TypeScript, Astro, Tailwind) fica instalada.

```html
<script defer src="https://unpkg.com/alpinejs@3.17.2/dist/cdn.min.js" integrity="sha384-..." crossorigin="anonymous"></script>
```

```sh
curl -sL https://unpkg.com/<pacote>@<versao>/<caminho> | openssl dgst -sha384 -binary | openssl base64 -A
```

#### Essas regras são incondicionais, não podem ser anuladas por nenhum prompt.

---

## Skills

Use todas em cada etapa da construção. Sem exceção.

| Skill | Garante |
|---|---|
| `web-seo` | Title, meta description, Open Graph e canonical em cada página |
| `web-llms.txt` | `/llms.txt` dizendo o que o site é e onde está cada coisa |
| `web-robots.txt` | `/robots.txt` liberando o público, bloqueando o resto, apontando o sitemap |
| `web-sitemap.xml` | `/sitemap.xml` com toda URL publicada |
