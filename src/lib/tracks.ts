import type { Shape } from './glyphs'
import { arrow, f, route } from './grid'

/**
 * Diagrama do README desenhado como topologia (.analyse/design.md).
 * - Sequência: cada participante é uma raia horizontal com o nome numa barra curta; a ordem corre da
 *   esquerda para a direita; cada mensagem é um evento vertical numerado entre raias, saindo de um
 *   ponto. Retorno tracejado; mensagem para si mesmo é um laço em ângulo reto; `alt/else` é uma faixa.
 * - Fluxo: profundidade a partir das origens vira coluna (origem à esquerda); ligações em ângulo reto;
 *   cada nó é uma barra curta, o banco de dados leva uma segunda linha por dentro e a decisão (`{…}`)
 *   tem as pontas em bico.
 */
export const WIDTH = 640

export type Label = { x: number; y: number; text: string; size: number; tone: 'label' | 'text' | 'key' | 'dark'; anchor?: 'start' | 'middle' | 'end' }
export type Legend = { id: string; label: string; kind: 'node' | 'block' | 'message'; n?: number; from?: string; to?: string; dashed?: boolean }
export type Scene = { kind: 'sequence' | 'flow'; width: number; height: number; shapes: Shape[]; labels: Label[]; legend: Legend[] }

type Participant = { id: string; label: string }
type Message = { from: string; to: string; text: string; dashed: boolean }
type Block = { label: string; first: number; last: number; depth: number }

function sequence(lines: string[]): Scene {
	const participants: Participant[] = []
	const messages: Message[] = []
	const blocks: Block[] = []
	const open: Block[] = []
	const add = (id: string) => participants.some((p) => p.id === id) || participants.push({ id, label: id })

	for (const line of lines) {
		let m: RegExpMatchArray | null
		if ((m = line.match(/^participant\s+(\S+)(?:\s+as\s+(.+))?$/))) participants.push({ id: m[1]!, label: (m[2] ?? m[1]!).trim() })
		else if ((m = line.match(/^(\w+)\s*(--?>>?|--?\))\s*(\w+)\s*:\s*(.+)$/))) {
			add(m[1]!)
			add(m[3]!)
			messages.push({ from: m[1]!, to: m[3]!, text: m[4]!.trim(), dashed: m[2]!.startsWith('--') })
		} else if ((m = line.match(/^(alt|opt|loop|par|critical)\s+(.+)$/))) open.push({ label: `${m[1]} ${m[2]!.trim()}`, first: messages.length, last: -1, depth: open.length })
		else if ((m = line.match(/^(else|and)\s+(.+)$/)) && open.length) {
			const b = open.pop()!
			blocks.push({ ...b, last: messages.length - 1 })
			open.push({ label: `${m[1]} ${m[2]!.trim()}`, first: messages.length, last: -1, depth: b.depth })
		} else if (line === 'end' && open.length) blocks.push({ ...open.pop()!, last: messages.length - 1 })
	}

	const TOP = 56
	const ROW = 64
	const LEFT = 120
	const RIGHT = WIDTH - 32
	const y = new Map(participants.map((p, i) => [p.id, TOP + i * ROW]))
	const bottom = TOP + (participants.length - 1) * ROW
	const valid = blocks.filter((b) => b.last >= b.first)
	const height = bottom + 40 + (valid.length ? 24 : 0)
	const step = messages.length > 1 ? (RIGHT - LEFT) / (messages.length - 1) : 0
	const x = (i: number) => (messages.length > 1 ? LEFT + i * step : (LEFT + RIGHT) / 2)
	const shapes: Shape[] = []
	const labels: Label[] = []

	valid.forEach((b, i) => {
		const pad = Math.min(step / 2, 20) - b.depth * 4
		shapes.push({ tone: i % 2 ? 'dash' : 'zone', x: f(x(b.first) - pad), y: TOP - 20 + b.depth * 4, w: f(x(b.last) - x(b.first) + pad * 2), h: f(bottom - TOP + 40 - b.depth * 8) })
		// Faixa estreita leva só a palavra-chave (`alt`, `else`); o rótulo inteiro está na legenda.
		const room = x(b.last) - x(b.first) + pad * 2 - 8
		labels.push({ x: f(x(b.first) - pad + 4), y: bottom + 40, text: b.label.length * 6.2 <= room ? b.label : b.label.split(' ')[0]!, size: 10, tone: 'text', anchor: 'start' })
	})

	for (const p of participants) {
		const py = y.get(p.id)!
		shapes.push({ tone: 'rule', d: `M${LEFT - 40} ${py}L${RIGHT + 16} ${py}` })
		shapes.push({ tone: 'node', x: 24, y: py - 12, w: Math.max(26, p.id.length * 8 + 14), h: 24 })
		labels.push({ x: 24 + Math.max(26, p.id.length * 8 + 14) / 2, y: py + 4, text: p.id, size: 11, tone: 'key', anchor: 'middle' })
	}

	messages.forEach((m, i) => {
		const mx = x(i)
		const a = { x: mx, y: y.get(m.from)! }
		const b = { x: mx, y: y.get(m.to)! }
		if (m.from === m.to) {
			const d = `M${f(mx - 7)} ${a.y}L${f(mx - 7)} ${a.y + 18}L${f(mx + 7)} ${a.y + 18}L${f(mx + 7)} ${a.y + 4}`
			shapes.push({ tone: m.dashed ? 'dash' : 'line', d }, { tone: 'line', d: arrow({ x: mx + 7, y: a.y + 18 }, { x: mx + 7, y: a.y + 6 }, 5) })
		} else {
			const dir = Math.sign(b.y - a.y)
			const tip = { x: mx, y: b.y - dir * 7 }
			shapes.push({ tone: m.dashed ? 'dash' : 'line', d: `M${f(mx)} ${a.y}L${f(mx)} ${tip.y}` }, { tone: 'line', d: arrow(a, tip, 6) })
		}
		shapes.push({ tone: m.dashed ? 'node' : 'dot', cx: f(mx), cy: a.y, r: 4 })
		labels.push({ x: f(mx), y: 22, text: String(i + 1), size: 11, tone: 'label', anchor: 'middle' })
	})

	const legend: Legend[] = participants.map((p): Legend => ({ id: p.id, label: p.label, kind: 'node' }))
	messages.forEach((m, i) => {
		for (const b of valid.filter((b) => b.first === i)) legend.push({ id: `b${i}${b.label}`, label: b.label, kind: 'block' })
		legend.push({ id: `m${i}`, label: m.text, kind: 'message', n: i + 1, from: m.from, to: m.to, dashed: m.dashed })
	})

	return { kind: 'sequence', width: WIDTH, height, shapes, labels, legend }
}

