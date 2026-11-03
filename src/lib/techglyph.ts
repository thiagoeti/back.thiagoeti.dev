import { f } from './grid'
import type { Project } from './projects'

/**
 * Glifo de tecnologia do projeto (.analyse/design.md › Revisão 10). Vocabulário, não logotipo:
 * - a **linguagem** é a moldura (PHP oval, Python dois quadros entrelaçados, TypeScript quadro com
 *   canto cortado) e leva a etiqueta da linguagem embaixo;
 * - o **framework** do título é o motivo grande no centro (corrotinas, camadas, workers, raio…);
 * - as **demais tecnologias** são satélites ligados à moldura.
 * Tecnologia fora do vocabulário vira satélite genérico. Desenho em `viewBox 0 0 200 200`.
 * Saída em elementos com papel (`tone`): o componente põe classe, o cartão OG põe cor.
 */
export type Tone = 'frame' | 'faint' | 'motif' | 'motifFill' | 'motifSoft' | 'sat' | 'satFill' | 'dot' | 'label' | 'tag'
export type El = { tag: 'path' | 'circle' | 'rect' | 'line' | 'text'; a: Record<string, string | number>; tone: Tone; text?: string }
export type Glyph = { lang: string; main: string; sats: { name: string; x: number; y: number }[]; els: El[] }

const key = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')
const LANGS = ['php', 'python', 'typescript'] as const

const P = (d: string, tone: Tone): El => ({ tag: 'path', a: { d }, tone })
const O = (cx: number, cy: number, r: number, tone: Tone): El => ({ tag: 'circle', a: { cx: f(cx), cy: f(cy), r: f(r) }, tone })
const R = (x: number, y: number, w: number, h: number, rx: number, tone: Tone): El => ({ tag: 'rect', a: { x: f(x), y: f(y), width: f(w), height: f(h), rx }, tone })
const poly = (cx: number, cy: number, r: number, n: number, rot = -Math.PI / 2) =>
	Array.from({ length: n }, (_, i) => `${i ? 'L' : 'M'}${f(cx + Math.cos(rot + (i * 2 * Math.PI) / n) * r)} ${f(cy + Math.sin(rot + (i * 2 * Math.PI) / n) * r)}`).join('') + 'Z'
const spiral = (cx: number, cy: number, r: number, turns = 1.75) => {
	let d = ''
	const steps = 28
	for (let i = 0; i <= steps; i++) {
		const t = i / steps
		const a = t * turns * 2 * Math.PI
		d += `${i ? 'L' : 'M'}${f(cx + Math.cos(a) * r * t)} ${f(cy + Math.sin(a) * r * t)}`
	}
	return d
}

// ── molduras (linguagem) ─────────────────────────────────────────────────────────────────────

function frame(lang: string): El[] {
	if (lang === 'php') return [P('M22 100a78 54 0 1 0 156 0a78 54 0 1 0-156 0', 'frame'), P('M32 100a68 44 0 1 0 136 0a68 44 0 1 0-136 0', 'faint')]
	if (lang === 'python') return [R(30, 30, 96, 96, 24, 'frame'), R(74, 74, 96, 96, 24, 'frame'), O(54, 50, 4, 'dot'), O(146, 150, 4, 'dot')]
	if (lang === 'typescript') return [P('M42 30H138L170 62V158A12 12 0 0 1 158 170H42A12 12 0 0 1 30 158V42A12 12 0 0 1 42 30Z', 'frame'), P('M138 30V62H170', 'faint')]
	return [O(100, 100, 72, 'frame')]
}

// ── motivos grandes (framework do título) ───────────────────────────────────────────────────

