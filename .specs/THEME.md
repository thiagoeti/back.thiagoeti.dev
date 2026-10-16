# THEME

---

> ⚠️ **IMPORTANTE — esta spec NUNCA é alterada. Precisou mudar, crie outro arquivo.**

---

> Dark Ops UI
> Escopo: tokens, cores, tipografia, espaçamento, superfícies, componentes e layout.
> Stack: **Tailwind v4** (`@theme`, `@utility`).

---

## Regra geral

⛔ **NUNCA utilize CSS — somente Tailwind.**

## Personalidade

Caso não coberto pela spec → decida pelo critério abaixo.

| Traço | Critério | Exemplo |
|---|---|---|
| Dark-first | Hierarquia por luminosidade, nunca por cor | Destacar card → subir `surface-1 → 2`, não colorir fundo |
| Tech-operacional | Dado técnico sempre em mono | ID, IP, hora, versão, código → `font-mono` |
| Data-dense | Na dúvida, densidade compacta | Lista nova → `gap-2 p-3 text-xs` |
| Enterprise | Sóbrio: só estado real, sem decoração | Sem estado → sem badge |
| Silencioso | Cor só para significado | Sem semântica → `fg`/`fg-muted` |

## Regras globais

- Máx. 2 cores saturadas por card.
- Cor semântica sempre com texto explícito.
- Severidade em 3 níveis: dot → badge → row highlight.

---

## Tokens

```css
@import "tailwindcss";

@theme {
  /* Superfícies */
  --color-surface-0: #0B0F14;      /* fundo da página */
  --color-surface-1: #10161E;      /* card, painel */
  --color-surface-2: #151C27;      /* zona de texto do feature card, item selecionado */
  --color-surface-3: #1B2330;      /* popover, hover de linha, botão inline */
  --color-surface-sunken: #080B10; /* sidebar rail, fundo de radar/topologia */

  /* Bordas */
  --color-line: rgb(255 255 255 / 0.08);
  --color-line-strong: rgb(255 255 255 / 0.14);
  --color-line-subtle: rgb(255 255 255 / 0.05);

  /* Texto */
  --color-fg: #F3F6F9;        /* título, KPI, texto primário */
  --color-fg-muted: #9AA3B2;  /* descrição, corpo secundário */
  --color-fg-subtle: #6B7484; /* label, eixo, timestamp, auxiliar — contraste 3.8:1, nunca corpo de texto */
  --color-fg-faint: #47505E;  /* offline, desabilitado, placeholder */

  /* Brand */
  --color-brand: #2DD4A8;
  --color-brand-hover: #3BE3B7;
  --color-brand-deep: #166D55;  /* barras, fills de gráfico */

  /* Semântica */
  --color-success: var(--color-brand);
  --color-info: #22D3EE;
  --color-warning: #F0B429;
  --color-load: #F97316;        /* carga / evento intermediário */
  --color-danger: #F05252;

  /* Tipografia */
  --font-sans: Inter, ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", "SF Mono", ui-monospace, monospace;

  /* Raio */
  --radius-badge: 4px;
  --radius-control: 6px;
  --radius-card: 12px;
  --radius-panel: 16px;

  /* Sombra / glow */
  --shadow-panel: 0 1px 0 0 rgb(255 255 255 / 0.04) inset, 0 12px 40px rgb(0 0 0 / 0.35);
  --shadow-glow-brand: 0 0 24px rgb(45 212 168 / 0.12);
  --shadow-glow-danger: 0 0 16px rgb(240 82 82 / 0.14);

  /* Motion */
  --animate-pulse-dot: pulse-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
}
```

---

## Cores

### Brand e semântica

| Token | Texto/ícone | Fundo muted | Borda | Uso |
|---|---|---|---|---|
| `brand` | `text-brand` | `bg-brand/15` | `border-brand/30` | Ativo, live, linha principal |
| `success` | `text-success` | `bg-success/10` | — | SUCCESS, Online, Nominal, 99.9% |
| `info` | `text-info` | `bg-info/10` | — | INFO, sparkline, ícone circular |
| `warning` | `text-warning` | `bg-warning/10` | `border-warning/30` | WARNING, SYNC DELAY, ELEVATED, 82% |
| `load` | `text-load` | `bg-load/10` | — | Nó sob carga, ponto de radar |
| `danger` | `text-danger` | `bg-danger/10` | `border-danger/30` | OFFLINE, ALERT DETECTED, threats |

