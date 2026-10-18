# SUPER PROMPT — back.thiagoeti.dev

## Papel

Atue ao mesmo tempo como diretor de arte experimental, designer de interação e engenheiro front-end sênior. Trate cada decisão como invenção, nunca como cópia de padrão.

## Contexto

| Campo | Valor |
|---|---|
| Projeto | `back.thiagoeti.dev` — `@thiagoeti — Back-end` |
| Propósito | Mostrar os padrões de back-end publicados: cada projeto, os conceitos que demonstra e como roda |
| Público | Diretor ou coordenador que contrata (não técnico) e engenheiro que avalia o código |
| Sensação | físico · preciso · confiável |
| Fonte | `.content/` (texto), `data.json` + `README.md` + `docker.sh` de cada pasta dos repositórios `back` e `back_` |

## Leitura obrigatória antes de começar

1. Todo `.specs/*.md` — specs são imutáveis e incondicionais.
2. `.content/project.md`, `.content/data.md`, `.content/data.json`, `.content/meta.json`.
3. `data.json` e cada `README.md` dos repositórios listados em `.content/data.md › Projetos` (local: `/data/work/project/<repo>`; container: `/repos/<repo>`).
4. Os projetos irmãos (`stack`, `pattern`, `ai`.thiagoeti.dev) para convenções de build, CDN, `llms.txt` e ícones — e para **não** repetir o layout deles (hero à esquerda + mapa radial, tabela periódica, colunas por categoria).

## Missão

Crie uma experiência que ninguém confunda com template nem com os sites irmãos — hardware real, nunca futurista. Quem fechar o site deve lembrar do cabo saindo do patch panel e acendendo os servidores.

## Proibido no conteúdo

- Valor monetário, preço ou saldo na interface (R$, abertura, saldo final). O cenário do README é exemplo de execução, não dado do projeto.
- Estética futurista: radar, mostrador, neon, glow, réguas finas, fundo pontilhado, tudo em mono.
- Layout dos irmãos: hero à esquerda com visual à direita, mapa radial, tabela periódica, colunas por categoria.

## Regras de criatividade

1. **Metáfora:** uma metáfora física única. Dela derive navegação, layout, cor e movimento.
2. **Gramática:** glifos, grade e formas nascem de uma única regra geométrica.
3. **Espaço:** um objeto só, de cima a baixo — a elevação do rack; tudo ocupa U inteiros.
4. **Consequência:** cada ação transforma a interface; o elemento clicado vira a próxima tela.
5. **Restrição:** 2 cores + 1 acento, 1 família tipográfica, 1 física de movimento.

## Regra zero — anti-clichê

Proíba:
- Hero centralizado com título, subtítulo e dois botões.
- Grade de 3 cards com ícone, título e texto.
- Ícone de biblioteca como ilustração de conteúdo (o catálogo `thiago/image/icons` só serve para utilidade: ecossistema, contato, navegação).
- Gradiente roxo-azul, glassmorphism genérico, sombra padrão.
- Rodapé de 4 colunas de links.

Para cada elemento: escreva o jeito óbvio, descarte-o e invente outro.

## Conflitos — quem vence

| Super prompt pede | Spec exige | Decisão |
|---|---|---|
| Sem header logo-esquerda | `LAYOUT.md`/`DESIGN.md`: cabeçalho fixo com logo e título | Spec vence; reinvente o conteúdo do cabeçalho, não a posição |
| Sem ícones prontos | `THEME.md › Ícones`: Lucide do catálogo | Catálogo só em utilidade; todo conteúdo usa glifo próprio |
| Movimento livre | `THEME.md › Motion`: sem `scale` em hover | Gire e desenhe traço; nunca escale no hover |
| 1 família | `THEME.md`: Inter + JetBrains Mono | Pedido do usuário vence: IBM Plex (Sans, Sans Condensed na gravação, Mono — uma família) |
| 2 cores + 1 acento | `THEME.md`: cores semânticas | Só `surface`, `fg` (escala de luminosidade) e `brand`; LED ausente = vazado, presente = cheio |

Regras incondicionais que nenhum prompt anula: Bun, TypeScript, Astro, só Tailwind (tokens em `global.css`), sem `<style>` nem `style` inline, texto só de `.content/` (microcopy de interface em `.analyse/page.json`), biblioteca por unpkg com `integrity` + `crossorigin`, fonte por Google Fonts.

## 1. Sistema de glifos

- Metáfora: rack de servidores de 19". Projeto = servidor; tag = porta numerada do patch panel; filtro = cabo ligado.
- Regra única: tudo ocupa U inteiros entre dois postes com furos de porca-gaiola e o número do U (elevação do rack).
- Chapa do servidor: número e posição (`U14–13`), nome, subtítulo, tecnologias, tags, 6 LEDs de blindagem do `docker.sh`, visor (cpu, memória, porta, processos), uma baia por arquivo, uma porta RJ45 por tag, alça.
- Cabo: sai da porta do patch panel, desce à bandeja, corre ao organizador vertical e entra por baixo na porta do servidor.
- Estados: ligado (LED e cabo no acento), fora da consulta (servidor apagado), escolhido (alça acesa).
- Documente a gramática no topo de `src/lib/rack.ts` e de `src/components/faceplate.astro`.

