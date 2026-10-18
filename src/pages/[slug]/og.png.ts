import type { APIRoute } from 'astro'
import sharp from 'sharp'
import { intro } from '../../lib/content'
import { projectCard } from '../../lib/og'
import { projects, type Project } from '../../lib/projects'

/** Cartão de cada projeto: o servidor puxado do rack, com LEDs, portas e tags dele. */
export function getStaticPaths() {
	return projects.map((project) => ({ params: { slug: project.slug }, props: { project } }))
}

export const GET: APIRoute = async ({ props }) => {
	const svg = projectCard((props as { project: Project }).project, intro.title.toLowerCase())
	const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer()
	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } })
}
