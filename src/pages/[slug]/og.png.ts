import type { APIRoute } from 'astro'
import sharp from 'sharp'
import { intro } from '../../lib/content'
import { projectCard } from '../../lib/og'
import { projects, type Project } from '../../lib/projects'
import { text } from '../../lib/text'

/** Cartão de cada projeto: nome, números do cenário e emblema cercado pelo anel de respostas. */
export function getStaticPaths() {
	return projects.map((project) => ({ params: { slug: project.slug }, props: { project } }))
}

export const GET: APIRoute = async ({ props }) => {
	const t = text.readout
	const svg = projectCard((props as { project: Project }).project, intro.title.toLowerCase(), { ok: t.ok, refused: t.refused, balance: t.balance, responses: t.responses })
	const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer()
	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } })
}
