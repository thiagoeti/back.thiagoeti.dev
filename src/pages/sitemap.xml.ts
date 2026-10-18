import type { APIRoute } from 'astro'

import { projects } from '../lib/projects'
import { absoluteUrl, buildDate } from '../lib/site'

/** Toda URL publicada: o mostrador e uma página por projeto. */
export const GET: APIRoute = () => {
	const lastmod = buildDate()
	const urls = [{ loc: absoluteUrl('/'), priority: '1.0' }, ...projects.map((p) => ({ loc: absoluteUrl(p.href), priority: '0.8' }))]
	const body = [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
		...urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>`),
		'</urlset>',
		'',
	].join('\n')
	return new Response(body, { headers: { 'content-type': 'application/xml; charset=utf-8' } })
}
