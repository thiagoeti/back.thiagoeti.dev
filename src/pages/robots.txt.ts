import type { APIRoute } from 'astro'

import { SITE } from '../lib/site'

/** Libera o público e aponta o sitemap. */
export const GET: APIRoute = () =>
	new Response(['User-agent: *', 'Allow: /', 'Disallow: /404', '', `Sitemap: ${SITE.url}/sitemap.xml`, ''].join('\n'), {
		headers: { 'content-type': 'text/plain; charset=utf-8' },
	})
