# Direção criativa — back.thiagoeti.dev

## Revisão 10 — sistemas em funcionamento e glifos de tecnologia

Retorno da revisão 9: a abertura deve transferir dados sem parar e os glifos dela representam sistemas; cada projeto tem um glifo da sua tecnologia; "Como ler um selo" sai — glifo que precisa de legenda não está bom.

| Decisão | Como |
|---|---|
| Abertura | Back-end em funcionamento: navegador, app e sistema legado → entrada → três serviços → fila, cache → workers → banco de dados. Dados correm sem parar: requisição vai e resposta volta (`sync`), mensagem vai para a fila e para o worker (`async`), escrita vai ao banco e a confirmação volta (`store`). O sistema que recebe pulsa |
| Glifo do projeto | Vocabulário de tecnologia (`src/lib/techglyph.ts`): a linguagem é a moldura com a etiqueta (PHP oval, Python dois quadros entrelaçados, TypeScript quadro de arquivo), o framework do título é o motivo central (corrotinas, camadas, workers com memória compartilhada, raio no laço de eventos, prisma tipado, árvore de HTML) e as demais tecnologias são satélites ligados à moldura |
| Sem legenda | Os glifos se explicam pela forma e pela stack escrita logo abaixo |
| Página do projeto | O glifo grande com dados correndo entre a moldura e os satélites |
| 404 | Um serviço tracejado, vazio; as requisições chegam e voltam vermelhas |
| Movimento | Contínuo só onde há sistema funcionando (abertura e glifo do projeto); para fora da tela, com a aba oculta e com `prefers-reduced-motion` |

Sai: selos, legenda do selo, contadores de replay.

## Revisão 9 — recebendo requisições, em glifos

Retorno da revisão 8: a ideia de receber requisições ficou; a abertura não pode citar linguagem nem tecnologia — é vitrine de projetos — e os glifos devem carregar o visual.

| Decisão | Como |
|---|---|
| Abertura sem tecnologia | Cena de glifos: clientes (navegador, app, sistema legado) → entrada → selos dos projetos. Nenhum nome de linguagem, só o número do nó |
| Glifo por projeto | **Selo**: círculo gerado com o dado do projeto, de fora para dentro — respostas, blindagem, código, diagrama, número do nó (`src/lib/seal.ts`) |
| Requisições | Cada resposta gravada na `Saída` do README é uma requisição: sai do cliente, passa pela entrada, chega ao selo, acende o traço e volta na cor da resposta |
| Vitrine | Um selo grande por projeto, com a leitura do selo em números ao lado |
| Página do projeto | O selo grande recebendo as requisições de fora; uma seção por anel, com a chave do anel (miniatura do selo com o anel aceso) |
| 404 | Selo vazio: as requisições chegam e voltam vermelhas |

Sai: pista por projeto, frota em tabela, player de capítulos.

## Revisão 8 — replay (substituída)

## Ideação (skill `creative`)

Técnicas: analogia (caixa-preta de avião, pista de corrida), restrição forçada (a página inteira é um único gesto), primeiros princípios (premissa quebrada: "portfólio se lê" → portfólio se executa).

| # | Ideia | Destino |
|---|---|---|
| 1 | Dashboard com KPIs e cards | óbvia — é a revisão 7 |
| 2 | Site inteiro como terminal | óbvia — clichê de dev |
| 3 | Command palette como única navegação | óbvia — Raycast |
| 4 | O visitante dispara a carga: seis pistas, uma por projeto, cada resposta da `Saída` do README vira um pacote que chega ou volta | **eleita — capa** |
| 5 | Caixa-preta: a página do projeto toca a execução gravada do README, capítulo a capítulo, com barra de progresso | **eleita — projeto** |
| 6 | Quadro de partidas de aeroporto | descartada — fora do tema Dark Ops |
| 7 | Tabela de frota ordenável (blindagem, linhas, aceitas) | **eleita — inventário** |
| 8 | Sismógrafo por projeto | descartada — repete a rajada da revisão 7 |
| 9 | Grafo de forças arrastável | descartada — efeito sem informação nova |
| 10 | 404 como pacote que volta da rota inexistente | **eleita — 404** |

Convergência (impacto · novidade · aderência = 5 · 5 · 5): 4, 5, 7 e 10 contam a mesma história — **cada projeto é uma execução gravada que o visitante reproduz**. Quem contrata vê dinheiro que nunca fica negativo sob 50 PIX simultâneos; quem avalia vê container, passos, comandos e código na ordem em que rodam.

