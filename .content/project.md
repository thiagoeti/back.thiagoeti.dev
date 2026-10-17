# PROJECT - back.thiagoeti.dev

---

## ⚠️ **IMPORTANTE ATENÇÃO**

- Inicialmente não temos todos projetos e padrões criados no Github.
- Vamos apresentar o que já temos, e o que não esta completo coloque em breve, em desenvolvimento enfim.

---

- Projetos e padrões de desenvolvimento web.

---

## Especificações

- Usar dados de `.specs/`.
- **SEMPRE utilizar todas as especificações disponíveis, não esquecer de nenhuma.**
- **LEIA TUDO ANTES DE COMEÇAR**

---

## Dados e Conteúdo

- Todo o conteúdo está em `.content/`.
- Todo o conteúdo de `.content/` é mostrado na página. ***Inclusive no mobile; não oculte nada.***
- Conteúdo bruto: `.content/data.md`.
- Conteúdo ordenado e estruturado: `.content/data.json`.
- Metadados da página: `.content/meta.json`.

- **SEMPRE apresente todos dados, campos, valores, metadados, enfim absolutamente tudo, apresente TUDO.**

---

## Layout e Arquitetura

- Barra de tags parte superior, já no mobile na parte inferior também fixo.
- Ao clicar nas tags filtra os projetos.

---

## Apresentação e Navegação

- Sem paginação: todos os projetos e padrões de uma vez.
- Navegação grade com todos projetos e padrões.

---

## Projetos e Padrões

- Cada projeto faz a leitura do README.md no diretorio do Github para pegar conteúdo adicional da página do projeto. O markdown será interpretado e apresentado na página do projeto.
- Na parte superior da página do projeto serão apresentados dados e links do projeto, com Github, o URL do projeto, tecnologias, status, etc, apresente o máximo de dados possível do material do projeto.

---

## Rotas / Páginas

- Todo projeto ou padrão terá uma página dedicada `/<slug>`.
- A página terá todas as informações do projeto de forma bem visível.

| Rota | Mostra |
|---|---|
| `/` | Todos projetos |
| `/?tag=%tag` | A tag faz filtro na lista |
| `/%project` | Apresente todos dados do repositório do projeto |

> Não use categorias ou outro tipo de agrupamento, apenas tag.

---
