# Direção criativa — back.thiagoeti.dev

## 1. Divergir — 10 conceitos

| # | Conceito | Metáfora central |
|---|---|---|
| 1 | Cofre | Mostrador de combinação: cada back-end é um número do disco |
| 2 | Livro-razão | Fita contínua de lançamentos, débito à esquerda, crédito à direita |
| 3 | Osciloscópio | Cada back-end é uma onda de requisições na tela de fósforo |
| 4 | Catraca | Requisição passa (201) ou trava (422) |
| 5 | Câmara de compensação | Mesa onde os PIX se cruzam e são liquidados |
| 6 | Relógio de ponto | Cada requisição carimba a hora no cartão |
| 7 | Ampulheta | O saldo escorre grão a grão até R$ 10,00 |
| 8 | Quadro de disjuntores | Cada back-end é um disjuntor que desarma no saldo zero |
| 9 | Sismógrafo | Concorrência como tremor registrado em papel |
| 10 | Ábaco | Contas deslizam nas hastes; 33 passam, o resto para |

## 2. Radicalizar — os 3 melhores

| Conceito | Ao extremo |
|---|---|
| Cofre | Nenhuma linha reta além do ponteiro: tudo é anel, arco e raio; a página inteira é o disco |
| Catraca | Cada clique é uma requisição: 201 gira a catraca, 422 trava com um tranco |
| Ampulheta | O saldo é matéria: o número central esvazia enquanto os PIX entram |

## 3. Cruzar — híbrido

Cofre (forma e navegação) + catraca (física de trava: aprovado avança, recusado não) + ampulheta (anel de respostas que se enche durante o cenário).

## 4. Convergir — direção escolhida: **Cofre**

Os cinco projetos guardam o mesmo saldo sob o mesmo ataque: R$ 1.000,00, dezenas de PIX simultâneos, saldo nunca negativo.
Um mostrador de cofre torna isso visível sem texto: cada setor é um back-end, o anel de respostas é a prova.
A forma radial nasce da própria grade polar dos glifos — navegação, ilustração e dado falam a mesma geometria.

## 5. Sistematizar

### Gramática (regra única)

| Regra | Valor |
|---|---|
| Grade | Polar: centro, 4 anéis, 12 raios a 30° (0° no topo, sentido horário) |
| Primitivas | Anel, arco, raio, ponto |
| Traço | 1.5, `non-scaling-stroke`, pontas e junções redondas |
| Cheio | Aprovado, ativo, presente |
| Vazado | Recusado, inativo, ausente |
| Emblema | Um anel por tag, de dentro para fora, na ordem do `data.json`; ponto central = saldo |

### Cor (2 + 1)

| Papel | Token |
|---|---|
| Fundo | `surface-*` |
| Luz | `fg`, `fg-muted`, `fg-subtle`, `fg-faint` — mesma cor, outra luminosidade |
| Acento | `brand` |

### Tipo (1)

JetBrains Mono, 400–600. Saldo como assinatura tipográfica: reais grandes, centavos menores, `tabular-nums`.

### Movimento (1)

Trava: `cubic-bezier(0.34, 1.56, 0.64, 1)` em 320 ms — token `ease-detent`. Ponteiro, troca de setor, pranchas e marcas do anel. `motion-reduce` desliga.

## Mapa de navegação

```
/ (mostrador)
├── setor N ──clique──▶ /<slug> (pranchas: ficha → diagrama → cenário → como funciona → executar → skills → trade-offs → código → próximo)
├── ?tag=<tag> ── apaga setores sem a tag
├── anel externo ──▶ ecossistema (nova aba)
└── teclado: ← → gira · 1–9 salta · Enter abre · "pix" dispara o cenário
/<slug>
├── régua de pranchas (topo no desktop, base no mobile)
├── roda do mouse ▶ eixo horizontal
├── tag ──▶ /?tag=<tag>
└── última prancha ──▶ próximo cofre
/404 ── ACCOUNT_NOT_FOUND
```

## Inventário de componentes

| Componente | Arquivo | Comportamento |
|---|---|---|
| Mostrador | `src/components/dial.astro` | Setores, ponteiro, anel de respostas, saldo central, anel do ecossistema |
| Leitor | `src/components/readout.astro` | Ficha do setor em foco; no mobile, um painel por projeto |
| Emblema | `src/components/glyph.astro` | Fragmentos das tags na grade polar |
| Anel de respostas | `src/components/ring.astro` | Uma marca por resposta HTTP do README: cheia 2xx, vazada 4xx |
| Rosácea | `src/components/rosette.astro` | Diagrama mermaid em coordenadas polares |
| Balança | `src/components/balance.astro` | Trade-offs: vantagens num prato, desvantagens no outro |
| Blindagem | `src/components/shield.astro` | Flags de segurança do `docker.sh` como raios acesos |
| Régua | `src/components/ruler.astro` | Índice das pranchas, item ativo aceso |
| Trinco | classe `LATCH` em `src/lib/site.ts` | Botão com anel que fecha no hover |

## Auditoria do clichê

| Tela | Óbvio | Substituído por |
|---|---|---|
| Capa | Grade de cards | Mostrador radial |
| Capa | Hero com 2 botões | Saldo no centro do disco |
| Projeto | Página longa de README | Pranchas horizontais |
| Projeto | Diagrama mermaid | Rosácea polar |
| Projeto | Tabela de trade-offs | Balança |
| Rodapé | 4 colunas | Anel do ecossistema |
| 404 | "Página não encontrada" | Conta inexistente recusada pelo cofre |
