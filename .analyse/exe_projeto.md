# SUPER PROMPT — back.thiagoeti.dev

## Papel

Atue ao mesmo tempo como diretor de arte experimental, designer de interação e engenheiro front-end sênior. Trate cada decisão como invenção, nunca como cópia de padrão.

## Contexto

| Campo | Valor |
|---|---|
| Projeto | `back.thiagoeti.dev` — `@thiagoeti — Back-end` |
| Propósito | Mostrar os padrões de back-end publicados: cada projeto é uma API de PIX com garantia de saldo sob concorrência |
| Público | Diretor ou coordenador que contrata (não técnico) e engenheiro que avalia o código |
| Sensação | cofre · precisão · prova |
| Fonte | `.content/` (texto), `data.json` + `README.md` + `docker.sh` de cada pasta dos repositórios `back` e `back_` |

## Leitura obrigatória antes de começar

1. Todo `.specs/*.md` — specs são imutáveis e incondicionais.
2. `.content/project.md`, `.content/data.md`, `.content/data.json`, `.content/meta.json`.
3. `data.json` e cada `README.md` dos repositórios listados em `.content/data.md › Projetos` (local: `/data/work/project/<repo>`; container: `/repos/<repo>`).
4. Um projeto irmão pronto (`pattern.thiagoeti.dev`) para convenções de build, CDN, `llms.txt` e ícones.

## Missão

Crie uma experiência que ninguém confunda com template. Quem fechar o site deve lembrar do mostrador.

## Regras de criatividade

1. **Metáfora:** uma metáfora física única. Dela derive navegação, layout, cor e movimento.
2. **Gramática:** glifos, grade e formas nascem de uma única regra geométrica.
3. **Espaço:** sem scroll vertical padrão. Use eixo radial, horizontal, Z, zoom ou canvas.
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
| 1 família | `THEME.md`: Inter + JetBrains Mono | Pedido do usuário vence: só JetBrains Mono |
| 2 cores + 1 acento | `THEME.md`: cores semânticas | Só `surface`, `fg` (escala de luminosidade) e `brand`; recusa = vazado, aprovado = cheio |

Regras incondicionais que nenhum prompt anula: Bun, TypeScript, Astro, só Tailwind (tokens em `global.css`), sem `<style>` nem `style` inline, texto só de `.content/` (microcopy de interface em `.analyse/page.json`), biblioteca por unpkg com `integrity` + `crossorigin`, fonte por Google Fonts.

## 1. Sistema de glifos

- Grade polar: centro, 4 anéis, 12 raios a 30°. Primitivas: anel, arco, raio, ponto. Nada fora disso.
- Traço 1.5, `non-scaling-stroke`, pontas redondas.
- Cada tag do `data.json` tem um fragmento próprio desenhado num anel.
- Emblema do projeto = sobreposição dos fragmentos das suas tags, de dentro para fora, com o ponto central do saldo.
- Projetos que compartilham uma tag compartilham o mesmo anel desenhado.
- Tag sem desenho: fragmento gerado do hash do nome, na mesma gramática.
- Estados: repouso (`fg-faint`), ativo (`brand`), carregando (anel tracejado girando), recusado (vazado), concluído (cheio).
- Documente a gramática no topo de `src/lib/glyphs.ts`.

## 2. Navegação

Gere 5 conceitos, escolha o mais ousado que ainda funcione em 5 segundos. Defina entrada, orientação, volta e atalhos.

- Capa: mostrador de cofre. Projetos são setores; o ponteiro aponta o setor em foco; o leitor de dados ao lado mostra o projeto.
- Ponteiro segue o cursor; `← →` giram; `1–9` saltam; `Enter` abre.
- Anel externo (desktop): os 12 sites do ecossistema, um por raio da grade.
- Página do projeto: pranchas em eixo horizontal; régua de pranchas como índice; roda do mouse vira horizontal.
- Menu: os mesmos itens (mostrador + projetos) no topo (desktop) e na base (mobile), com emblema e nome curto.
- Tags: topo no desktop, base no mobile, fixas; `?tag=` filtra.

## 3. Componentes reinventados

| Comum | Reinvente como |
|---|---|
| Botão | Trinco: rótulo mono com anel que fecha ao passar |
| Card | Leitor do cofre: ficha de comprovante com indicadores |
| Modal | Abertura do cofre: o emblema clicado vira o herói da página (view transition) |
| Formulário | Combinação: digitar números e palavras no teclado age no mostrador |
| Lista | Anel de marcas |
| Tabela | Gavetas (Skills) e balança (Trade-offs) |
| Loader | Anel tracejado girando |
| 404 | `ACCOUNT_NOT_FOUND`: o mostrador recusa o caminho digitado |

Componente inédito obrigatório: **Rosácea de sequência** — diagrama de sequência polar: participantes são anéis, o tempo corre no sentido horário, mensagens são raios entre anéis.

## 4. Tipografia

- Uma família: JetBrains Mono.
- Escala extrema: 10px nos raios, número do saldo em tela cheia.
- Texto em caminho (`textPath`) no mostrador.
- Assinatura: valor em reais grande, sempre `tabular-nums`, centavos menores.

## 5. Cor e textura

- `surface` (fundo), `fg` (luz, hierarquia só por opacidade), `brand` (acento).
- Textura: grade polar pontilhada no fundo do palco.
- Cor reage a contexto: setor em foco acende, filtro apaga os demais.

## 6. Movimento

- Física única: trava de cofre — `cubic-bezier(0.34, 1.56, 0.64, 1)`, 320 ms. Ponteiro, anéis e pranchas usam a mesma.
- Traço que se desenha ao entrar.
- `prefers-reduced-motion`: sem animação.
- Easter eggs (≥ 3): digitar `pix` dispara o cenário; clicar 7× no saldo tenta sacar e recebe 422; console com mostrador ASCII; 404 recusa o caminho como conta.

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
- Mobile reinventado: trilho horizontal de painéis, toque na metade inferior.
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
