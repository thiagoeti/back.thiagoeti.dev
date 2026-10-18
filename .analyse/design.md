# Direção criativa — back.thiagoeti.dev

## Revisão 4 — por que recomeçar

| Retorno | Decisão |
|---|---|
| Fichário de fichas perfuradas "não ficou legal" | Metáfora nova, ligada ao próprio back-end: o rack de servidores |
| Layout igual aos irmãos (`stack`, `pattern`, `ai`) | Nada de hero à esquerda + mapa radial à direita, tabela periódica ou colunas por categoria: a página inteira é um objeto só, de cima a baixo |
| Valores de preço não fazem parte do projeto | Nenhum valor monetário vira indicador; os números medem o projeto (servidores, tags, arquivos, linhas, cpu, memória, porta) |
| Futurista demais (radar, neon, glow) | Hardware real e fosco: chapa, poste, porta RJ45, LED sólido, sem brilho |

## 1. Divergir — 10 conceitos

| # | Conceito | Metáfora central |
|---|---|---|
| 1 | Rack de servidores | Cada projeto é um servidor no rack; cada tag, uma porta do patch panel com cabo até o servidor |
| 2 | Mesma requisição, 5 servidores | Um `POST /pix` atravessa cinco raias, uma por runtime |
| 3 | Cozinha (back of house) | Comandas no trilho; cada tag uma estação |
| 4 | Painel de partidas split-flap | Cada projeto é uma linha que vira as palhetas |
| 5 | Mesa telefônica | Tags são jaques; a telefonista liga os cabos |
| 6 | Pátio de contêineres | Cada projeto é um contêiner empilhado |
| 7 | Sala de máquinas | Cada projeto é um motor com placa de identificação |
| 8 | Caixa de fusíveis | Cada tag é um disjuntor |
| 9 | Planta de subestação | Barramentos e chaves seccionadoras |
| 10 | Livro de ponto | Cada requisição é um carimbo de horário |

## 2. Radicalizar — os 3 melhores

| Conceito | Ao extremo |
|---|---|
| Rack de servidores | A página é a elevação frontal de um rack: tudo ocupa U inteiros, até o título e o rodapé |
| Mesma requisição | A capa é um diagrama de sequência gigante e horizontal |
| Cozinha | Toda interação é um pedido: fazer, preparar, servir |

## 3. Cruzar — híbrido

Rack (objeto e grade em U) + mesa telefônica (o filtro é ligar um cabo) + elevação de datacenter (posição `U14–13`, a linguagem de quem monta o rack).

## 4. Convergir — direção escolhida: **Rack de servidores**

Back-end é literalmente isto: servidores num rack, ligados por cabos — quem contrata entende em 2 segundos.
Os dados reais do `docker.sh` (cpu, memória, porta, processos, blindagem) viram a chapa de cada servidor; nada é decorativo.
O filtro por tag vira gesto físico: ligar a porta no patch panel e ver o cabo acender só os servidores que têm a tag.

## 5. Sistematizar

### Gramática (regra única)

Tudo ocupa um número inteiro de U (1U = 3rem na tela larga), entre dois postes com furos de porca-gaiola e o número do U.

| Peça | U | Conteúdo |
|---|---|---|
| Chapa de identificação | 3 | Título gravado, frase do `data.md`, selo `@thiagoeti` + papel, 6 indicadores |
| Patch panel | 2 | Uma porta RJ45 por tag (`01`…), mais `todas`; contagem de servidores ligados |
| Bandeja de cabos | 1 | Por onde os cabos correm até o organizador vertical; atalhos de teclado |
| Servidor | 2 | Número, posição, nome, subtítulo, tecnologias, tags, 6 LEDs de blindagem, visor (cpu, memória, porta, processos), uma baia por arquivo, uma porta por tag, alça |
| Gaveta de discos | 2 | Um repositório: nome, endereço, campos do `data.json`; uma baia por projeto |
| Régua de tomadas | 2 | Uma tomada por palavra-chave do `meta.json` |
| Switch | 3 | Uplinks = ecossistema; portas de console = contatos; a porta deste site acesa |

| Regra | Valor |
|---|---|
| LED | Cheio no acento = flag presente; vazado = ausente |
| Cabo | Sai da porta do patch panel, desce à bandeja, corre ao organizador, desce até o servidor e entra por baixo na porta |
| Baia | Barra interna mede as linhas do arquivo contra o maior arquivo do rack |
| Servidor fora da consulta | Apaga (opacidade), LEDs apagam, cabos quase somem |

### Cor (2 + 1)

| Papel | Token |
|---|---|
| Chapa, poste, chão | `surface-*` |
| Tinta e gravação | `fg`, `fg-muted`, `fg-subtle`, `fg-faint` |
| Ligado | `brand` — LED aceso, cabo ligado, porta ativa, ação principal |

### Tipo (1 família)

