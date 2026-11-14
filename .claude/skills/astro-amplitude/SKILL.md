---
name: astro-amplitude
description: Use sempre que trabalhar em projetos Astro com Amplitude Analytics.
---

# astro-amplitude

## Padrão

Se o usuário não especificar, use **client-side + autocapture**. Pergunte só quando o pedido deixar dúvida sobre:

- **Modo:** client (navegador), script (CDN com Session Replay), server (eventos no servidor: API, Actions, webhooks) ou híbrido.
- **Escopo:** só autocapture, ou também eventos customizados e identificação.

## Instalação

| Modo | Comando |
|---|---|
| Client | `bun add @amplitude/analytics-browser` |
| Script | Nenhum (carregado do CDN) |
| Server | `bun add @amplitude/analytics-node` |
| Híbrido | `bun add @amplitude/analytics-browser @amplitude/analytics-node` |

Uma variável para todos os modos (a key do Amplitude é pública):

```env
PUBLIC_AMPLITUDE_API_KEY=sua_chave
```

## Ambientes

Amplitude só no build (`astro build`). No `astro dev`, nada é renderizado nem inicializado.

- Condicione por `import.meta.env.PROD` e pela chave: `PROD` é `false` no `astro dev` e `true` no build.
- Nunca chave falsa nem `undefined` na URL: `cdn.amplitude.com/script/undefined.js` dá 404 e erro no console.

## Client-side

Antes de `</body>`, geralmente no layout base (ex.: `src/layouts/Layout.astro`). Funciona em páginas estáticas e SSR:

```astro
<script>
  import * as amplitude from '@amplitude/analytics-browser';
  const key = import.meta.env.PUBLIC_AMPLITUDE_API_KEY;
  if (import.meta.env.PROD && key) amplitude.init(key, { autocapture: true });
</script>
```

- `autocapture: true`: page views, sessões, atribuição, formulários, downloads, cliques, frustração, rede e web vitals. Sem a opção: só os cinco primeiros (mais o enriquecimento de URL da página).
- Com `<ClientRouter />`: o page view é enviado a cada navegação. Não reinicialize.

## Script (CDN)

Snippet do quickstart do Amplitude (Unified Script): carrega SDK + Session Replay do CDN, sem pacote npm. No `<head>` do layout base. Os dois scripts precisam de `is:inline` (usam globais `window.*` e a key vem por `define:vars`):

```astro
---
const apiKey = import.meta.env.PROD && import.meta.env.PUBLIC_AMPLITUDE_API_KEY;
---
{apiKey && (
  <>
    <script is:inline src={`https://cdn.amplitude.com/script/${apiKey}.js`}></script>
    <script is:inline define:vars={{ apiKey }}>
      window.amplitude.add(window.sessionReplay.plugin({ sampleRate: 1 }));
      window.amplitude.init(apiKey, {
        fetchRemoteConfig: true,
        autocapture: {
          attribution: true,
          fileDownloads: true,
          formInteractions: true,
          pageViews: true,
          sessions: true,
          elementInteractions: true,
          networkTracking: true,
          webVitals: true,
          frustrationInteractions: true,
        },
      });
    </script>
  </>
)}
```

- `sampleRate`: fração das sessões gravadas (0 a 1). `1` grava todas, só para teste; reduza em produção. Padrão do SDK: `0` (não grava nada).
- `add()` do plugin antes do `init()`.
- `fetchRemoteConfig: true`: as configurações de autocapture em *Data > Settings > Autocapture* sobrescrevem as locais, por recurso.
- Não misture com `@amplitude/analytics-browser` ou `@amplitude/unified` via npm: inicializar duas vezes gera instâncias duplicadas e IDs de device/sessão divergentes.
- Session Replay mascara `<input>` por padrão. Use `.amp-mask` (texto), `.amp-block` (elemento) e `.amp-unmask`.
- CSP: `script-src https://cdn.amplitude.com`; `connect-src https://api2.amplitude.com https://api-sr.amplitude.com https://sr-client-cfg.amplitude.com`.

## Server-side

Para eventos que acontecem no servidor. A rota precisa de `prerender = false` (ou `output: 'server'`).

- Chame `init()` uma vez num módulo compartilhado (ex.: `src/lib/amplitude.server.ts`) e reexporte `track`, `identify` e `flush`.
- Fora do build ou sem chave, não chame `init()`: `track`, `identify` e `flush` viram no-op.
- `track(evento, props, { user_id })`: todo evento exige `user_id` ou `device_id` com 5+ caracteres.
- Em serverless/edge, `await flush().promise` antes de responder. Sem isso os eventos se perdem (o envio é em lote a cada 10 s).

## Híbrido

Para unir os eventos do usuário, use o mesmo ID em `setUserId()` (client) e `user_id` (server).

## Eventos customizados e identificação

Crie um wrapper tipado (client) em `src/lib/analytics.ts`:

- `track()` com mapa tipado de eventos e propriedades.
- `login()`: `setUserId()` + `identify()` com `new Identify().set(...)` para as propriedades do usuário.
- `logout()`: `reset()`.

Com `<ClientRouter />`, registre listeners de componentes dentro de `astro:page-load`, pois o DOM é trocado a cada navegação.
