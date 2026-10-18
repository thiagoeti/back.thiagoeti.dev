import { arc, f, pt, spoke } from './polar'

/**
 * Gramática dos glifos — regra única (.analyse/design.md):
 *
 * - Grade polar: centro, 4 anéis, 12 raios a 30°; 0° no topo, sentido horário.
 * - Primitivas: anel, arco, raio, ponto. Nada fora disso.
 * - Traço 1.5, non-scaling-stroke, pontas e junções redondas.
 * - Cheio = presente/aprovado/ativo; vazado = ausente/recusado.
 * - Cada tag é um fragmento desenhado num anel (`r`) dentro de uma faixa (`w` para cada lado).
 * - Emblema do projeto = fragmentos das tags, de dentro para fora, na ordem do `data.json`,
 *   com o ponto central do saldo. Projetos que dividem uma tag dividem o mesmo anel.
 * - Tag sem desenho: fragmento gerado do hash do nome, nas mesmas primitivas.
 */
export type Tone = 'grid' | 'faint' | 'line' | 'dash' | 'key' | 'dot' | 'hollow' | 'mute'

export const TONE: Record<Tone, string> = {
	grid: 'glyph-grid',
	faint: 'glyph-faint',
	line: 'glyph-line',
	dash: 'glyph-dash',
	key: 'glyph-key',
	dot: 'glyph-dot',
	hollow: 'glyph-hollow',
	mute: 'glyph-mute',
}

export type Shape = { tone: Tone; d?: string; cx?: number; cy?: number; r?: number }

type Fragment = (c: number, r: number, w: number) => Shape[]

const path = (tone: Tone, d: string): Shape => ({ tone, d })
const dot = (tone: Tone, c: number, r: number, a: number, size: number): Shape => {
	const [cx, cy] = pt(c, r, a)
	return { tone, cx, cy, r: f(size) }
}
const ring = (tone: Tone, c: number, r: number): Shape => ({ tone, cx: c, cy: c, r: f(r) })
const range = (n: number) => Array.from({ length: n }, (_, i) => i)

/** Desenho de cada tag conhecida: a mecânica, não o tema. */
export const FRAGMENTS: Record<string, Fragment> = {
	/** Muitas tarefas leves num anel só: seis arcos curtos, um deles em curso. */
	coroutines: (c, r, w) => [...range(6).map((k) => path('line', arc(c, r, k * 60 + 8, k * 60 + 52))), dot('dot', c, r, 52, w * 0.55)],
	/** Três dependências entram de fora para dentro e prendem no anel. */
	'dependency-injection': (c, r, w) => [ring('faint', c, r), ...[0, 120, 240].flatMap((a) => [path('key', spoke(c, a, r + w, r)), dot('hollow', c, r + w, a, w * 0.4)])],
	/** Duas pistas paralelas correndo juntas, um ponto em cada uma no mesmo instante. */
	concurrency: (c, r, w) => [
		...[r - w * 0.55, r + w * 0.55].flatMap((lane) => [path('line', arc(c, lane, 20, 160)), path('line', arc(c, lane, 200, 340))]),
		dot('dot', c, r - w * 0.55, 90, w * 0.4),
		dot('dot', c, r + w * 0.55, 90, w * 0.4),
	],
	/** Anel aberto no topo com uma trava atravessada: o corpo só entra pelo portão. */
	validation: (c, r, w) => [path('line', arc(c, r, 25, 335)), path('key', spoke(c, 0, r - w, r + w)), dot('dot', c, r, 335, w * 0.4)],
	/** Escada de versões: cada quarto de volta sobe um degrau. */
	migrations: (c, r, w) => {
		const steps = [r - w, r - w / 3, r + w / 3, r + w]
		return [
			...steps.map((s, i) => path('line', arc(c, s, i * 90, i * 90 + 90))),
			...[90, 180, 270].map((a, i) => path('line', spoke(c, a, steps[i]!, steps[i + 1]!))),
			dot('dot', c, r + w, 0, w * 0.4),
		]
	},
	/** Um único ponto onde conferir e debitar se cruzam: o `UPDATE … WHERE`. */
	'atomic-update': (c, r, w) => [ring('faint', c, r), path('key', spoke(c, 90, r - w, r + w)), dot('dot', c, r, 90, w * 0.5)],
	/** Doze resultados prontos em cada raio; o primeiro aceso. */
	'config-cache': (c, r, w) => [ring('faint', c, r), ...range(11).map((k) => dot('mute', c, r, (k + 1) * 30, w * 0.28)), dot('dot', c, r, 0, w * 0.45)],
	/** Quatro processos presos ao mesmo anel de memória. */
	'shared-memory': (c, r, w) => [ring('key', c, r), ...[45, 135, 225, 315].flatMap((a) => [path('line', spoke(c, a, r + w, r)), dot('hollow', c, r + w, a, w * 0.35)])],
	/** Confere (vazado) e grava (cheio) no mesmo arco, com a marca da comparação no meio. */
	'compare-and-set': (c, r, w) => [path('faint', arc(c, r, 60, 300)), path('line', arc(c, r, 300, 420)), path('key', spoke(c, 0, r - w * 0.7, r + w * 0.7)), dot('hollow', c, r, 300, w * 0.45), dot('dot', c, r, 60, w * 0.45)],
	/** Três passagens sem trava: o fluxo atravessa cada abertura. */
	'lock-free': (c, r, w) => [...[0, 120, 240].map((a) => path('line', arc(c, r, a + 22, a + 98))), ...[0, 120, 240].map((a) => dot('dot', c, r, a, w * 0.35))],
	/** Interface entre servidor e aplicação: dois anéis ligados por quatro contatos. */
	asgi: (c, r, w) => [ring('faint', c, r - w * 0.6), ring('faint', c, r + w * 0.6), ...[0, 90, 180, 270].map((a) => path('key', spoke(c, a, r - w * 0.6, r + w * 0.6)))],
	/** Uma volta que nunca fecha: o laço gira, uma tarefa por vez. */
	'event-loop': (c, r, w) => {
		const [ax, ay] = pt(c, r - w * 0.7, 326)
		const [tx, ty] = pt(c, r, 342)
		const [bx, by] = pt(c, r + w * 0.7, 326)
		return [path('key', arc(c, r, 20, 340)), path('key', `M${ax} ${ay}L${tx} ${ty}L${bx} ${by}`), dot('dot', c, r, 180, w * 0.45)]
	},
	/** Quatro rotas saindo do recurso. */
	'rest-api': (c, r, w) => [ring('faint', c, r), ...[0, 90, 180, 270].flatMap((a) => [path('key', spoke(c, a, r, r + w)), dot('dot', c, r + w, a, w * 0.3)])],
	/** Valor preso entre duas paredes do mesmo tipo. */
	'type-safety': (c, r, w) => [ring('line', c, r - w * 0.45), ring('line', c, r + w * 0.45), dot('dot', c, r, 0, w * 0.35)],
	/** Marca de compilação antes da partida; três quartos prontos, o resto em execução. */
	aot: (c, r, w) => [path('key', spoke(c, 0, r - w, r + w)), path('line', arc(c, r, 0, 270)), path('faint', arc(c, r, 270, 360)), dot('dot', c, r, 270, w * 0.4)],
}

