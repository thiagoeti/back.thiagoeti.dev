---
name: mcp-context7
description: Use ao instalar ou usar o Context7. Gatilhos: qualquer prompt que contenha "context7" ou "ctx7".
allowed-tools: Read Glob Bash
license: Unlicense
metadata:
  author: thiagoeti
  version: 1.0.0
---

# Context7 MCP

Servidor MCP que busca documentação atualizada e versionada de bibliotecas e injeta no contexto, evitando que o agente gere código com API que não existe mais.

## Instalar

O instalador detecta o cliente e escreve a configuração:

```bash
npx ctx7 setup
npx ctx7 setup --claude       # Claude Code
npx ctx7 setup --antigravity  # Antigravity
npx ctx7 setup --opencode     # OpenCode
npx ctx7 setup --vscode       # VS Code
npx ctx7 setup --cursor       # Cursor
```

## Configuração manual

Qualquer cliente MCP → aponte para o endpoint remoto:

```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp.context7.com/mcp"
    }
  }
}
```

Chave de API é opcional — sem ela o limite de requisições é menor. Com chave: pegue em `context7.com/dashboard` e envie no header:

```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp.context7.com/mcp",
      "headers": { "Authorization": "Bearer SUA_CHAVE" }
    }
  }
}
```

## Como usar

Escreva `ctx7` ou `context7` no prompt para forçar a consulta:

```
Como faço streaming de resposta no Elysia? use context7
```

| Ferramenta | Parâmetros | Retorna |
|---|---|---|
| `resolve-library-id` | `libraryName`, `query` | ID da biblioteca (ex.: `/mongodb/docs`) |
| `query-docs` | `libraryId`, `query` | Trecho da documentação que responde à pergunta |

- Forçar a consulta → escreva `ctx7` ou `context7` no prompt.
- ID já conhecido → cite no prompt.
