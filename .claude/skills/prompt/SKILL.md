---
name: prompt
description: Use ao criar, melhorar, revisar ou depurar prompt; ao converter em instrução para IA tarefa, card, issue, ticket, user story, requisito, bug report, spec, escopo, briefing, e-mail ou anotação solta; quando o prompt devolveu resposta genérica, longa demais, fora do formato ou do escopo; "como eu peço isso pra IA", "transforma esse card em tarefa", "detalha esse requisito", "a IA não entendeu o que eu pedi". Transforma pedido vago em prompt preciso.
allowed-tools: Read Glob Bash
license: Unlicense
metadata:
  author: thiagoeti
  version: 1.0.1
---

# Engenharia de Prompt

Transforma pedido vago em instrução precisa. Saída: **o prompt pronto, em bloco copiável. Nada mais.**

## Procedimento

1. Identifique a **tarefa real** — o que o usuário quer que a IA produza.
2. Preencha os **6 blocos**. O que faltar, infira do contexto; não pergunte por detalhe cosmético.
3. Escolha o **framework** mais adequado pela tabela de seleção.
4. Aplique as **técnicas** que a tarefa pedir.
5. Varra os **recursos do projeto** e nomeie no prompt os que o executor deve usar.
6. Entregue o prompt em bloco de código. Sem preâmbulo, sem explicação, sem alternativas.

## Os 6 blocos

| Bloco | Pergunta | Omitir quando |
|---|---|---|
| Papel | Quem a IA é? Qual expertise? | Tarefa mecânica sem julgamento |
| Tarefa | Verbo + objeto. O que fazer? | Nunca |
| Contexto | Cenário, stack, restrição, histórico | Nunca, se existir |
| Objetivo | Para que serve o resultado? | O objetivo é óbvio na tarefa |
| Formato | Estrutura, extensão, linguagem da saída | Nunca |
| Restrições | O que não fazer. Limites duros | Não há erro recorrente conhecido |

## Seletor de framework

| Situação | Framework | Blocos |
|---|---|---|
| Pedido simples, saída bem definida | **R-T-F** | Role → Task → Format |
| Tarefa técnica com passos | **R-I-S-E** | Role → Input → Steps → Expectation |
| Problema a diagnosticar ou refatorar | **C-A-R-E** | Context → Action → Result → Example |
| Comunicação com público específico | **CO-STAR** | Context → Objective → Style → Tone → Audience → Response |

Não empilhe frameworks. Um só, sempre.

## Técnicas

| Técnica | Quando usar | Como |
|---|---|---|
| Chain-of-Thought | Raciocínio, cálculo, trade-off, decisão | `Pense passo a passo antes de responder.` |
| Tags XML | Prompt longo com dados + instrução | Envolver blocos: `<contexto>`, `<dados>`, `<tarefa>`, `<acao>`, `<regras>`, `<restricoes>`, `<exemplo>` |
| Few-shot | Padrão de saída difícil de descrever | 2–3 pares entrada→saída antes do pedido real |
| Prefill | Forçar formato exato | Iniciar a resposta esperada: `Responda começando com {` |
| Decomposição | Tarefa grande demais | Quebrar em prompts encadeados; saída de um é entrada do próximo |
| Critério de sucesso | Qualidade é subjetiva | `O resultado está correto se: <lista verificável>` |
| Negative constraints | Erro recorrente conhecido | `Não invente dados. Não use bibliotecas externas.` |
| Self-review | Saída crítica | `Revise sua resposta contra os critérios e corrija antes de entregar.` |
| Delimitação de escopo | Risco de a IA extrapolar | `Altere apenas X. Não toque em Y.` |
| Structured output | Consumo por máquina | Especificar schema JSON/YAML campo a campo |

## Regras de escrita

- Verbo direto no imperativo: criar, listar, comparar, refatorar, extrair.
- Uma instrução por linha: um verbo, um resultado verificável isoladamente. Se a linha só faz sentido "feita" junto de outra, quebre em duas.
- Restrição sempre positiva: "use A" vence "não use B".
- Ordem fixa: contexto → tarefa → formato → restrições.
- Especificidade mensurável: "máximo 200 palavras" vence "seja breve".

## Recursos no Prompt