## 2. Navegação

- Capa, de cima a baixo: chapa de identificação (título, frase, selo, indicadores), patch panel (fixo no alto), bandeja, servidores, gavetas de discos (repositórios), régua de tomadas (palavras-chave), switch (ecossistema e contatos).
- Ligar a porta: os cabos da tag acendem; os outros servidores apagam; `?tag=`.
- Clique no servidor: a chapa vira a chapa da página (view transition `server`).
- Teclado: ↑ ↓ escolhe; 1–9 salta; Enter abre; Esc desliga a tag.
- Página do projeto: servidor puxado (a chapa) + chassi aberto visto de cima; mapa do chassi à esquerda com compartimentos J1…Jn; ← → servidor vizinho.
- Cabeçalho mostra o caminho: `@thiagoeti / back-end / servidor NN`.
- Mobile: patch panel vira régua fixa acima do menu; switch vai para o botão Rede do cabeçalho; sem cabos, as portas acendem.
- Rótulos diretos: "Rack", "Abrir servidor", "Servidor acima", "Servidor abaixo", "Voltar ao rack".

## 3. Componentes reinventados

| Comum | Reinvente como |
|---|---|
| Filtro | Porta do patch panel com cabo |
| Card | Chapa frontal de servidor |
| Hero | Chapa de identificação do rack |
| Badge | LED; selo WIP colado na chapa |
| Tabs | Mapa do chassi |
| Lista ordenada | Barramento com vias numeradas |
| Rodapé | Switch |
| 404 | Slot vazio |

Componente inédito obrigatório: **Cabeamento** — consulta por tag em que o cabo desce do patch panel pela bandeja e pelo organizador vertical até a porta de cada servidor com a tag.

## 4. Tipografia

- Uma família: IBM Plex — Sans no texto, Sans Condensed na gravação da chapa, Mono nos números, valores e código.
- Escala: título gravado enorme na chapa de identificação, números grandes, rótulos curtos.

## 5. Cor e textura

- `surface` (chão, poste, chapa), `fg` (tinta, só luminosidade), `brand` (ligado).
- Textura vem do objeto: furos dos postes, orelhas aparafusadas, ranhuras da bandeja e do organizador.
- Cor reage a contexto: o cabo ligado acende; servidores fora da consulta apagam.

## 6. Movimento

- Física única: servidor correndo no trilho — `cubic-bezier(0.32, 0.72, 0, 1)` (`ease-rail`).
- Só cor, opacidade, traço do cabo e a transição de página.
- `prefers-reduced-motion`: sem animação.
- Easter eggs (≥ 3): `ping` pisca os LEDs; `reboot` religa o rack; console com o rack em ASCII; 404 como slot vazio.

## 7. Conteúdo e voz

- `BRAND.md`: headline ≤ 10 palavras, bullet ≤ 7, ≤ 10 frases por página, 0 parágrafo acima da dobra.
- Indicadores, tópicos e caixas antes de texto. Adjetivo só com número.
- Mostre TUDO do `.content/` e do `data.json` — inclusive no mobile.
- Projetos de repositório com sufixo `_` levam "WIP - Work in Progress" só na página do projeto.

## 8. Processo obrigatório

1. **Diverja:** 10 conceitos, uma frase e uma metáfora cada.
2. **Radicalize:** os 3 melhores ao extremo.
3. **Cruze:** um híbrido.
4. **Converja:** 1 direção, justificada em 3 linhas.
5. **Sistematize:** glifos, grade, cor, tipo, movimento.
6. **Construa:** implemente.
7. **Audite o clichê:** revise cada tela no navegador (desktop e 360px) e substitua o comum.

Registre 1–5 em `.analyse/design.md`.

## 9. Limites inegociáveis

- Navegação compreensível em 5 segundos.
- Teclado, foco visível, contraste legível, `prefers-reduced-motion`.
- Mobile reinventado: rack estreito, patch panel na régua fixa da base, toque na metade inferior.
- Animação só em `transform`/`opacity`/cor; SVG gerado no build.
- Links externos em nova aba.

## 10. Entregáveis

- Conceito e metáfora (`.analyse/design.md`).
- Sistema de glifos (`src/lib/glyphs.ts`).
- Mapa de navegação e inventário de componentes (`.analyse/design.md`).
- Tokens (`src/styles/global.css`).
- Código funcional: build limpo, rotas do `sitemap.xml` com 200.

## Verificação

- `bunx --bun astro build` sem erro.
- `dist/` tem `/`, uma rota por projeto, `404`, `og.png`, `robots.txt`, `sitemap.xml`, `llms.txt`.
- Screenshot desktop 1440×900 e mobile 360×780 de `/` e de uma página de projeto.
- `grep -rn 'style=' dist/*.html` só acha o que o navegador gera, nada escrito à mão.

## Critério final

"Se eu tirar o logo, alguém reconhece este site?" Não → volte à etapa 2.
"Há algum valor monetário ou elemento futurista na tela?" Sim → remova.
"Dá para entender o cabo acendendo os servidores em 5 segundos?" Não → simplifique.
"Parece algum irmão (`stack`, `pattern`, `ai`)?" Sim → volte à etapa 1.
