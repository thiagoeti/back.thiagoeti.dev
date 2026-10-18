# CLAUDE.md

## Especificações (`.specs/`)

| Arquivo | Responde |
|---|---|
| `.specs/PROJECT.md` | O que o site entrega — aponta para `.content/project.md` (rotas, grade, filtro por tag, página por projeto) |
| `.specs/CONTENT.md` | Onde mora todo texto (`.content/`), o que nunca alterar, `llms.txt` e endereços da CDN |
| `.specs/STACK.md` | Stack obrigatória: Bun, TypeScript, Astro, Tailwind; bibliotecas por unpkg e fontes do Google Fonts |
| `.specs/BRAND.md` | Posicionamento, voz, limites de texto, critérios de aceite e assinatura `@thiagoeti` dos títulos |
| `.specs/DESIGN.md` | Posição de logo e menu por breakpoint, o que fica fixo na tela e glifos em SVG |
| `.specs/LAYOUT.md` | Cabeçalho fixo, menu inferior no mobile, nada oculto no mobile, link externo em nova aba |
| `.specs/THEME.md` | Tema Dark Ops UI: tokens, cores, tipografia, superfícies, componentes e breakpoints em Tailwind v4 |
| `.specs/META.md` | Identidade, contatos e endereços do ecossistema `thiagoeti` |
| `.specs/ROADMAP.md` | Papel de cada repositório do ecossistema |

> Toda spec é imutável: precisou mudar, crie outro arquivo e indexe aqui.

## Arquivos do agente (`.claude/`)

| Skill | Prioridade | Quando aplicar |
|---|---|---|
| `/action` | 1 | Toda sessão: carregar sempre — nunca decidir sozinho, resposta curta, idioma do usuário |
| `/profile` | 2 | Todo prompt: escopo fechado, resposta direta, pergunta única na ambiguidade |
| `/define` | 3 | Criar ou ajustar `README.md`, `CLAUDE.md` e specs em `.specs/` |
| `/deploy` | 4 | Git, commit, push, publicação — o `git.sh` mora na skill; a raiz é symlink |
| `/prompt` | 5 | Transformar pedido vago em prompt preciso |
| `/frontend-design` | 6 | Direção visual ao criar ou remodelar UI (externa, Anthropic) |

---

## Análise (`.analyse/`)

| Arquivo | Papel |
|---|---|
| `.analyse/exe.md` | Índice dos prompts de execução |
| `.analyse/exe_projeto.md` | Super prompt de criação completa do projeto |
| `.analyse/design.md` | Direção criativa: conceitos, metáfora (cofre), gramática, mapa de navegação, inventário de componentes |
| `.analyse/page.json` | Microcopy de interface (`text`): rótulos, estados, easter eggs, 404 |

## Arquitetura

| Camada | Arquivo / pasta | Papel |
|---|---|---|
| Build | `astro.config.ts` | Astro estático; integrações `llms-txt` (`.content/data.md` → `public/llms.txt`) e `cdn` (troca a URL da CDN pelo `CDN` do `.env.local`) |
| Repositórios | `src/lib/repos.ts` | Lê `data.md › Projetos`: pasta local citada, `/repos/<repo>` (montagem do `docker.sh`) ou GitHub bruto; `data.json`, `README.md`, `docker.sh` e arquivos de cada pasta |
| Projetos | `src/lib/projects.ts` | Modelo do projeto: README (`readme.ts`), ficha do container (`docker.ts`), respostas, saldo, tags, totais |
| Gramática | `src/lib/polar.ts`, `src/lib/glyphs.ts` | Geometria polar única; fragmento por tag, emblema por projeto, grade, índice |
| Diagrama | `src/lib/rosette.ts` | Mermaid (`sequenceDiagram`, `flowchart`) → rosácea polar |
| Markdown | `src/lib/markdown.ts` | README renderizado no build, sem `style` inline, cores do Shiki mapeadas para 2 cores + 1 acento |
| Cartões | `src/lib/og.ts`, `src/pages/og.png.ts`, `src/pages/[slug]/og.png.ts` | PNG 1200×630 pelo sharp |
| Páginas | `src/pages/` | `/` (mostrador), `/[slug]` (pranchas), `404`, `robots.txt`, `sitemap.xml` |
| Scripts cliente | `src/scripts/dial.ts`, `src/scripts/plates.ts` | Mostrador (foco, filtro `?tag=`, teclado, view transition, easter eggs) e pranchas (régua, roda horizontal, disparar cenário) |
| Estilo | `src/styles/global.css` | Tokens Tailwind do `THEME.md`, restritos a 2 cores + 1 acento e JetBrains Mono; papéis de traço dos glifos |
| Servidor | `app/index.ts` | Elysia serve `dist/` e `public/`; `/health`; rota sem arquivo → `dist/404.html`; exige `PORT` |

## Execução

| Script | Faz |
|---|---|
| `install.sh` | Recria `package.json` e instala dependências |
| `run.sh` | Instala se faltar; sem fonte no sistema (Alpine), baixa a JetBrains Mono do Google Fonts para o fontconfig dos cartões PNG; roda `astro build`, copia `public/` para `dist/`, sobe `app/index.ts` |
| `docker.sh` | Sobe `oven/bun:1.4.2-alpine` com `run.sh`; monta `/data/work/project` em `/repos` (somente leitura); exige `.env` com `GROUP`, `PROJECT`, `PORT` |
| `git.sh` | Symlink para `.claude/skills/deploy/git.sh` — modos `beta` (padrão), `main`, `full` |

## Regras

- Não versionar `node_modules`, `bun.lock`, `dist`, `.astro`, `.env*` (ver `.gitignore`).
- Texto de conteúdo vem só de `.content/` e dos repositórios; microcopy de interface só de `.analyse/page.json`.
- Estilo só Tailwind; zero `style` inline e zero `<style>` escrito à mão.
- Classe Tailwind sempre literal no código (o scanner não vê classe montada em tempo de execução).
