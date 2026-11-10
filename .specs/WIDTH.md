# WIDTH.md

Substitui a linha **Container** de `THEME.md › Layout`.

| Padrão | Classes |
|---|---|
| Container | `mx-auto w-full max-w-[120rem] px-4 sm:px-6 lg:px-8` |
| Vitrine | `grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4` |

- Mesma largura do `front.thiagoeti.dev` e do `pattern.thiagoeti.dev`: o conteúdo para em 1920px e não ocupa a tela toda.
- Bordas e fundos de cabeçalho e rodapé seguem de ponta a ponta; só o conteúdo interno respeita o container.
- Cabeçalho, rodapé, capa, projeto e 404 usam o mesmo container.