- Fundo colorido: opacidade ≤ 15%.
- Cor sólida só em dot, linha de gráfico, fill de progress e botão primary.

Glow ambiente (hero, card de destaque):
`bg-[radial-gradient(ellipse_at_top_left,rgb(45_212_168/0.08),transparent_45%)]`

### Gráficos

| Papel | Classe |
|---|---|
| Série 1 (linha) | `stroke-brand stroke-2` |
| Série 2 (linha) | `stroke-info stroke-2` |
| Área sob linha | gradient `from-brand/20 to-transparent` |
| Barra base | `fill-brand-deep` |
| Barra destaque (peak) | `fill-brand` |
| Barra apagada | `fill-white/[0.06]` |
| Grid | `stroke-white/[0.06]` tracejado |
| Eixos (texto) | `text-[11px] font-mono text-fg-subtle` |
| Nó online / carga | `fill-brand` / `fill-load` com halo `bg-brand/20 blur-sm` |

- Máx. 2 séries por gráfico pequeno.

---

## Tipografia

```css
@utility display-xl    { @apply text-5xl md:text-6xl font-normal leading-[1.05] tracking-tight text-fg; } /* título de seção landing */
@utility display-lg    { @apply text-4xl font-normal leading-tight tracking-tight text-fg; }             /* título secundário */
@utility kpi-xl        { @apply text-5xl font-medium leading-none tracking-tight tabular-nums text-fg; } /* KPI grande */
@utility kpi-md        { @apply text-2xl font-medium leading-none tabular-nums text-fg; }                /* KPI compacto: 8.4k, 42 */
@utility kpi-unit      { @apply text-xl font-normal text-fg-subtle; }                                   /* unidade: TB/s, ms, % */
@utility heading-card  { @apply text-xl font-semibold leading-snug text-fg; }                           /* título de feature card */
@utility heading-panel { @apply text-lg font-medium text-fg; }                                          /* título de painel */
@utility eyebrow       { @apply text-[11px] font-semibold uppercase tracking-[0.15em] text-fg-subtle; } /* GLOBAL THROUGHPUT */
@utility body-lg       { @apply text-base leading-relaxed text-fg-muted; }                              /* descrição de feature */
@utility body-md       { @apply text-sm leading-normal text-fg-muted; }                                 /* corpo padrão, log */
@utility body-sm       { @apply text-xs text-fg-subtle; }                                               /* auxiliar, subtítulo de painel */
@utility delta         { @apply text-sm font-medium text-brand; }                                       /* +14.2% vs last hour */
@utility mono-label    { @apply text-xs font-mono text-fg-subtle; }                                     /* IP, node-us-east-1, timestamp */
@utility mono-status   { @apply text-[11px] font-mono font-medium uppercase tracking-wide; }             /* + cor semântica: SYNC DELAY, 99.9% */
```

- Número → sempre `tabular-nums`.
- Peso máximo `font-semibold`. Nunca `font-bold`.
- Uppercase só em eyebrow, badge e mono-status.
- Mono nunca em prosa.
- Nenhum texto abaixo de 10px. Abaixo de 12px → só uppercase ou mono.

---

## Espaçamento e densidade

Base **4px**, ritmo dominante **8px**.

| Contexto | Padding | Gap interno | Gap externo |
|---|---|---|---|
| Badge | `px-2 py-0.5` | `gap-1.5` | — |
| Botão inline | `px-2.5 py-1` | `gap-1.5` | `gap-2` |
| Item de lista/log | `px-3 py-2.5` | `gap-3` | `space-y-1` |
| Card KPI | `p-5` | `gap-2` | `gap-4` |
| Card / painel | `p-6` | `gap-4` | `gap-6` |
| Feature card (zona texto) | `p-6` | `gap-3` | `gap-6` |
| Topbar | `px-6 h-14` | `gap-4` | — |
| Sidebar rail | `py-4 px-2` | `gap-1` | — |
| Seção landing | `py-16 lg:py-20 px-6 lg:px-8` | `gap-8` | `gap-16` |