const MAIN: Record<string, () => El[]> = {
	// corrotinas presas a um contêiner de DI
	hyperf: () => {
		const pts = [-90, 30, 150].map((d) => ({ x: 100 + Math.cos((d * Math.PI) / 180) * 30, y: 100 + Math.sin((d * Math.PI) / 180) * 30 }))
		return [...pts.map((p) => P(`M100 100L${f(p.x)} ${f(p.y)}`, 'faint')), ...pts.map((p) => P(spiral(p.x, p.y, 13), 'motif')), O(100, 100, 6, 'motifFill')]
	},
	// camadas da aplicação, a de cima acesa
	laravel: () => [
		P('M100 108l34 16-34 16-34-16z', 'faint'),
		P('M100 90l34 16-34 16-34-16z', 'frame'),
		P('M100 72l34 16-34 16-34-16z', 'motif'),
		P('M100 72l34 16-34 16-34-16z', 'motifSoft'),
	],
	// workers em volta da memória compartilhada
	swoole: () => {
		const w = [
			[-36, -26],
			[36, -26],
			[-36, 26],
			[36, 26],
		]
		return [...w.map(([x, y]) => P(`M100 100L${100 + x! * 0.62} ${100 + y! * 0.62}`, 'faint')), ...w.map(([x, y]) => R(100 + x! - 9, 100 + y! - 9, 18, 18, 4, 'frame')), P(poly(100, 100, 15, 6), 'motif'), P(poly(100, 100, 15, 6), 'motifSoft'), O(100, 100, 3.5, 'motifFill')]
	},
	// laço de eventos com o raio
	fastapi: () => [P('M100 62a38 38 0 1 1-33 19', 'sat'), P('M60 76l7 5 2-9', 'sat'), P('M106 70L82 104H100L94 130L120 94H102Z', 'motifFill')],
	// prisma tipado
	elysiajs: () => [P(poly(100, 104, 40, 3), 'motif'), P(poly(100, 104, 22, 3), 'frame'), P('M76 70l-10 10 10 10M124 70l10 10-10 10', 'sat'), O(100, 108, 4, 'motifFill')],
	// árvore de HTML de onde sai a linha de dado
	scraping: () => [
		P('M58 70l-14 30 14 30M142 70l14 30-14 30', 'frame'),
		P('M100 72V88M100 88L80 104M100 88L120 104M80 104V120M120 104L110 120M120 104L130 120', 'faint'),
		O(100, 72, 5, 'motifFill'),
		O(80, 104, 4, 'motif'),
		O(120, 104, 4, 'motif'),
		O(80, 122, 3, 'dot'),
		O(110, 122, 3, 'dot'),
		O(130, 122, 3, 'dot'),
	],
}
MAIN.scrapeit = MAIN.scraping!
MAIN.laraveloctane = MAIN.laravel!

// ── satélites (demais tecnologias) ──────────────────────────────────────────────────────────

const SAT: Record<string, (x: number, y: number) => El[]> = {
	swoole: (x, y) => [P(poly(x, y, 8, 6), 'sat')],
	hyperf: (x, y) => [P(spiral(x, y, 8), 'sat')],
	laravel: (x, y) => [P(`M${x} ${y - 5}l9 4.5-9 4.5-9-4.5z`, 'sat'), P(`M${x - 9} ${y + 3}l9 4.5 9-4.5`, 'sat')],
	laraveloctane: (x, y) => [P(poly(x, y, 8, 8, -Math.PI / 8), 'sat'), P(`M${x - 4} ${y}H${x + 4}`, 'sat')],
	sqlite: (x, y) => [P(`M${x - 7} ${y - 5}a7 3 0 1 0 14 0a7 3 0 1 0-14 0V${y + 5}a7 3 0 0 0 14 0V${y - 5}`, 'sat')],
	pydantic: (x, y) => [P(`M${x} ${y - 9}l7 3v4c0 5-3 8-7 10-4-2-7-5-7-10v-4z`, 'sat'), P(`M${x - 3} ${y + 1}l2 2 4-4`, 'sat')],
	uvicorn: (x, y) => [P(`M${x - 6} ${y + 7}L${x + 7} ${y - 8}M${x - 2} ${y + 6}l-4-4M${x + 2} ${y + 1}l-4-4M${x + 5} ${y - 4}l-3-3`, 'sat')],
	fastapi: (x, y) => [P(`M${x + 2} ${y - 9}L${x - 5} ${y + 1}H${x}L${x - 2} ${y + 9}L${x + 5} ${y - 1}H${x}Z`, 'satFill')],
	typebox: (x, y) => [P(`M${x} ${y - 8}l7 4v8l-7 4-7-4v-8zM${x} ${y}v8M${x} ${y}l7-4M${x} ${y}l-7-4`, 'sat')],
	bun: (x, y) => [P(`M${x - 9} ${y + 4}a9 9 0 0 1 18 0z`, 'sat'), O(x - 3, y, 1.2, 'satFill'), O(x + 3, y - 1, 1.2, 'satFill')],
	elysiajs: (x, y) => [P(poly(x, y + 1, 9, 3), 'sat')],
	scrapeit: (x, y) => [O(x - 2, y - 2, 5.5, 'sat'), P(`M${x + 2} ${y + 2}l5 5`, 'sat')],
	abortsignal: (x, y) => [O(x, y + 1, 7, 'sat'), P(`M${x} ${y + 1}V${y - 3}M${x - 2} ${y - 9}H${x + 2}`, 'sat')],
}
const genericSat = (x: number, y: number) => [O(x, y, 7, 'sat'), O(x, y, 2, 'satFill')]

