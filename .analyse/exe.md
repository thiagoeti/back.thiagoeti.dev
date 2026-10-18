# Prompts de execução

Arquivos `exe_*.md` em `.analyse/` são prompts para executar. Um prompt por tarefa.

## Prompts

| Prompt | Quando executar | Depende de |
|---|---|---|
| `exe_projeto.md` | Criar ou recriar o projeto inteiro (layout, glifos, páginas, build) | — |

## Como executar

1. Peça: `execute .analyse/exe_<nome>.md`.
2. Leia o prompt inteiro antes de começar. Ele é a especificação da tarefa.
3. Feche com o build limpo e publique pelo `git.sh` (skill `deploy`).

## Regras

- Todo prompt é reexecutável: rodar de novo sem mudança na fonte produz zero alterações.
- Mudou a regra, edite o prompt.
- Dúvida que o prompt não resolve: pergunte antes de decidir.
- Prompt novo: prefixo `exe_` e uma linha nesta tabela.
