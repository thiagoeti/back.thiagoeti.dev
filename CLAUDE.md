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
| `.specs/WIDTH.md` | Largura do conteúdo (`max-w-[120rem]`, igual ao front) e vitrine com 4 colunas em `2xl` — substitui o Container do `THEME.md` |
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
| `/creative` | 7 | Ideação: ≥ 10 ideias, convergência por impacto, novidade e aderência |

---

## Análise (`.analyse/`)

| Arquivo | Papel |
|---|---|
| `.analyse/exe.md` | Índice dos prompts de execução |
| `.analyse/exe_projeto.md` | Super prompt de criação completa do projeto |
| `.analyse/exe_layout.md` | Super prompt de refação do layout a partir de `_references/` |
| `.analyse/design.md` | Direção criativa: revisão 10 (sistemas em funcionamento, glifos de tecnologia), histórico das revisões, ideação, inventário |
| `.analyse/page.json` | Microcopy de interface (`text`): rótulos, estados, easter eggs, 404 |
| `_references/` | Capturas Dark Ops UI: fonte visual do layout (`exe_layout.md`) |

## Arquitetura

| Camada | Arquivo / pasta | Papel |
|---|---|---|
| Build | `astro.config.ts` | Astro estático; integrações `llms-txt` (`.content/data.md` → `public/llms.txt`) e `cdn` (troca a URL da CDN pelo `CDN` do `.env.local`) |
| Repositórios | `src/lib/repos.ts` | Lê `data.md › Projetos`: pasta local citada, `/repos/<repo>` (montagem do `docker.sh`) ou GitHub bruto; `data.json`, `README.md`, `docker.sh` e arquivos de cada pasta |
| Projetos | `src/lib/projects.ts` | Modelo do projeto: README (`readme.ts`), ficha do container (`docker.ts`), tags por número de projetos, totais |
| Rajada | `src/lib/burst.ts` | `Saída:` do README → respostas HTTP em ordem (`33 respostas \`201\``, `17 \`422\``, `\`201 SETTLED\``) e saldo final citado; sem código, sem rajada |
| Glifo | `src/lib/techglyph.ts`, `src/components/tech-glyph.astro` | Vocabulário de tecnologia em `viewBox 0 0 200 200`: moldura da linguagem, motivo do framework do título, satélites das demais; tecnologia nova sem desenho vira satélite genérico; `glyphSvg` para o cartão OG |
| Capa | `src/components/hero-systems.astro`, `showcase-card.astro`, `command-bar.astro`, `integration.astro` | Glifos de sistema com trilhos `sync`/`async`/`store` (sem tecnologia), vitrine, busca e tags, repositórios |
| Projeto | `src/components/threat-console.astro`, `timeline.astro`, `terminal.astro`, `source-panel.astro`, `board-diagram.astro` | Blindagem, como funciona, executar, arquivos × código, diagrama |
| Peças | `src/components/badge.astro`, `ring.astro`, `icon.astro`, `link-card.astro` | Badge, Score Ring, ícone do catálogo, card do ecossistema e contatos no rodapé e no painel do ☰ (mesmo código dos outros sites; `wrap` na largura deste) |
| Moldura | `src/components/header.astro`, `bottom-nav.astro`, `footer.astro` | Cabeçalho no padrão do ecossistema (logo em caixa, `@thiagoeti / back-end`, menu, ação Ecossistema; ☰ com painel em `popover` no mobile), menu da base, rodapé |
| Glifos | `src/lib/glyphs.ts`, `src/lib/grid.ts`, `src/components/shapes.astro` | Papéis de traço e ligações em ângulo reto do diagrama |
| Diagrama | `src/lib/tracks.ts`, `src/components/board-diagram.astro` | Mermaid (`sequenceDiagram`, `flowchart`) → topologia sobre fundo pontilhado, nós e log numerado |
| Markdown | `src/lib/markdown.ts` | README renderizado no build, sem `style` inline, cores do Shiki mapeadas para 2 cores + 1 acento |
| Cartões | `src/lib/og.ts`, `src/pages/og.png.ts`, `src/pages/[slug]/og.png.ts` | PNG 1200×630 pelo sharp: nome à esquerda, glifo de tecnologia (projeto) ou glifos (capa) à direita |
| Páginas | `src/pages/` | `/` (sistemas em funcionamento, vitrine), `/[slug]` (glifo de tecnologia vivo e seções), `404` (serviço vazio), `robots.txt`, `sitemap.xml` |
| Scripts cliente | `src/scripts/flow.ts`, `systems.ts`, `glyph.ts`, `home.ts`, `project.ts`, `src/layouts/base.astro` | Motor de pontos em trilhos (posição em atributo `transform`); abertura contínua; glifo do projeto vivo; vitrine (`?tag=`, `?q=`, `/`, `Esc`); abas de código e ← → vizinho; volta da view transition `project` |
| Estilo | `src/styles/global.css` | Tokens e utilitários tipográficos do `THEME.md` (Inter, JetBrains Mono), `dot-grid`, papéis de traço |
| Servidor | `app/index.ts` | Elysia serve `dist/` e `public/`; `/health`; exige `PORT` |

## Execução

| Script | Faz |
|---|---|
| `install.sh` | Recria `package.json` e instala dependências |
| `run.sh` | Instala se faltar, roda `astro build`, copia `public/` para `dist/`, sobe `app/index.ts` |
| `docker.sh` | Sobe `oven/bun:1.4.2-alpine` com `run.sh`; monta `/data/work/project` em `/repos` (somente leitura); exige `.env` com `GROUP`, `PROJECT`, `PORT` |
| `git.sh` | Symlink para `.claude/skills/deploy/git.sh` — modos `beta` (padrão), `main`, `full` |

## Regras

- Não versionar `node_modules`, `bun.lock`, `dist`, `.astro`, `.env*` (ver `.gitignore`).
- Texto de conteúdo vem só de `.content/` e dos repositórios; microcopy de interface só de `.analyse/page.json`.
- Estilo só Tailwind; zero `style` inline e zero `<style>` escrito à mão.
- Classe Tailwind sempre literal no código (o scanner não vê classe montada em tempo de execução).