/** Posições dos satélites: dos lados da moldura, alternando direita e esquerda. */
const ORBIT = [-30, 210, 30, 150, -70, 250].map((d) => (d * Math.PI) / 180)

export function techGlyph(p: Project): Glyph {
	const techs = p.technologies.map((t) => ({ name: t, k: key(t) }))
	const lang = techs.find((t) => (LANGS as readonly string[]).includes(t.k))
	const words = p.title.split(/[\s+]+/).map(key).filter(Boolean)
	const mainKey = [...words].reverse().find((w) => MAIN[w]) ?? techs.find((t) => MAIN[t.k])?.k ?? ''
	const els: El[] = [...frame(lang?.k ?? ''), ...(MAIN[mainKey]?.() ?? [O(100, 100, 18, 'motif'), O(100, 100, 5, 'motifFill')])]

	const rest = techs.filter((t) => t !== lang && t.k !== mainKey && !(mainKey === 'scraping' && t.k === 'scrapeit'))
	const sats = rest.slice(0, ORBIT.length).map((t, i) => {
		const a = ORBIT[i]!
		return { name: t.name, x: f(100 + Math.cos(a) * 108), y: f(100 + Math.sin(a) * 86) }
	})
	for (const [i, s] of sats.entries()) {
		const a = ORBIT[i]!
		const edge = { x: f(100 + Math.cos(a) * 70), y: f(100 + Math.sin(a) * 58) }
		els.push({ tag: 'line', a: { x1: edge.x, y1: edge.y, x2: s.x, y2: s.y, 'data-link': i }, tone: 'faint' })
		els.push(O(s.x, s.y, 13, 'faint'))
		els.push(...(SAT[rest[i]!.k]?.(s.x, s.y) ?? genericSat(s.x, s.y)))
	}

	if (lang) {
		const w = lang.name.length * 7 + 14
		els.push(R(100 - w / 2, 178, w, 16, 4, 'tag'))
		els.push({ tag: 'text', a: { x: 100, y: 189.5, 'text-anchor': 'middle', 'font-size': 10 }, tone: 'label', text: lang.name.toLowerCase() })
	}
	return { lang: lang?.name ?? '', main: mainKey, sats, els }
}

/** Cor de cada papel no cartão OG, onde não há classe. */
export const HEX: Record<Tone, { stroke?: string; fill?: string; w?: number }> = {
	frame: { stroke: '#9AA3B2', w: 1.6 },
	faint: { stroke: 'rgba(255,255,255,0.18)', w: 1.2 },
	motif: { stroke: '#2DD4A8', w: 2.2 },
	motifFill: { fill: '#2DD4A8' },
	motifSoft: { fill: 'rgba(45,212,168,0.12)' },
	sat: { stroke: '#22D3EE', w: 1.6 },
	satFill: { fill: '#22D3EE' },
	dot: { fill: '#F3F6F9' },
	label: { fill: '#9AA3B2' },
	tag: { fill: '#151C27', stroke: 'rgba(255,255,255,0.14)', w: 1 },
}

/** O glifo como SVG puro (cartão OG). */
export function glyphSvg(g: Glyph, x: number, y: number, size: number): string {
	const k = size / 200
	const attrs = (a: Record<string, string | number>) =>
		Object.entries(a)
			.filter(([n]) => !n.startsWith('data-'))
			.map(([n, v]) => `${n}="${v}"`)
			.join(' ')
	const body = g.els
		.map((e) => {
			const h = HEX[e.tone]
			const paint = `fill="${h.fill ?? 'none'}" stroke="${h.stroke ?? 'none'}" stroke-width="${h.w ?? 0}" stroke-linecap="round" stroke-linejoin="round"`
			return e.tag === 'text' ? `<text ${attrs(e.a)} fill="${h.fill}" font-family="JetBrains Mono,DejaVu Sans Mono,monospace">${e.text}</text>` : `<${e.tag} ${attrs(e.a)} ${paint}/>`
		})
		.join('')
	return `<g transform="translate(${x} ${y}) scale(${k})">${body}</g>`
}