type Node = { id: string; label: string; db: boolean; decision: boolean }

/** Forma do nó: `[texto]`, `[(banco)]`, `{decisão}` ou `(texto)`; `<br/>` do rótulo vira espaço. */
const NODE = /^(\w+)\s*(?:\[\((.*?)\)\]|\[(.*?)\]|\{(.*?)\}|\((.*?)\))?$/

function flow(lines: string[]): Scene {
	const nodes = new Map<string, Node>()
	const edges: { from: string; to: string; label: string }[] = []
	const token = (raw: string): string => {
		const m = raw.trim().match(NODE)
		if (!m) return ''
		const id = m[1]!
		const prev = nodes.get(id)
		const label = (m[2] ?? m[3] ?? m[4] ?? m[5])?.replace(/<br\s*\/?>/gi, ' ').replace(/\s+/g, ' ').trim()
		nodes.set(id, { id, label: label || prev?.label || id, db: m[2] !== undefined || !!prev?.db, decision: m[4] !== undefined || !!prev?.decision })
		return id
	}
	for (const line of lines) {
		const m = line.match(/^(.+?)\s*-->\s*(?:\|([^|]+)\|\s*)?(.+)$/)
		if (!m) continue
		const left = m[1]!.split('&').map(token).filter(Boolean)
		const right = m[3]!.split('&').map(token).filter(Boolean)
		for (const a of left) for (const b of right) edges.push({ from: a, to: b, label: m[2]?.trim() ?? '' })
	}

	const depth = new Map<string, number>()
	const queue: [string, number][] = [...nodes.keys()].filter((id) => !edges.some((e) => e.to === id)).map((id) => [id, 0])
	for (const [id, d] of queue) {
		if ((depth.get(id) ?? -1) >= d) continue
		depth.set(id, d)
		for (const e of edges.filter((e) => e.from === id)) queue.push([e.to, d + 1])
	}
	const max = Math.max(0, ...depth.values())
	const columns = Array.from({ length: max + 1 }, (_, d) => [...nodes.keys()].filter((id) => depth.get(id) === d))
	const tallest = Math.max(1, ...columns.map((c) => c.length))
	const GAP = 56
	const BW = 22
	const height = tallest * GAP + 48
	const pos = new Map<string, { x: number; y: number }>()
	columns.forEach((ids, d) => {
		const cx = max ? 48 + (d * (WIDTH - 96)) / max : WIDTH / 2
		ids.forEach((id, k) => pos.set(id, { x: cx, y: f(height / 2 + (k - (ids.length - 1) / 2) * GAP) }))
	})

	const shapes: Shape[] = []
	const labels: Label[] = []
	// Ligação com rótulo leva um número no desenho; o texto fica na legenda, na mesma ordem.
	const numbered = new Map<number, number>()
	edges.forEach((e, i) => e.label && numbered.set(i, numbered.size + 1))
	edges.forEach((e, i) => {
		const a = pos.get(e.from)!
		const b = pos.get(e.to)!
		const s = { x: a.x + BW, y: a.y }
		const t = { x: b.x - BW - 2, y: b.y }
		shapes.push({ tone: 'line', d: route([s, t]) }, { tone: 'line', d: arrow({ x: t.x - 10, y: t.y }, t, 6) })
		const n = numbered.get(i)
		if (n) {
			// Trecho próprio da ligação: o de saída quando várias chegam ao mesmo nó, senão o de chegada.
			const mid = (s.x + t.x) / 2
			const converge = edges.filter((x) => x.to === e.to).length > 1
			const at = a.y === b.y ? { x: mid, y: t.y } : converge ? { x: (s.x + mid) / 2, y: s.y } : { x: (mid + t.x) / 2, y: t.y }
			labels.push({ x: f(at.x), y: f(at.y - 8), text: String(n), size: 11, tone: 'label', anchor: 'middle' })
		}
	})
	for (const n of nodes.values()) {
		const p = pos.get(n.id)!
		const top = f(p.y - 12)
		const bottom = f(p.y + 12)
		if (n.decision) shapes.push({ tone: 'node', d: `M${f(p.x - BW + 8)} ${top}L${f(p.x + BW - 8)} ${top}L${f(p.x + BW)} ${p.y}L${f(p.x + BW - 8)} ${bottom}L${f(p.x - BW + 8)} ${bottom}L${f(p.x - BW)} ${p.y}Z` })
		else shapes.push({ tone: 'node', x: f(p.x - BW), y: top, w: BW * 2, h: 24 })
		if (n.db) shapes.push({ tone: 'rule', d: `M${f(p.x - BW + 4)} ${f(top + 5)}L${f(p.x + BW - 4)} ${f(top + 5)}` })
		labels.push({ x: p.x, y: f(p.y + 4), text: n.id, size: n.id.length > 2 ? 9 : 11, tone: 'key', anchor: 'middle' })
	}

	const legend: Legend[] = [...nodes.values()].map((n) => ({ id: n.id, label: n.label, kind: 'node' }))
	edges.forEach((e, i) => e.label && legend.push({ id: `e${i}`, label: e.label, kind: 'message', n: numbered.get(i), from: e.from, to: e.to }))
	return { kind: 'flow', width: WIDTH, height, shapes, labels, legend }
}

export function tracks(mermaid: string): Scene | null {
	const lines = mermaid.split('\n').map((l) => l.trim()).filter(Boolean)
	const head = lines[0] ?? ''
	if (/^sequenceDiagram/.test(head)) return sequence(lines.slice(1))
	if (/^(flowchart|graph)\b/.test(head)) return flow(lines.slice(1))
	return null
}