> ⚠️ Importante - Como determinar os recursos no prompt.

Skills, comandos, agentes, workflow e hooks são **ferramentas**, não contexto.

- Declará-las no prompt é o que separa uma instrução genérica de uma precisa.
- Esquecer não gera erro visível: a IA executora segue sem acionar o recurso.
- A falha só aparece no resultado.

Antes de escrever, varra os recursos do projeto e declare no prompt quais usar. O executor não descobre sozinho — o prompt precisa nomear.

| Recurso | Onde olhar | Como declarar |
|---|---|---|
| Skill | `.claude/skills/*/SKILL.md` | `Use a skill \`nome\`.` |
| Comando | `.claude/commands/**/*.md` | `Execute \`/grupo:comando\`.` |
| Agente | `.claude/agents/*.md` | `Delegue ao agente \`nome\`.` |
| Workflow | `.claude/workflows/*.md` | `Rode o workflow \`nome\`.` |
| CLAUDE.md | `CLAUDE.md` na raiz | Ler a regra e nomear o recurso (skill/agente/comando/workflow) que ela aponta |
| Spec | `openspec/`, `.spec/` | Apontar o caminho do arquivo |
| Padrão de código | Arquivo similar existente | `Siga o padrão de \`caminho/arquivo\`.` |

Recurso inexistente é pior que nenhum: verifique o nome antes de citar.

## Checklist CLEAR — revisão antes de entregar

| Critério | Pergunta |
|---|---|
| Concise | Tem informação que não muda o resultado? Corte |
| Logical | A ordem é contexto → tarefa → formato → restrições? |
| Explicit | Algo ficou implícito — formato, tom, extensão? Declare |
| Adaptive | O framework escolhido encaixa nesta tarefa específica? |
| Reflective | Este prompt já falhou assim antes? Aplique o Refino |

## Anti-padrões

| Erro | Corrigir para |
|---|---|
| "Fale sobre X" | "Liste os 5 principais X, com uma frase cada" |
| "Seja detalhado" | "Inclua: causa, impacto, solução" |
| "Melhore isso" | "Reduza a duplicação e extraia as funções repetidas" |
| Polidez, "por favor", elogios | Cortar. Não afeta o resultado, gasta contexto |
| Instruções contraditórias | Escolher uma |
| Contexto irrelevante | Cortar. Dilui o foco |

## Refino

Prompt falhou? Diagnostique pelo sintoma — não reescreva do zero.

| Sintoma da resposta | Causa no prompt | Correção |
|---|---|---|
| Genérica, óbvia | Falta contexto | Adicionar stack, restrição, cenário real |
| Formato errado | Formato implícito | Especificar estrutura; usar prefill |
| Longa demais | Sem limite | Impor número: linhas, palavras, itens |
| Inventou dados | Sem âncora | `Use apenas os dados fornecidos. Se faltar, diga o que falta.` |
| Ignorou parte do pedido | Instruções empilhadas | Separar em blocos; ou decompor em prompts |
| Raso em tarefa complexa | Sem raciocínio | Adicionar Chain-of-Thought |
| Extrapolou o escopo | Fronteira ausente | Delimitar: `Altere apenas X.` |

## Exemplo

**Pedido:** "preciso de um prompt pra IA analisar meu banco de dados"

**Saída:**

```
Você é um DBA especialista em otimização de bancos relacionais.

<contexto>
Banco PostgreSQL em produção.
Tabela de `pedidos` com 40M de linhas.
Consultas de relatório levam acima de 30s.
</contexto>

<tarefa>
Analise o schema e as queries e identifique gargalos de performance.
</tarefa>

<analise>
Pense passo a passo:
- primeiro os índices ausentes
- depois os tipos de dado inadequados
- depois os padrões de query problemáticos
</analise>

<ferramentas>
Utilize as Skills:
- `sql-query`
- `sql-performance`
- `sql-tuning`
- `ansi-sql`
</ferramentas>

<formato>
Tabela com colunas: Problema | Impacto estimado | Correção (DDL/SQL)
Ordenada por impacto decrescente. Máximo 10 linhas.
</formato>

<restricoes>
Não proponha desnormalização sem justificar o ganho.
Toda correção deve vir como SQL executável.
</restricoes>
```