## Conceito

**Replay.** O site não descreve os projetos: reproduz a execução que cada README registra. Tudo é replay de dado gravado (`Saída:`, `Cenário`, `docker.sh`, `Como funciona`, `Executar`) — nada "ao vivo", e a interface diz isso.

## Regras

- Uma ousadia por tela: a pista (capa), o player (projeto), o pacote que volta (404).
- O replay toca uma vez ao entrar na tela e repete no botão. `prefers-reduced-motion`: estado final direto.
- Sem JS, toda tela mostra o estado final: nenhum dado depende de animação.
- Cor só com significado: `2xx` = `success`, `4xx` = `warning`, rota inexistente e flag ausente = `danger`, projeto sem container = `info`.
- Movimento por Web Animations API (`transform`, `opacity`); nenhum `style` escrito.

## Telas

| Tela | Ousadia | Resto |
|---|---|---|
| `/` | **Pista de carga**: seis pistas; pacotes saem do cliente, os aceitos chegam e somam, os recusados batem e voltam; contadores e saldo final por pista; barra de status com os totais | Frota em tabela ordenável e filtrável (busca, tags), repositórios, palavras-chave |
| `/<projeto>` | **Player**: ▶ toca os capítulos 1 Container (flags acendem), 2 Como funciona (passos), 3 Executar (comandos), 4 Rajada (células), 5 Saída; barra com marcadores, tempo e capítulo atual | Diagrama, trade-offs, skills, ficha, container, código, links, vizinhos |
| `404` | Uma pista: o pacote vai até o endereço e volta `404` | Alerta com o endereço e volta para a capa |

## Mapa referência → componente → dado

| Referência | Componente `THEME.md` | Dado |
|---|---|---|
| AI Agent Activity, Real-time Activity Log | Chart Container + Activity Log Row | Pistas da capa: respostas da `Saída` |
| Agent Fleet, Active Agents | Agent / Node List Item | Frota: uma linha por projeto |
| NODE-A/B/C, Infra Health | Progress Bar + Score Ring | Linhas de código, blindagem |
| Search ⌘K | Search / Command Bar | Busca e tags |
| Execution Path | Execution Path | Capítulos do player |
| Threat Detection Console | Alert / Threat Row | Capítulo Container |
| System Event Log | Event Timeline | Capítulo Como funciona |
| Terminal | Card Base + mono | Capítulo Executar |
| Barra inferior do app shell | Topbar invertida | Barra de status da pista, player fixo |
| Card AWS | Integration Card | Repositórios, skills, links, ecossistema |

## Mobile

- Pista: nome em cima, trilho na largura toda, contadores embaixo — não é a pista do desktop encolhida.
- Frota: cada linha vira bloco de rótulo e valor; ordenação no topo.
- Player na régua fixa acima do menu inferior (ação principal ao alcance do polegar).
- Busca e tags na régua da capa; ecossistema e contatos no botão Rede.

## Easter eggs

1. Console: a pista em ASCII.
2. Digitar `pix`: dispara as seis pistas de novo.
3. Página do projeto: `espaço` toca e pausa o player.

## Inventário (revisão 9, substituído)

| Componente | Papel |
|---|---|
| `hero-flow.astro` | Cena da abertura: clientes, entrada, selos (paisagem e retrato) |
| `seal.astro` | Selo do projeto |
| `seal-legend.astro` | Como ler um selo |
| `showcase-card.astro` | Peça da vitrine |
| `ring-key.astro` | Chave do anel nas seções do projeto |
| `command-bar.astro` | Busca e tags |
| `threat-console.astro`, `timeline.astro`, `terminal.astro`, `board-diagram.astro`, `source-panel.astro`, `integration.astro` | Seções do projeto |
| `badge.astro`, `ring.astro`, `icon.astro`, `link-row.astro`, `shapes.astro` | Peças |

## Inventário (revisão 10)

| Componente | Papel |
|---|---|
| `hero-systems.astro` | Abertura: glifos de sistema e trilhos (paisagem e retrato) |
| `tech-glyph.astro` | Glifo de tecnologia do projeto |
| `showcase-card.astro` | Peça da vitrine |
| `command-bar.astro` | Busca e tags |
| `threat-console.astro`, `timeline.astro`, `terminal.astro`, `board-diagram.astro`, `source-panel.astro`, `integration.astro` | Seções do projeto |
| `badge.astro`, `ring.astro`, `icon.astro`, `link-row.astro`, `shapes.astro` | Peças |