| Densidade | Classes | Uso |
|---|---|---|
| Compacta | `gap-2 p-3 text-xs` | Logs, listas, toolbars |
| Padrão | `gap-4 p-5 text-sm` | KPI, painéis |
| Confortável | `gap-8 p-8 text-base` | Hero, blocos editoriais |

---

## Raio, borda, elevação

| Classe | Valor | Uso |
|---|---|---|
| `rounded-badge` | 4px | Badge, tag, chip de atalho, item de segmented, barra |
| `rounded-control` | 6px | Botão, input, segmented, item de lista |
| `rounded-card` | 12px | Card KPI, painel de dashboard |
| `rounded-panel` | 16px | Feature card, container de showcase |
| `rounded-full` | 9999px | Status dot, toggle, progress bar, ring |

| Borda | Classe | Uso |
|---|---|---|
| Default | `border border-line` | Card, painel — borda externa |
| Sutil | `border-line-subtle` | Divisor, linha de lista — borda interna |
| Forte | `border-line-strong` | Hover de card, input focado |
| Semântica | `border-danger/30` `border-warning/30` `border-brand/30` | Alerta, item crítico, seleção |

| Elevação | Classe | Uso |
|---|---|---|
| Nenhuma | — | Padrão |
| Painel | `shadow-panel` | Card de showcase, feature card |
| Glow brand | `shadow-glow-brand` | KPI de destaque, nó central |
| Glow danger | `shadow-glow-danger` | Alert row crítico |

- Hierarquia por `surface-0 → 1 → 2 → 3` + borda.
- Sombra só em showcase. Glow só nos usos da tabela.

---

## Ícones

| Propriedade | Valor |
|---|---|
| Estilo | Outline, stroke `1.5` |
| Sistema | Lucide; alternativa Heroicons outline |
| Fonte | `thiago/image/icons/`, copiado para `public/icons/` de cada site pelo build; nunca criar ícone dentro do projeto |
| Arquivo | SVG de uma linha, `viewBox 0 0 24 24`, branco (`#fff`), sem `width`/`height`, `class`, `title` ou comentário; usado como máscara |
| Código | Desenho oficial sem alteração: Lucide `1.49.0` para traço (raiz `fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"`); Simple Icons `16.32.0` ou Lobe Icons `1.95.1` para logos (raiz `fill="#fff"`, mais `fill-rule` quando a fonte usa). Variante cheia só com `fill="#fff"` na raiz (`star-filled`) |
| Nome | Inglês; prefixo só quando há família ou ambiguidade (`chart-bar`, `arrow-left`, `card-credit`), senão nome simples (`clock`, `globe`, `mail`); logos de tecnologia com `tech-` (`tech-docker`) |
| Duplicata | Antes de incluir, comparar o desenho com o catálogo; mesmo desenho é um arquivo só. Renomear ou trocar desenho exige ajustar as referências nos projetos |
| Tamanhos | `size-4` inline · `size-5` padrão · `size-6` sidebar |
| Cor default | `text-fg-subtle` |
| Cor ativa | `text-brand` |
| Container circular | `size-9 rounded-full bg-surface-3 border border-line grid place-items-center` |
| Container brand | `size-9 rounded-full bg-brand/15 text-brand grid place-items-center` |
| Container info | `size-9 rounded-full bg-info/15 text-info grid place-items-center` |

---

## Componentes

### App Shell

```
grid min-h-screen grid-cols-[56px_minmax(0,1fr)] bg-surface-0 text-fg
```

