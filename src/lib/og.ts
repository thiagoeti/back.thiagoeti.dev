import { projects, type Project } from './projects'
import { glyphSvg, techGlyph } from './techglyph'

/**
 * Cartões de compartilhamento (1200×630): SVG composto aqui, PNG pelo sharp (.analyse/design.md ›
 * Revisão 10). Nome e o que entrega à esquerda; à direita o glifo de tecnologia do projeto ou os de
 * todos (capa). Cor em atributo porque o arquivo é imagem, não página.
 */
const W = 1200
const H = 630
const C = { bg: '#0B0F14', fg: '#F3F6F9', muted: '#9AA3B2', subtle: '#6B7484', brand: '#2DD4A8', line: 'rgba(255,255,255,0.08)' }
const SANS = 'Inter,DejaVu Sans,sans-serif'
const MONO = 'JetBrains Mono,DejaVu Sans Mono,monospace'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function wrap(value: string, chars: number, max: number): string[] {
	const lines: string[] = []
	let line = ''
	for (const word of (value ?? '').split(/\s+/).filter(Boolean)) {
		if (line && `${line} ${word}`.length > chars) {
			lines.push(line)
			line = word
		} else line = line ? `${line} ${word}` : word
	}
	if (line) lines.push(line)
	if (lines.length <= max) return lines
	const cut = lines.slice(0, max)
	cut[max - 1] = `${cut[max - 1]!.replace(/[\s,.;:]+$/, '')}…`
	return cut
}

const text = (x: number, y: number, lines: string[], size: number, color: string, extra = '', family = SANS, lead = 1.25) =>
	`<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-family="${family}" ${extra}>${lines.map((l, i) => `<tspan x="${x}" dy="${i ? size * lead : 0}">${esc(l)}</tspan>`).join('')}</text>`

const frame = (body: string) =>
	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><defs><radialGradient id="g" cx="0" cy="0" r="1"><stop offset="0" stop-color="${C.brand}" stop-opacity="0.12"/><stop offset="0.5" stop-color="${C.brand}" stop-opacity="0"/></radialGradient></defs><rect width="${W}" height="${H}" fill="${C.bg}"/><rect width="${W}" height="${H}" fill="url(#g)"/>${body}</svg>`

const brand = (section: string) => `<circle cx="70" cy="76" r="5" fill="${C.brand}"/>` + text(88, 84, [`@thiagoeti  /  ${section}`], 22, C.subtle, 'font-weight="600" letter-spacing="2"', SANS)

/** Capa: título e frase; à direita os glifos de todos os projetos. */
export function homeCard(info: { section: string; title: string; description: string; total: string }): string {
	const glyphs = projects
		.slice(0, 6)
		.map((p, i) => glyphSvg(techGlyph(p), 660 + (i % 3) * 172, 120 + Math.floor(i / 3) * 200, 150))
		.join('')
	return frame([brand(info.section), text(64, 300, [info.title], 120, C.fg, 'letter-spacing="-4"', SANS, 1), text(64, 390, wrap(info.description, 26, 2), 32, C.fg), text(64, 560, [info.total], 22, C.subtle, '', MONO), glyphs].join(''))
}

/** Projeto: nome, subtítulo e descrição; à direita o glifo de tecnologia. */
export function projectCard(p: Project, section: string): string {
	return frame(
		[
			brand(section),
			text(64, 150, [p.path], 20, C.subtle, '', MONO),
			text(64, 240, wrap(p.title, 16, 2), 68, C.fg, 'font-weight="600" letter-spacing="-2"', SANS, 1.05),
			text(64, 410, wrap(p.subtitle, 30, 2), 28, C.muted),
			text(64, 520, wrap(p.description, 36, 2), 22, C.subtle),
			`<circle cx="930" cy="330" r="250" fill="none" stroke="${C.line}" stroke-dasharray="3 9"/>`,
			glyphSvg(techGlyph(p), 730, 130, 400),
		].join(''),
	)
}
