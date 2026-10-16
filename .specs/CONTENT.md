# CONTENT

---

> ⚠️ **IMPORTANTE — esta spec NUNCA é alterada. Precisou mudar, crie outro arquivo.**

---

## REGRAS PRINCIPAIS

**Todo texto esta em `.content/`.**

**Nunca altere nenhum conteudo dos arquivos de `.content/`, caso necessário você deve solicitar atualização.**

---

## Conteúdo

| Artefato | Papel |
|---|---|---|
| `.content/meta.json` | Todos metadados da página. |
| `.content/data.json` | Todo conteúdo. Fonte da verdade. |
| `.content/data.md` | Todo conteúdo. Fonte da verdade. |
| `public/llms.txt` | Cópia de `.content/data.md` |

**Nunca crave textos em arquivo de script como fonte, SEMPRE leia os arquivos de `.content/`.**

> Caso precise consultar o conteúdo do projeto o endereço local: `/data/work/thiago/thiago/content/%project%`

---

## Esquema do `data.json`

- Metatextos
- Indicadores

---

## Visibilidade

- Nunca oculte nenhum dado na versão mobile.

---

## CDN - Content Delivery Network

- Local: http://localhost:8091
- Remoto: https://cdn.thiagoeti.dev
- Todas imagens ficam nesse endereço de acordo com ambiente.
- Caso precise consultar imagem para o conteúdo do projeto o endereço local: `/data/work/thiago/thiago/image`
- Caso precise consultar imagem para o conteúdo do projeto o endereço local: `/data/work/thiago/thiago/content/%project%`

#### Icones

- Se precisar criar icone para o projeto o endereço **(siga o mesmo padrão sempre)**: `/data/work/thiago/thiago/image/icons`

---