| Parte | Classes |
|---|---|
| Rail | `sticky top-0 h-screen flex flex-col items-center gap-1 py-4 bg-surface-sunken border-r border-line` |
| Main | `flex min-w-0 flex-col` |
| Topbar | `sticky top-0 z-20 flex h-14 items-center justify-between gap-4 px-6 border-b border-line bg-surface-0/80 backdrop-blur` |
| Content | `flex-1 overflow-y-auto p-6` |

### Sidebar Item

```
relative grid size-10 place-items-center rounded-control text-fg-subtle
hover:bg-white/5 hover:text-fg
aria-[current=page]:text-brand aria-[current=page]:bg-brand/10
aria-[current=page]:before:absolute aria-[current=page]:before:left-0 aria-[current=page]:before:h-5 aria-[current=page]:before:w-0.5 aria-[current=page]:before:rounded-full aria-[current=page]:before:bg-brand
```

- Só ícone + tooltip. Nunca label permanente nem sidebar larga.

### Search / Command Bar

```
flex h-9 w-full max-w-sm items-center gap-2 rounded-control border border-line bg-surface-1 px-3 text-sm text-fg
focus-within:border-line-strong focus-within:ring-2 focus-within:ring-brand/40
```

| Parte | Classes |
|---|---|
| Ícone | `size-4 text-fg-subtle` |
| Input | `flex-1 bg-transparent outline-none placeholder:text-fg-subtle` |
| Atalho | `rounded-badge border border-line bg-surface-3 px-1.5 py-0.5 font-mono text-[10px] text-fg-subtle` |

### Toggle Switch

```
relative h-5 w-10 rounded-full bg-surface-3 transition-colors
peer-checked:bg-brand
after:absolute after:top-0.5 after:left-0.5 after:size-4 after:rounded-full after:bg-fg after:transition-transform
peer-checked:after:translate-x-5
```

Label: `font-mono text-xs text-fg-subtle`.

### Segmented Control (1H / 24H)

| Parte | Classes |
|---|---|
| Grupo | `inline-flex rounded-control border border-line bg-surface-sunken p-0.5` |
| Item | `rounded-badge px-2.5 py-1 text-xs font-semibold text-fg-subtle hover:text-fg` |
| Ativo | `bg-surface-3 text-fg` |

### Status Indicator

| Variante | Classes |
|---|---|
| Dot | `size-2 rounded-full` + `bg-success` / `bg-warning` / `bg-danger` / `bg-info` / `bg-fg-faint` |
| Live | `size-2 rounded-full bg-brand animate-pulse-dot` |
| Com texto | `inline-flex items-center gap-2 text-xs font-medium text-fg-muted` |
| Com halo | `relative before:absolute before:-inset-1.5 before:rounded-full before:bg-brand/20` |

### Card Base

```
rounded-card border border-line bg-surface-1 p-6
```

| Estado | Adicionar |
|---|---|
| Hover (interativo) | `hover:border-line-strong transition-colors` |
| Selecionado | `border-brand/30` |
| Crítico | `border-danger/30 bg-danger/5` |
| Showcase | `rounded-panel shadow-panel` |
| Com header | `flex items-center justify-between mb-4` (eyebrow à esquerda, badge/ícone à direita) |

### Card KPI

```
rounded-card border border-line bg-surface-1 p-5 flex flex-col gap-2
```

| Parte | Classes |
|---|---|
| Header | `flex items-start justify-between` |
| Valor | `flex items-baseline gap-1.5` → `kpi-xl` + `kpi-unit` |
| Label | `text-sm font-medium text-fg` |
| Auxiliar | `text-xs text-fg-subtle` |
| Delta | `flex items-center gap-1 delta` |
| Ícone | Container brand ou info (Ícones) |
| Visual | `mt-4 h-8` (sparkline/barras) ou `mt-4` (progress/ring/status) |

| Visual | Classes |
|---|---|
| Barras | `flex items-end gap-1` + `rounded-badge bg-brand-deep`, destaque `bg-brand` |
| Sparkline | `stroke-info` |
| Ring | Score Ring |
| Progress | Progress Bar |
| Status line | `font-mono text-xs text-success` |

### Feature Card

```
overflow-hidden rounded-panel border border-line bg-surface-1 flex flex-col
```

