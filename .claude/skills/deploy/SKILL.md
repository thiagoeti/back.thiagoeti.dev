---
name: deploy
description: Use ao fazer deploy, publicar, commitar, dar push, versionar, atualizar o repositório, subir para beta ou main, colocar em produção, sincronizar branches ou rodar o git.sh; "sobe isso", "manda pro beta", "publica em produção", "faz o commit", "executa push"; qualquer menção a git, push, commit ou publicação de código, mesmo sem a palavra deploy. Publica e versiona pelo git.sh nos modos beta (default), main e full.
model: haiku
allowed-tools: Read Bash
license: Unlicense
metadata:
  author: thiagoeti
  version: 1.0.0
---

# Deploy

- Toda publicação passa por `git.sh` — fonte única do workflow git.
- Arquivo real: `git.sh` nesta pasta (`.claude/skills/deploy/git.sh`).
- A raiz tem symlink `git.sh → .claude/skills/deploy/git.sh`.

## Verificação

- Confira se existe symlink na raiz `git.sh`.
- Se não existe então crie → `ln -s .claude/skills/deploy/git.sh git.sh`.

## Execução

```bash
bash git.sh [beta|main|full] ["message commit"]
```

**Se o modo for omitido, o padrão é `beta`. Se a mensagem for omitida, usa `chore: update <data>`.**

## Regras

- Nunca reimplemente git em script paralelo — chame `git.sh`.
- Nunca force após parada do script, conflito de stash ou merge, avise o usuário.
- Mensagem de commit em Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`…

---

