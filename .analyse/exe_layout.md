Você é designer de produto sênior especialista em interfaces Dark Ops. Refaça todo o layout de back.thiagoeti.dev a partir de `_references/`. Regras técnicas, conteúdo e tema já estão em `CLAUDE.md` e `.specs/`: siga sem repetir.

<ferramentas>
- Skills: `action` e `profile` (sessão inteira), `frontend-design` (hierarquia e crítica), `define` (`CLAUDE.md` e `README.md`), `deploy` (publicação).
- MCP `context7`: consulte Astro, Tailwind v4 e `tw-animate-css` antes de escrever código.
- MCP `playwright`: abra, capture e compare cada tela.
</ferramentas>

<precedencia>
1. `.specs/` — vence tudo.
2. `_references/` — forma visual. Os componentes já estão especificados em `.specs/THEME.md`.
3. `.analyse/design.md` — reescreva como Revisão 7.
Este prompt substitui o conceito "frente e verso" e o anti-clichê de `exe_projeto.md`.
</precedencia>

<mapa>
| Referência | Componente `THEME.md` | Conteúdo |
|---|---|---|
| Título + frase em duas colunas | Header split | Abertura da capa |
| 12,480 · 84.2M · 99.999% · 24ms | Card KPI + KPI strip | `text.kpis`, cada um com mini-gráfico de dado real |
| Visual em cima, texto embaixo | Feature Card + Feature trio | Grade de projetos: glifo SVG do projeto no topo, nome e entrega na base |
| Barra de comando ⌘K | Search / Command Bar | Filtro de tags (`?tag=`) |
| `24 Active`, `ELEVATED` | Badge | Status, WIP (só na página do projeto), contagem por tag |
| Lista de agentes + gráfico | Painel interno split + Agent/Node List Item + Chart Container | Página do projeto: pastas e arquivos × linhas por arquivo |
| NODE-A/B/C, Infra Health | Progress Bar + Score Ring | Ficha do container e segurança `n de total` |
| Threat Detection Console | Alert / Threat Row | Eventos de segurança do `docker.sh` |
| Trigger → Condition → Action | Execution Path | Fluxo do Mermaid do README |
| Infrastructure Health Map | Chart Container | `board-diagram` desenhado como topologia |
| Terminal | Card Base + `mono-label` | Seção de execução do README |
| System Event Log | Event Timeline | Passos do README |
| Card AWS | Integration Card | Repositórios: GitHub, pasta local, montagem |
| App shell com rail | App Shell (só superfícies) | Menu segue `DESIGN.md`: topo no desktop, inferior no mobile |
</mapa>

<passos>
1. Abra as 23 imagens de `_references/` e confirme ou complete o mapa.
2. Registre mapa, decisões e componentes removidos em `.analyse/design.md`.
3. Troque IBM Plex pela sans e pela mono que reproduzem as referências.
4. Reescreva `src/components`, `src/layouts`, `src/pages`, `src/scripts` e `src/styles` pelo mapa.
5. Apague o que for de frente/verso: `face-switch`, virada, `ease-flip`, `blueprint`, comando `flip`.
6. Reescreva a microcopy de `.analyse/page.json` para a nova interface.
7. Capture com o `playwright` `/`, `/?tag=<tag>`, um projeto e o 404 em 360, 768, 1280 e 1920px.
8. Compare cada captura com a referência do mapa, corrija a diferença e repita até zerar.
9. Atualize `CLAUDE.md` (Arquitetura) e `README.md` com a skill `define`.
10. Publique em beta com a skill `deploy`.
</passos>

<restricoes>
- Copie a forma das referências, nunca o dado: todo número, gráfico e status vem de `.content/`, do `data.json` do repositório, do README e do `docker.sh`.
- Sem dado real, sem componente.
- Indicador "ao vivo" só com dado ao vivo: o site é estático.
- Altere só os caminhos do passo 4, `src/lib/{glyphs,grid,tracks,og}.ts`, `.analyse/design.md`, `.analyse/page.json`, `CLAUDE.md` e `README.md`.
- Use `src/lib/{repos,projects,readme,docker,markdown}.ts` como leitura; campo novo só se o dado já existir na fonte.
- Onde `frontend-design` conflitar com `_references/` ou `THEME.md`, a referência vence.
</restricoes>

<criterio>
- Cada tela, lado a lado com a referência mapeada, usa o mesmo componente de `THEME.md`.
- `grep -riE "flip|verso|blueprint|Plex" src` volta vazio.
- Nenhum número literal inventado nos componentes.
- Nenhuma rolagem horizontal e nenhum dado oculto nas 4 larguras.
- Build limpo.
Revise contra esta lista e corrija antes de publicar.
</criterio>
