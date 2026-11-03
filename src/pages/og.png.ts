import type { APIRoute } from 'astro'
import sharp from 'sharp'
import { intro } from '../lib/content'
import { homeCard } from '../lib/og'
import { projects } from '../lib/projects'
import { fill, text } from '../lib/text'

/** Cartão da capa (`meta.json › image`): o título e a frase do `data.md` e os glifos dos projetos. */
export const GET: APIRoute = async () => {
	const svg = homeCard({ section: intro.title.toLowerCase(), title: intro.title.toLowerCase(), description: intro.description, total: fill(text.repos.projects, { n: projects.length }) })
	const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer()
	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } })
}
