# back.thiagoeti.dev

Padrões de projetos back-end: cada projeto é uma API de PIX que mantém o saldo correto sob concorrência, apresentada como um mostrador de cofre.

- Site: [back.thiagoeti.dev](https://back.thiagoeti.dev)

## Requisitos

- [Bun](https://bun.com) 1.4+
- Docker (opcional)

## Instalar

```bash
bun install
```

## Executar

```bash
PORT=3000 sh run.sh
```

Gera o site estático e serve em `http://localhost:3000`.

### Docker

Crie `.env` com `GROUP`, `PROJECT` e `PORT`, depois:

```bash
sh docker.sh
```

## Estrutura

| Caminho | Conteúdo |
|---|---|
| `app/` | Servidor HTTP |
| `src/` | Páginas, componentes e lógica do site |
| `public/` | Arquivos estáticos |
| `astro.config.ts` | Configuração do build |
| `run.sh` | Build e execução |
| `docker.sh` | Execução em container |

## Licença

Proprietária. Todos os direitos reservados — ver [LICENSE](LICENSE).
