---
name: web-social-share
description: Use sempre que trabalhar em og:* ou Open Graph. Metadados para compartilhar.
license: Unlicense
metadata:
  author: thiagoeti
  version: 1.0.0
---

# Social Share

- Cada página deve ter seu próprio material de compartilhamento OG - Open Graph.
- **TODAS as páginas devem ter imagem OG próprias**.

## Regras

- Todos endereços devem ser absolutos `https://` e sem UTM.
- Imagem 1200×630 (ou proporção próxima), JPG ou PNG, **< 200 KB** (importante ser leve imagem).
- Nunca SVG, AVIF ou GIF animado — LinkedIn e WhatsApp não renderizam.
- Nunca omita a tag.

## Bloco mínimo

```html
<meta property="og:type" content="article">                       <!-- website on the home -->
<meta property="og:title" content="Título para o card">           <!-- no brand suffix -->
<meta property="og:description" content="Uma frase que faz clicar.">
<meta property="og:url" content="https://exemplo.com/blog/post">
<meta property="og:site_name" content="Marca">
<meta property="og:locale" content="pt_BR">                        <!-- underscore, not hyphen -->
<meta property="og:image" content="https://exemplo.com/og/post.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="O que a imagem mostra">
<meta name="twitter:card" content="summary_large_image">            <!-- X falls back to og:* -->
```

## Imagem por página

- Home - Padrão da marca.
- Post, produto, perfil → imagem própria.
- Sempre tente utilizar imagem própria na página, caso possível crie uma imagem.