/** Hash estável (FNV-1a) do nome: escolhe os raios do fragmento gerado. */
function hash(s: string): number {
	let h = 0x811c9dc5
	for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 0x01000193)
	return h >>> 0
}

/** Tag sem desenho: pontos nos raios sorteados pelo hash e o arco que os liga. */
const generated =
	(name: string): Fragment =>
	(c, r, w) => {
		const bits = hash(name)
		const on = range(12).filter((k) => bits & (1 << k))
		const marks = on.length >= 3 ? on : [0, 4, 8]
		const first = marks[0]! * 30
		const last = marks.at(-1)! * 30
		return [path('line', arc(c, r, first, last)), ...marks.slice(1).map((k) => dot('mute', c, r, k * 30, w * 0.32)), dot('dot', c, r, first, w * 0.45)]
	}

export const fragmentOf = (tag: string): Fragment => FRAGMENTS[tag] ?? generated(tag)

/** Grade polar de fundo: 4 anéis e 12 raios. */
export function grid(c: number, r: number): Shape[] {
	return [...[0.25, 0.5, 0.75, 1].map((k) => ring('grid', c, r * k)), ...range(12).map((k) => path('grid', spoke(c, k * 30, r * 0.25, r)))]
}

/** Emblema de um projeto numa prancheta `size × size`. */
export function emblem(tags: string[], size = 64): Shape[] {
	const c = size / 2
	const rMin = size * 0.14
	const rMax = size * 0.44
	const n = Math.max(1, tags.length)
	const gap = n > 1 ? (rMax - rMin) / (n - 1) : 0
	const w = n > 1 ? Math.min(size * 0.047, gap / 2 - size * 0.01) : size * 0.06
	return [
		...grid(c, rMax + size * 0.04),
		...tags.flatMap((t, i) => fragmentOf(t)(c, n > 1 ? rMin + i * gap : (rMin + rMax) / 2, w)),
		{ tone: 'dot', cx: c, cy: c, r: f(size * 0.04) },
	]
}

/** Glifo de uma tag sozinha (chips da barra de tags). */
export function tagGlyph(tag: string, size = 24): Shape[] {
	const c = size / 2
	return fragmentOf(tag)(c, size * 0.3, size * 0.13)
}

/** Índice polar: `n` marcas num anel, as primeiras `k` cheias (passo k de n, prancha k de n). */
export function indexGlyph(k: number, n: number, size = 24): Shape[] {
	const c = size / 2
	const r = size * 0.36
	const step = 360 / Math.max(1, n)
	return [
		ring('grid', c, r),
		...range(n).map((i) => (i < k ? dot(i === k - 1 ? 'dot' : 'mute', c, r, i * step, size * 0.07) : dot('hollow', c, r, i * step, size * 0.06))),
	]
}
