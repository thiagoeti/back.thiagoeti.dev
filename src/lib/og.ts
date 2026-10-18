import { f } from './grid'
import { SHIELD } from './docker'
import { projects, type Project } from './projects'
import { slot, unitOf } from './rack'
import { text as copy } from './text'

/**
 * Cartões de compartilhamento (1200×630): SVG composto aqui, PNG pelo sharp. A mesma gramática e
 * as mesmas 2 cores + 1 acento do site — a frente do rack, chapas de servidor com LEDs e portas;
 * cor em atributo porque o arquivo é imagem, não página.
 */
const W = 1200
const H = 630
const C = { bg: '#0B0F14', sunken: '#080B10', rail: '#10161E', plate: '#151C27', relief: '#1B2330', line: 'rgba(255,255,255,0.14)', fg: '#F3F6F9', muted: '#9AA3B2', subtle: '#6B7484', faint: '#47505E', brand: '#2DD4A8' }
const SANS = 'IBM Plex Sans,DejaVu Sans,sans-serif'
const PLATE = 'IBM Plex Sans Condensed,IBM Plex Sans,DejaVu Sans Condensed,sans-serif'
const MONO = 'IBM Plex Mono,DejaVu Sans Mono,monospace'

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

const text = (x: number, y: number, lines: string[], size: number, fill: string, extra = '', family = SANS, lead = 1.25) =>
	`<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-family="${family}" ${extra}>${lines.map((l, i) => `<tspan x="${x}" dy="${i ? size * lead : 0}">${esc(l)}</tspan>`).join('')}</text>`

const frame = (body: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="${C.bg}"/>${body}</svg>`

const brand = (section: string) => text(64, 84, ['@thiagoeti'], 24, C.subtle, 'font-weight="500"') + text(64 + 146, 84, [`/  ${section}`], 24, C.fg, 'font-weight="600"')

/** Poste do rack: furos quadrados a cada terço de U, de `y` até `y + h`. */
function rail(x: number, y: number, h: number, w: number): string {
	let holes = ''
	for (let k = y + 8; k < y + h - 4; k += 16) holes += `<rect x="${f(x + w / 2 - 3)}" y="${k}" width="6" height="6" rx="1" fill="${C.sunken}"/>`
	return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${C.rail}"/>${holes}`
}

/** Porta RJ45 de frente, acesa no acento ou apagada. */
const jack = (x: number, y: number, s: number, on: boolean) =>
	`<path d="M${x} ${y}h${s}v${f(s * 0.6)}h-${f(s * 0.3)}v${f(s * 0.18)}h-${f(s * 0.4)}v-${f(s * 0.18)}h-${f(s * 0.3)}z" fill="${C.sunken}" stroke="${on ? C.brand : C.faint}" stroke-width="2"/>`

/**
 * Chapa do servidor: LED de energia, número e nome à esquerda (subtítulo na chapa grande); à direita,
 * os LEDs de blindagem por cima das portas — uma por tag — e a alça.
 */
function plate(p: Project, x: number, y: number, w: number, h: number, big = false): string {
	const k = h / 64
	const right = big ? x + w - 250 : x + w - 150 * k
	const leds = SHIELD.map((s, i) => {
		const cx = f(right + i * (big ? 12 : 13) * k)
		const cy = f(y + h * 0.32)
		const r = f((big ? 3 : 3.5) * k)
		return p.docker.shield[s] ? `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.brand}"/>` : `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${C.faint}" stroke-width="1.5"/>`
	}).join('')
	const size = (big ? 14 : 16) * k
	const jacks = p.tags.map((_, i) => jack(f(right + i * (size + 5 * k) - 2 * k), f(y + h * 0.52), f(size), big)).join('')
	const title = big ? wrap(p.title, 30, 1) : wrap(p.title, 18, 1)
	return [
		`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${C.relief}" stroke="${C.line}" stroke-width="1.5"/>`,
		`<circle cx="${f(x + 16 * k)}" cy="${f(y + h / 2)}" r="${f(3 * k)}" fill="${C.brand}"/>`,
		text(f(x + 28 * k), f(y + h / 2 + 8 * k), [p.serial], f(22 * k), C.fg, 'font-weight="500"', MONO),
		text(f(x + 74 * k), f(y + h / 2 + (big ? -1 : 6) * k), title, f((big ? 15 : 17) * k), C.fg, 'font-weight="600"'),
		big ? text(f(x + 74 * k), f(y + h / 2 + 17 * k), wrap(p.subtitle || p.description, 48, 1), f(10 * k), C.muted) : '',
		leds,
		jacks,
		`<rect x="${f(x + w - 18 * k)}" y="${f(y + h / 2 - 18 * k)}" width="${f(6 * k)}" height="${f(36 * k)}" rx="${f(3 * k)}" fill="none" stroke="${big ? C.brand : C.line}" stroke-width="1.5"/>`,
	].join('')
}

/** Capa: título e números à esquerda; à direita, a frente do rack com um servidor por projeto. */
export function homeCard(info: { section: string; title: string; description: string; caption: string; facts: { value: string | number; label: string }[] }): string {
	const x = 600
	const w = 540
	const rw = 22
	const top = 110
	const row = 76
	const height = projects.length * row + 16
	const rack = [
		`<rect x="${x - 2}" y="${top - 2}" width="${w + 4}" height="${height + 4}" rx="10" fill="${C.sunken}" stroke="${C.line}" stroke-width="1.5"/>`,
		rail(x, top, height, rw),
		rail(x + w - rw, top, height, rw),
		...projects.map((p, i) => plate(p, x + rw + 4, top + 8 + i * row, w - rw * 2 - 8, row - 12)),
	].join('')
	let fx = 64
	const facts = info.facts
		.map((item) => {
			const out = text(fx, 520, [String(item.value)], 48, C.fg, 'font-weight="500"', MONO) + text(fx, 552, [item.label], 18, C.subtle, '', PLATE)
			fx += Math.max(String(item.value).length * 30, item.label.length * 10) + 48
			return out
		})
		.join('')
	return frame(
		[
			brand(info.section),
			text(64, 236, wrap(info.title, 14, 2), 104, C.fg, 'font-weight="600" letter-spacing="-3"', PLATE, 1.05),
			text(64, 304, wrap(info.description, 34, 2), 28, C.muted),
			text(64, 386, wrap(info.caption, 40, 2), 22, C.subtle),
			facts,
			rack,
		].join(''),
	)
}

/** Projeto: o servidor puxado do rack — a chapa inteira, com tecnologias e tags embaixo. */
export function projectCard(p: Project, section: string): string {
	const unit = unitOf('server', p.slug)
	const rw = 40
	const y = 170
	const h = 150
	return frame(
		[
			brand(section),
			`<rect x="62" y="${y - 2}" width="${W - 124}" height="${h + 4}" rx="10" fill="${C.sunken}" stroke="${C.line}" stroke-width="1.5"/>`,
			rail(64, y, h, rw),
			rail(W - 64 - rw, y, h, rw),
			plate(p, 64 + rw + 6, y + 8, W - 128 - rw * 2 - 12, h - 16, true),
			text(64, 400, [`${slot(unit)}  ·  ${p.docker.cpus} ${copy.unit.cpus}  ·  ${p.docker.memory}  ·  :${p.docker.port}`], 20, C.subtle, '', MONO),
			text(64, 470, wrap(p.description, 70, 2), 26, C.muted),
			text(64, 556, [p.technologies.join('  +  ')], 22, C.fg, '', MONO),
			text(64, 596, [`#${p.tags.join('  #')}`], 18, C.subtle, '', MONO),
		].join(''),
	)
}