| Parte | Classes |
|---|---|
| Preview | `p-5 flex-1` (mini-UI: eyebrow + badge + visual) |
| Zona texto | `p-6 bg-surface-2 border-t border-line-subtle` |
| Título | `flex items-center justify-between` → `heading-card` + ícone `size-4 text-fg-subtle` |
| Descrição | `mt-2 body-lg` |

### Badge

```
inline-flex items-center gap-1.5 rounded-badge px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider
```

| Variante | Classes | Exemplos |
|---|---|---|
| Success | `bg-success/10 text-success` | SUCCESS, 24 ACTIVE, 142, LIVE |
| Warning | `bg-warning/10 text-warning` | WARNING, ELEVATED, PEAK |
| Danger | `bg-danger/10 text-danger` | ALERT DETECTED, 2 UNRESOLVED |
| Info | `bg-info/10 text-info` | INFO |
| Neutral | `bg-surface-3 text-fg-muted border border-line` | NET_SCAN::ACTIVE |
| Outline brand | `border border-brand/40 text-brand` | — |
| Com dot | prefixe `<span class="size-1.5 rounded-full bg-current">` | ● LIVE, ● ALERT DETECTED |
| Mono | adicione `font-mono font-medium normal-case tracking-normal` | 99.9%, IP:10.4.2.1 |

- Só com estado real. Nunca decorativo.

### Botão

Base: `inline-flex items-center justify-center gap-1.5 rounded-control text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-40 disabled:pointer-events-none` + Focus (Estados globais).

| Variante | Classes | Tamanho | Uso |
|---|---|---|---|
| Primary | `bg-brand text-surface-0 hover:bg-brand-hover` | `h-9 px-4` | CTA — nunca dentro de painel de monitoramento |
| Secondary | `border border-line bg-transparent text-fg hover:bg-white/5` | `h-9 px-4` | Ação secundária |
| Ghost inline | `bg-surface-3 text-fg hover:bg-white/10` | `h-7 px-2.5` | BLOCK |
| Outline inline | `border border-line text-fg-muted hover:text-fg hover:border-line-strong` | `h-7 px-2.5` | INVESTIGATE |
| Danger tonal | `bg-danger/10 text-danger border border-danger/30 hover:bg-danger/15` | `h-7 px-2.5` | BLOCK crítico |
| Icon | `size-8 text-fg-subtle hover:text-fg hover:bg-white/5` | — | Ações de header |

### Activity Log Row

```
flex items-center gap-3 rounded-control px-3 py-2.5
```

| Parte | Classes |
|---|---|
| Badge | Badge (SUCCESS / WARNING / INFO) |
| Mensagem | `flex-1 truncate text-sm text-fg` |
| Timestamp | `font-mono text-xs text-fg-subtle tabular-nums` |
| Ação | Botão ghost inline (opcional) |
| Warning row | `bg-surface-2 border border-line` |
| Hover | `hover:bg-white/[0.03]` |

Container: `divide-y divide-line-subtle` ou `space-y-1`.

### Alert / Threat Row

```
rounded-control border p-4 space-y-2
```

| Severidade | Classes |
|---|---|
| Danger | `border-danger/30 bg-danger/[0.06]` |
| Warning | `border-warning/30 bg-warning/[0.06]` |
| Resolvido / baixo | `border-transparent bg-transparent opacity-70` |

| Parte | Classes |
|---|---|
| Header | `flex items-center justify-between` |
| Título | `flex items-center gap-2 text-sm font-medium` + `text-danger` / `text-warning` (dot `size-1.5 rounded-full bg-current`) |
| Tempo | `font-mono text-[11px] text-fg-subtle` |
| Corpo | `text-xs text-fg-muted` |
| Ação | `flex justify-end` + botão inline |

### Agent / Node List Item

```
flex items-center justify-between rounded-control px-3 py-2.5 border border-line-subtle bg-surface-2/60
```

