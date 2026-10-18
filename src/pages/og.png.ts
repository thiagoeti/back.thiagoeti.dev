import type { APIRoute } from 'astro'
import sharp from 'sharp'
import { intro } from '../lib/content'
import { homeCard } from '../lib/og'
import { totals } from '../lib/projects'
import { text } from '../lib/text'

/** Cartão da capa (`meta.json › image`): título do `data.md`, números medidos e a frente do rack. */
export const GET: APIRoute = async () => {
	const k = text.home.kpis
	const svg = homeCard({
		section: intro.title.toLowerCase(),
		title: intro.title.toLowerCase(),
		description: intro.description,
		caption: text.patch.hint,
		facts: [
			{ value: totals.projects, label: k.projects },
			{ value: totals.tags, label: k.tags },
			{ value: totals.technologies, label: k.technologies },
		],
	})
	const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer()
	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } })
}
