import { emblem, type Shape, type Tone } from './glyphs'
import { band, f, pt } from './polar'
import type { Project } from './projects'
import { ringMarks } from './ring'

/**
 * Cartões de compartilhamento (1200×630): SVG composto aqui, PNG pelo sharp. Mesma gramática e as
 * mesmas 2 cores + 1 acento do site; cor em atributo porque o arquivo é imagem, não página.
 */
const W = 1200
const H = 630
const COLOR = { bg: '#0B0F14', surface: '#10161E', line: 'rgba(255,255,255,0.08)', fg: '#F3F6F9', muted: '#9AA3B2', subtle: '#6B7484', faint: '#47505E', brand: '#2DD4A8' }
const FONT = 'JetBrains Mono,DejaVu Sans Mono,monospace'

const PAINT: Record<Tone, string> = {
	grid: `fill="none" stroke="rgba(255,255,255,0.06)"`,
	faint: `fill="none" stroke="${COLOR.faint}"`,
	line: `fill="none" stroke="${COLOR.subtle}"`,
	dash: `fill="none" stroke="${COLOR.subtle}" stroke-dasharray="3 4"`,
	key: `fill="none" stroke="${COLOR.brand}"`,
	dot: `fill="${COLOR.brand}"`,
	hollow: `fill="${COLOR.bg}" stroke="${COLOR.subtle}"`,
	mute: `fill="${COLOR.faint}"`,
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const shapes = (list: Shape[]) => list.map((s) => (s.d ? `<path d="${s.d}" ${PAINT[s.tone]}/>` : `<circle cx="${s.cx}" cy="${s.cy}" r="${s.r}" ${PAINT[s.tone]}/>`)).join('')

function wrap(text: string, chars: number, max: number): string[] {
	const lines: string[] = []
	let line = ''
	for (const word of text.split(/\s+/)) {
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

const text = (x: number, y: number, lines: string[], size: number, fill: string, extra = '', lead = 1.25) =>
	`<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-family="${FONT}" ${extra}>${lines.map((l, i) => `<tspan x="${x}" dy="${i ? size * lead : 0}">${esc(l)}</tspan>`).join('')}</text>`

const frame = (body: string) =>
	[
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">`,
		`<defs><pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.2" fill="rgba(255,255,255,0.05)"/></pattern></defs>`,
		`<rect width="${W}" height="${H}" fill="${COLOR.bg}"/><rect width="${W}" height="${H}" fill="url(#dots)"/>`,
		body,
		'</svg>',
	].join('')

const brand = (section: string) => text(64, 88, ['@thiagoeti'], 24, COLOR.subtle, 'font-weight="600"') + text(64 + 11 * 14.4, 88, [`/ ${section}`], 24, COLOR.fg, 'font-weight="600"')

/** Números em colunas: cada coluna mede o próprio valor e rótulo (fonte mono, 0.6 em por caractere). */
function facts(list: { value: string | number; label: string }[], y: number): string {
	let x = 64
	return list
		.map((item, i) => {
			const out = text(x, y, [String(item.value)], 44, i === 0 ? COLOR.brand : COLOR.fg, 'font-weight="500"') + text(x, y + 30, [item.label], 16, COLOR.subtle)
			x += Math.max(String(item.value).length * 26.4, item.label.length * 9.6) + 48
			return out
		})
		.join('')
}

/** Capa: título e indicadores à esquerda, mostrador com os emblemas à direita. */
export function homeCard(card: { section: string; title: string; description: string; facts: { value: string | number; label: string }[]; projects: Project[] }): string {
	const C = 260
	const N = Math.max(1, card.projects.length)
	const span = 360 / N
	const dial = card.projects
		.map((p) => {
			const a = p.index * span
			const [x, y] = pt(C, 180, a)
			return `<path d="${band(C, 110, 250, a - span / 2 + 1, a + span / 2 - 1)}" fill="${COLOR.surface}" stroke="${p.index === 0 ? COLOR.brand : COLOR.line}"/><svg x="${f(x - 44)}" y="${f(y - 44)}" width="88" height="88" viewBox="0 0 64 64">${shapes(emblem(p.tags, 64))}</svg>`
		})
		.join('')
	const ticks = Array.from({ length: 60 }, (_, k) => {
		const [x0, y0] = pt(C, k % 5 ? 252 : 244, k * 6)
		const [x1, y1] = pt(C, 258, k * 6)
		return `<path d="M${x0} ${y0}L${x1} ${y1}" ${PAINT[k % 5 ? 'faint' : 'line']}/>`
	}).join('')
	return frame(
		[
			brand(card.section),
			text(64, 250, wrap(card.title, 14, 2), 96, COLOR.fg, 'letter-spacing="-3"', 1.05),
			text(64, 330, wrap(card.description, 34, 3), 26, COLOR.muted),
			facts(card.facts, 500),
			`<g transform="translate(${W - 2 * C - 50} ${(H - 2 * C) / 2})">${ticks}${dial}<circle cx="${C}" cy="${C}" r="96" fill="none" stroke="${COLOR.faint}"/><circle cx="${C}" cy="${C}" r="8" fill="${COLOR.brand}"/></g>`,
		].join(''),
	)
}

/** Projeto: nome, tecnologias e números à esquerda; emblema cercado pelo anel de respostas à direita. */
export function projectCard(p: Project, section: string, labels: { ok: string; refused: string; balance: string; responses: string }): string {
	const C = 230
	const marks = ringMarks(p.responses, C, 214, 8)
	const chips = (() => {
		let x = 64
		return p.technologies
			.slice(0, 5)
			.map((t) => {
				const w = t.length * 11 + 28
				const out = `<rect x="${x}" y="${H - 100}" width="${w}" height="36" rx="18" fill="none" stroke="${COLOR.line}"/>${text(x + 14, H - 76, [t], 17, COLOR.muted)}`
				x += w + 10
				return out
			})
			.join('')
	})()
	return frame(
		[
			brand(section),
			text(64, 140, [`${p.serial}`], 22, COLOR.brand, 'font-weight="600"'),
			text(64, 220, wrap(p.title, 18, 2), 64, COLOR.fg, 'letter-spacing="-2"', 1.1),
			text(64, p.title.length > 18 ? 340 : 270, wrap(p.subtitle || p.description, 36, 2), 24, COLOR.muted),
			facts(
				[
					{ value: p.balance.final || p.responses.length, label: p.balance.final ? labels.balance : labels.responses },
					{ value: p.ok, label: labels.ok },
					{ value: p.refused, label: labels.refused },
				],
				430,
			),
			chips,
			`<g transform="translate(${W - 2 * C - 64} ${(H - 2 * C) / 2})">${marks.map((m) => `<circle cx="${m.cx}" cy="${m.cy}" r="${m.r}" ${PAINT[m.tone]}/>`).join('')}<svg x="${C - 150}" y="${C - 150}" width="300" height="300" viewBox="0 0 64 64" stroke-width="0.4">${shapes(emblem(p.tags, 64))}</svg></g>`,
		].join(''),
	)
}