| Parte | Classes |
|---|---|
| Esquerda | `flex items-center gap-2.5` → dot (Status Indicator) + nome `text-sm font-medium text-fg` |
| Sub-label | `font-mono text-[11px] text-fg-subtle` (node-us-east-1) |
| Direita | `mono-status` + cor semântica |
| Selecionado | `bg-surface-2 border-line` |
| Offline | `opacity-50` + dot `bg-danger` + texto `text-fg-faint` |

### Progress Bar

| Parte | Classes |
|---|---|
| Label row | `flex items-center justify-between font-mono text-[11px] text-fg-subtle` |
| Track | `h-1.5 w-full rounded-full bg-surface-3` |
| Fill | `h-full rounded-full` + `bg-brand` / `bg-info` / `bg-warning` / `bg-danger` |
| Gradiente | `bg-linear-to-r from-brand to-info` |
| Escala | `flex justify-between font-mono text-[10px] text-fg-faint` (0ms — 100ms) |

- Sempre `role="progressbar" aria-valuenow aria-valuemin aria-valuemax`.

### Score Ring

```
relative size-14 grid place-items-center
```

| Parte | Classes |
|---|---|
| Track (SVG circle) | `stroke-surface-3 fill-none stroke-[4]` |
| Fill | `stroke-brand fill-none stroke-[4] [stroke-linecap:round] -rotate-90 origin-center` |
| Valor | `text-xl font-medium tabular-nums text-fg` |
| Label | `text-[10px] uppercase tracking-wider text-brand` |

### Execution Path (Trigger → Condition → Action)

| Parte | Classes |
|---|---|
| Container | `flex items-center gap-3` |
| Step | `flex flex-col items-center gap-2` |
| Ícone | `size-8 rounded-control border border-line bg-surface-2 grid place-items-center text-fg-subtle` (ativo: `text-brand border-brand/30`) |
| Label | `text-[10px] uppercase tracking-wider text-fg-subtle` |
| Conector | `h-px flex-1 bg-line` |
| Resultado | `rounded-control border border-line bg-surface-sunken px-3 py-2 font-mono text-xs text-fg-muted` + prefixo `text-success` |

### Event Timeline

```
relative space-y-4 pl-4 before:absolute before:left-1 before:top-1 before:bottom-1 before:w-px before:bg-line
```

| Parte | Classes |
|---|---|
| Item | `relative` |
| Dot | `absolute -left-[13px] top-1.5 size-1.5 rounded-full bg-brand` (histórico: `bg-fg-faint`) |
| Texto | `text-sm text-fg` (histórico: `text-fg-subtle`) |
| Hora | `font-mono text-[11px] text-fg-subtle` |

### Integration Card

```
rounded-card border border-line bg-surface-1 p-4 space-y-3
```

| Parte | Classes |
|---|---|
| Header | `flex items-center gap-3` → logo `size-9 rounded-control border border-line bg-surface-2 grid place-items-center` + nome `text-sm font-semibold text-fg` |
| Status | `flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-success` + dot |
| Descrição | `text-xs text-fg-muted` |
| Footer | `flex justify-between pt-3 border-t border-line-subtle font-mono text-[11px] text-fg-subtle` + `text-success` |

### Threat Matrix

| Parte | Classes |
|---|---|
| Grid | `grid grid-cols-2 border border-line-subtle divide-x divide-y divide-line-subtle` |
| Célula | `relative h-8` |
| Marcador | `absolute size-2 rounded-full` + `bg-danger` / `bg-warning` + halo `shadow-[0_0_8px] shadow-danger/60` |
| Linha de legenda | `flex justify-between font-mono text-[11px]` → label `text-danger uppercase` + IP `text-fg-subtle` |

### Chart Container

```
rounded-card border border-line bg-surface-1 p-6
```

| Parte | Classes |
|---|---|
| Header | `flex items-start justify-between mb-6` |
| Título | `heading-panel` + subtítulo `body-sm` |
| Legenda | `flex items-center gap-4 text-xs text-fg-muted` (dot + label) |
| Badge LIVE | Badge neutral + dot success |
| Plot area | `h-64 w-full` |
| Radar / topologia | `rounded-control bg-surface-sunken border border-line-subtle` + fundo `bg-[radial-gradient(circle,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-[size:16px_16px]` |
| Anotação PEAK | `rounded-badge bg-surface-3 border border-line px-2 py-0.5 text-[10px] font-mono text-fg` |

