---
name: front-tailwind
description: Use sempre que for usar Tailwind em qualquer projeto que utilize Tailwind.
license: Unlicense
metadata:
  author: thiagoeti
  version: 1.0.0
---

#work

# Tailwind CSS

- Sempre Tailwind v4.
- Nunca utilizar CSS puro, somente as classes do Tailwind.
- HTML semântico é **prioridade**.

## Fluxo Cognitivo (Workflow)

- Escolha a tag HTML semântica antes de qualquer classe.
- Customização ou valor fora da escala (cor, fonte, espaço) → token no `@theme` antes de usar.
- Escreva a base sem prefixo (mobile); adicione `2xs:` `xs:` `sm:` `md:` `lg:` `xl:` `2xl:` (`2xs`/`xs` declarados no `@theme`; celular nunca com `sm:`). Componente reusado em larguras diferentes → container query (`@container` + `@md:`).
- Acessibilidade: `focus-visible:` em todo interativo; contraste ≥ 4.5:1 no texto e ≥ 3:1 em anel e borda de controle, em cada tema; movimento sob `motion-safe:`.
- Ordene nos 6 blocos: ESTRUTURA → LAYOUT → FORMATAÇÃO → COMPORTAMENTO → RESPONSIVIDADE → ESTADOS.

## Regras Estritas de Execução

- Passou de ~8 utilitários ou ~80 caracteres → uma linha por bloco.
- O prefixo de variante vence a propriedade: `md:p-4` vai para RESPONSIVIDADE; `hover:bg-blue-500` vai para ESTADOS.

## Referência Técnica

### Ordem de classes

| Bloco | Subcategoria (em ordem) | Exemplos |
|---|---|---|
| **1 ESTRUTURA** | Dimensões | `w-full` `h-screen` `max-w-md` `min-h-0` `size-8` `aspect-video` |
| | Espaçamento | `p-4` `px-6` `m-2` `-mt-1` `space-y-4` |
| **2 LAYOUT** | Display | `flex` `grid` `block` `hidden` `inline-flex` |
| | Flex/Grid | `flex-col` `flex-wrap` `grid-cols-3` `items-center` `justify-between` `gap-4` |
| | Posição | `relative` `absolute` `inset-0` `top-4` `z-10` |
| | Overflow | `overflow-hidden` `overflow-x-auto` |
| **3 FORMATAÇÃO** | Tipografia | `text-sm` `font-semibold` `leading-tight` `tracking-wide` `truncate` |
| | Cor/Background | `text-white` `bg-blue-600` `from-blue-500` |
| | Borda/Ring | `border` `border-gray-200` `rounded-lg` `ring-2` `divide-y` |
| | Efeito/Sombra | `shadow-sm` `opacity-50` `mix-blend-multiply` |
| | Filtro | `blur-sm` `backdrop-blur` `grayscale` |
| **4 COMPORTAMENTO** | Transição/Transform | `transition-colors` `duration-200` `ease-out` `scale-105` `rotate-3` |
| | Interação | `cursor-pointer` `select-none` `pointer-events-none` |
| **5 RESPONSIVIDADE** | Breakpoint → Container | `md:flex-row` `lg:grid-cols-3` `md:p-4` `@md:w-1/2` |
| **6 ESTADOS** | Interação → Tema → Pai/irmão | `hover:bg-blue-500` `hover:p-4` `focus-visible:outline-2` `dark:bg-gray-800` `group-hover:opacity-100` |

**IMPORTANTE seguir o padrão e a convenção.**

### Tema no CSS (`@theme`)

Cada variável gera utilitários e vira custom property, usável com `var()`.

```css
@import "tailwindcss";
@theme {
  --color-brand-500: oklch(0.62 0.19 255);  /* → bg-brand-500, text-brand-500, border-brand-500… */
  --font-display: "Inter", sans-serif;      /* → font-display */
  --text-hero: 3.5rem; --text-hero--line-height: 1.05;  /* → text-hero */
  --spacing: 0.25rem;                       /* p-4 = 4 × 0.25rem; qualquer inteiro funciona (p-13) */
  --breakpoint-3xl: 1920px;                 /* → 3xl:*  */
  --container-8xl: 90rem;                   /* → max-w-8xl e @8xl: */
}
```

- Estender: só adicione variáveis. Design system fechado: `--color-*: initial;` antes de redefinir o namespace.
- Cor em OKLCH.
- Variável na classe: `bg-(--color-brand)` `text-(length:--text-hero)`, nunca `bg-[var(--color-brand)]`.

## Breakpoints e Container

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

```txt
Container: @3xs 16rem  @2xs 18rem  @xs 20rem  @sm 24rem  @md 28rem  @lg 32rem  @xl 36rem  @2xl 42rem  …@7xl
```

- `sm:` = ≥ 640px, não "tela pequena". Celular se ajusta com `2xs:`/`xs:`, nunca com `sm:`.
- Teste de 320 a 1920px arrastando a régua: o pior bug fica **entre** breakpoints (ex.: 700px), não nos valores exatos. Confira zoom 200% e paisagem.
- Faixa: `max-md:` (< 768px), `md:max-xl:` (768–1279px), `@max-md:` em container.
- Layout da página → breakpoint. Componente em larguras variadas → container query.