IBM Plex — Sans no texto; Sans Condensed na gravação da chapa (título, rótulos `plate`); Mono nos valores, números e código.

### Movimento (1)

Servidor correndo no trilho: `cubic-bezier(0.32, 0.72, 0, 1)` — token `ease-rail`. Cabo puxado da porta até o servidor, servidor apagando e acendendo, transição de página (a chapa clicada vira a chapa da página). `motion-reduce` desliga.

## Mapa de navegação

```
/ (rack)
├── patch panel ──porta──▶ cabo acende os servidores com a tag; os outros apagam; ?tag=<tag>
├── servidor ──clique / enter──▶ /<slug> (a chapa vira a chapa da página — view transition `server`)
├── gaveta de discos ── baia ──▶ /<slug>; nome ──▶ repositório no GitHub
├── switch ── uplinks e contatos (nova aba)
└── teclado: ↑ ↓ escolhe · 1–5 salta · enter abre · esc desliga a tag · "ping" · "reboot"
mobile: patch panel vira régua fixa acima do menu; switch vai para o botão Rede; sem cabos, as portas acendem

/<slug> (servidor puxado, chassi aberto)
├── chapa no alto: a mesma da capa + selo WIP (repositório com sufixo `_`)
├── mapa do chassi (esquerda, fixo): baias, cpus, pentes de memória, porta; compartimentos J1…Jn
├── J1 Frente: descrição, intro, dados, máquina, blindagem, tags (→ /?tag=), tecnologias
├── Jn README na ordem: Diagrama (trilhas da placa), Cenário, Como funciona (barramento), Executar (console), Skills, Trade-offs
├── Código: uma baia por arquivo, abre o código
├── Traseira: portas traseiras (links), servidor acima e abaixo, voltar ao rack
└── ← → puxam o servidor vizinho
/404 ── slot vazio: nenhum servidor responde neste endereço
```

## Inventário de componentes

| Componente | Arquivo | Comportamento |
|---|---|---|
| Elevação do rack | `src/lib/rack.ts` | Ordem, altura em U e numeração de cada painel |
| Painel no rack | `src/components/unit.astro`, `rail.astro` | Postes com furos e número do U, orelha aparafusada |
| Chapa de identificação | `src/components/nameplate.astro` | Título, frase, selo, indicadores |
| Patch panel | `src/components/patch-panel.astro` | Portas por tag; régua fixa no mobile (`dock`) |
| Servidor | `src/components/faceplate.astro` | Chapa frontal; mesma chapa no alto da página do projeto |
| LEDs | `src/components/leds.astro` | 6 flags do `docker.sh`; lista nomeada na página |
| Baias | `src/components/bays.astro` | Um arquivo por baia, barra pelas linhas |
| Porta RJ45 | `src/components/jack.astro` | Acende com `data-on` |
| Gaveta de discos | `src/components/storage.astro` | Repositório e uma baia por projeto |
| Régua de tomadas | `src/components/pdu.astro` | Palavras-chave |
| Switch | `src/components/switch.astro` | Ecossistema e contatos |
| Cabos | `src/scripts/rack.ts` | Desenho dos cabos, consulta, teclado, easter eggs |
| Mapa do chassi | `src/components/chassis-map.astro`, `src/scripts/chassis.ts` | Componentes do chassi e compartimento à vista |
| Compartimento | `src/components/compartment.astro` | Parte da página com designador `J1` |
| Trilhas da placa | `src/components/board-diagram.astro`, `src/lib/tracks.ts` | Mermaid como placa: chips, barramentos, trilhas numeradas |

## Componentes reinventados

| Comum | Como ficou |
|---|---|
| Filtro por tag | Ligar a porta no patch panel: o cabo acende os servidores |
| Card | Chapa frontal de servidor 2U |
| Hero | Chapa de identificação gravada no topo do rack |
| KPI | Números gravados na chapa |
| Badge de status | LED aceso ou apagado; selo WIP colado na chapa |
| Tabs | Mapa do chassi com compartimentos |
| Lista ordenada | Barramento com vias numeradas |
| Bloco de código | Console `tty` com a saída no acento |
| Rodapé | Switch: uplinks e portas de console |
| 404 | Slot vazio no rack |

## Easter eggs

- `ping`: o pacote desce o rack e cada servidor ligado pisca os LEDs.
- `reboot`: o rack apaga e religa, servidor por servidor.
- Console com o rack em ASCII.
- 404 como slot vazio.

## Auditoria do clichê

| Tela | Óbvio | Substituído por |
|---|---|---|
| Capa | Hero + grade de cards | Elevação do rack, de cima a baixo |
| Capa | Chips de filtro | Patch panel com cabos |
| Capa | Mapa radial (irmãos) | Cabeamento organizado em bandeja e organizador vertical |
| Projeto | Página longa de README | Chassi aberto com mapa e compartimentos |
| Rodapé | 4 colunas | Switch |