---

## Layout

| Padrão | Classes |
|---|---|
| Container | `mx-auto w-full max-w-7xl px-6 lg:px-8` |
| Header split | `grid gap-6 lg:grid-cols-2 lg:gap-16 items-end` |
| KPI strip | `grid gap-4 sm:grid-cols-2 xl:grid-cols-4` |
| Feature trio | `grid gap-6 md:grid-cols-2 xl:grid-cols-3` |
| Analytics duo | `grid gap-6 xl:grid-cols-2` |
| Dashboard mosaic | `grid gap-6 lg:grid-cols-12` — cards com `lg:col-span-5/7` ou `6/6` |
| Painel interno split | `grid grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] divide-x divide-line` |

### Breakpoints e container queries

O padrão começa em `sm:` = 640px — abaixo disso todo celular cai na base. Feche a lacuna com `2xs` e `xs` no `@theme`; acima de 1536px, `3xl`/`4xl` só se o layout mudar (se for só largura, `max-w-*`):

```css
@theme {
  --breakpoint-2xs: 22.5rem;  /* 360px → 2xs:* */
  --breakpoint-xs: 30rem;     /* 480px → xs:*  */
  --breakpoint-3xl: 120rem;   /* 1920px → 3xl:* */
  --breakpoint-4xl: 160rem;   /* 2560px → 4xl:* */
}
```

| Prefixo | Min-width | Faixa | Alvo | Origem |
|---|---|---|---|---|
| (base) | 0 | 0–359px | celular pequeno (320) | — |
| `2xs:` | 22.5rem (360px) | 360–479px | celular comum (360–430) | `@theme` |
| `xs:` | 30rem (480px) | 480–639px | celular grande, paisagem | `@theme` |
| `sm:` | 40rem (640px) | 640–767px | paisagem, tablet pequeno | padrão |
| `md:` | 48rem (768px) | 768–1023px | tablet | padrão |
| `lg:` | 64rem (1024px) | 1024–1279px | notebook | padrão |
| `xl:` | 80rem (1280px) | 1280–1535px | desktop | padrão |
| `2xl:` | 96rem (1536px) | 1536–1919px | tela grande, 1920 com escala 125% | padrão |
| `3xl:` | 120rem (1920px) | 1920–2559px | Full HD, ultrawide | `@theme`, opcional |
| `4xl:` | 160rem (2560px) | ≥ 2560px | QHD/4K sem zoom, TV | `@theme`, opcional |

- Todo breakpoint em `rem`, a unidade do padrão: misturar `px` e `rem` ordena as classes errado e uma sobrescreve a outra. Nunca altere os valores padrão.

---

## Motion

| Comportamento | Classes |
|---|---|
| Transição padrão | `transition-colors duration-150` |
| Hover de card | `transition-[border-color,box-shadow] duration-200` |
| Live dot | `animate-pulse-dot` |
| Toggle | `transition-transform duration-200` |
| Progress fill | `transition-[width] duration-500 ease-out` |
| Entrada de card | `animate-in fade-in slide-in-from-bottom-2 duration-300` — requer `tw-animate-css` |
| Reduzir movimento | `motion-reduce:animate-none motion-reduce:transition-none` |

- Anime só cor, borda e opacidade. Nunca `scale` em hover nem sombra crescente.

---

## Estados globais

| Estado | Classes |
|---|---|
| Focus | `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0` |
| Disabled | `opacity-40 pointer-events-none` |
| Loading (skeleton) | `animate-pulse rounded-control bg-surface-3` |
| Empty | `grid place-items-center gap-2 p-8 text-center text-sm text-fg-subtle border border-dashed border-line rounded-card` |
| Error | `border-danger/30 bg-danger/[0.06] text-danger` |
| Selected | `border-brand/30 bg-brand/5` |
