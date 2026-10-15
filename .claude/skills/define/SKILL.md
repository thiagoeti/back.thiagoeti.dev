---
name: define
description: Use ao criar, revisar ou ajustar README.md ou CLAUDE.md; ao separar conteúdo público do conteúdo do agente; ao criar spec em .specs/ ou indexá-la no CLAUDE.md; define e configura os arquivos do projeto. Separa README.md público de CLAUDE.md do agente.
model: sonnet
allowed-tools: Read Edit Write Glob Bash
license: Unlicense
metadata:
  author: thiagoeti
  version: 1.0.0
---

# Define

Regra de separação entre `README.md` e `CLAUDE.md` projeto.

---

## Regras

- Nunca junte specs num arquivo único.

## README.md — Arquivo público

- **Audiência:** Qualquer pessoa que acesse o repositório (usuários, colaboradores e público em geral).
- **Importante:** Nunca expor nenhum dado interno, material público.

**Deve conter:**
- O que é o projeto (descrição diretiva e objetiva).
- Como instalar e usar (instruções focadas no usuário final).
- Estrutura de arquivos **visível ao usuário** (apenas pastas e arquivos públicos).
- Diretrizes de como contribuir (se aplicável).
- Licença de uso.

**Nunca deve conter:**
- Detalhes de arquitetura ou desenvolvimento.
- Referências ao diretório `.claude` ou a qualquer questão relacionada.
- Scripts e ferramentas de workflow interno (ex.: `git.sh`).
- Backlog, histórico de tarefas ou decisões internas de desenvolvimento.

---

## CLAUDE.md — Arquivo para agentes de IA / SDD

**Audiência:** Claude Code, Codex e outros agentes de IA que trabalham no projeto.

**Deve conter:**
- Informação de desenvolvimento que não existe em nenhuma spec ou skill.
- Todos arquivos de especificação do projeto dentro de `.specs/`
- Estrutura completa SDD `.claude/`

**Nunca deve conter:**
- Instrução de uso, e nenhuma informação de produto ou qualquer coisa que seja para o usuário final.
- Regra que já existe em spec, skill ou tabela; aponte só pela tabela.
- Seção ou linha que só remete a um arquivo que já está indexado.

**Formatação Exigida:**

Tabelas são o guia rápido do agente. Nesta ordem:

1. **Tabela de Especificações (`.specs/`)**: Listar todos os arquivos de especificação acompanhados de um breve resumo, ordenados por relevância.
2. **Tabela de Comandos e Arquivos (`.claude/`)**: Listar todos os comandos e arquivos de configuração do agente com uma breve descrição, ordenados por prioridade.

**Execução:**

1. Sem `CLAUDE.md` na raiz: rode `/init` para gerar a base. Com `CLAUDE.md`: pule (o `/init` sobrescreve).
2. Aplique as regras acima sobre o resultado.

---

## Especificações do projeto — `.specs/`

Uma spec por **assunto**, nunca um arquivo único que junta tudo.

| Regra | Valor |
|---|---|
| Granularidade | 1 arquivo = 1 assunto |
| Duplicação | zero; assunto que encosta em dois arquivos → o que não é dono aponta para o dono |
| Nome | kebab-case, substantivo do assunto (`skill-contract.md`, `git-workflow.md`) |
| Conteúdo | fato medido por comando, com data; sem opinião nem histórico narrativo |
| Índice | TODA spec entra na tabela de especificações do `CLAUDE.md` |
| Resumo | diz o que o arquivo **responde**, não como se chama — o agente lê a tabela e abre só a spec do assunto |

---

## Skills do Projeto — `.claude/skills/`

- Uma pasta por skill: `.claude/skills/<nome>/SKILL.md`.
- O agente registra a skill pelo nome da pasta.

Modelo:

| Skill | Quando aplicar |
|---|---|
| `/deploy` | Git, commit, push, publicação — o workflow do `git.sh`; o script mora na skill e a raiz é symlink para ele |
| `/profile` | Todo prompt: escopo fechado, resposta direta, pergunta única na ambiguidade |

---

## Regra resumida

| Pergunta | README.md | CLAUDE.md |
|----------|-----------|-----------|
| "Como um usuário externo usa isso?" | ✅ | ❌ |
| "Como instalar/rodar o projeto?" | ✅ | ❌ |
| "Qual é a licença?" | ✅ | ❌ |
| "Como um dev/agente trabalha nisso?" | ❌ | ✅ |
| "Qual a arquitetura e as decisões de design?" | ❌ | ✅ |
| "Onde ficam as specs (`.specs/`)?" | ❌ | ✅ |
| "Quais skills o projeto tem e quando cada uma aplica?" | ❌ | ✅ |
| "Qual é o workflow de deploy?" | ❌ | ✅ |
| "Regra já escrita em spec ou skill?" | ❌ | ❌ |

