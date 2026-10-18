import type { Shape } from './glyphs'
import { arrow, f, route } from './grid'

/**
 * Trilhas da placa: o mermaid do README desenhado como a placa-mãe do servidor (.analyse/design.md).
 * - Sequência: cada participante é um chip com o seu barramento horizontal; o tempo corre da esquerda
 *   para a direita; cada mensagem é uma trilha vertical numerada entre barramentos, saindo de uma via.
 *   Retorno tracejado; mensagem para si mesmo é um laço em ângulo reto; `alt/else` é uma faixa sombreada.
 * - Fluxo: profundidade a partir das origens vira coluna (origem à esquerda); trilhas em ângulo reto e 45°;
 *   cada nó é um chip, o banco de dados leva um anel por dentro.
 */
export const WIDTH = 640

export type Label = { x: number; y: number; text: string; size: number; tone: 'label' | 'text' | 'key' | 'dark'; anchor?: 'start' | 'middle' }
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
		shapes.push({ tone: i % 2 ? 'faint' : 'zone', x: f(x(b.first) - pad), y: TOP - 20 + b.depth * 4, w: f(x(b.last) - x(b.first) + pad * 2), h: f(bottom - TOP + 40 - b.depth * 8) })
		labels.push({ x: f(x(b.first) - pad + 4), y: bottom + 40, text: b.label, size: 10, tone: 'text', anchor: 'start' })
	})

	for (const p of participants) {
		const py = y.get(p.id)!
		shapes.push({ tone: 'rule', d: `M${LEFT - 40} ${py}L${RIGHT + 16} ${py}` })
		shapes.push({ tone: 'chip', x: 24, y: py - 13, w: Math.max(26, p.id.length * 8 + 14), h: 26 })
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
		shapes.push({ tone: m.dashed ? 'via' : 'dot', cx: f(mx), cy: a.y, r: 4 })
		labels.push({ x: f(mx), y: 22, text: String(i + 1), size: 11, tone: 'label', anchor: 'middle' })
	})

	const legend: Legend[] = participants.map((p): Legend => ({ id: p.id, label: p.label, kind: 'node' }))
	messages.forEach((m, i) => {
		for (const b of valid.filter((b) => b.first === i)) legend.push({ id: `b${i}${b.label}`, label: b.label, kind: 'block' })
		legend.push({ id: `m${i}`, label: m.text, kind: 'message', n: i + 1, from: m.from, to: m.to, dashed: m.dashed })
	})

	return { kind: 'sequence', width: WIDTH, height, shapes, labels, legend }
}

type Node = { id: string; label: string; db: boolean }

function flow(lines: string[]): Scene {
	const nodes = new Map<string, Node>()
	const edges: { from: string; to: string; label: string }[] = []
	const token = (raw: string): string => {
		const m = raw.trim().match(/^(\w+)\s*(?:\[(\()?([^\]]*?)\)?\])?$/)
		if (!m) return ''
		const id = m[1]!
		const prev = nodes.get(id)
		nodes.set(id, { id, label: m[3]?.trim() || prev?.label || id, db: !!m[2] || !!prev?.db })
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
	const R = 15
	const height = tallest * GAP + 48
	const pos = new Map<string, { x: number; y: number }>()
	columns.forEach((ids, d) => {
		const cx = max ? 48 + (d * (WIDTH - 96)) / max : WIDTH / 2
		ids.forEach((id, k) => pos.set(id, { x: cx, y: f(height / 2 + (k - (ids.length - 1) / 2) * GAP) }))
	})

	const shapes: Shape[] = []
	const labels: Label[] = []
	const named = new Set<string>()
	for (const e of edges) {
		const a = pos.get(e.from)!
		const b = pos.get(e.to)!
		const s = { x: a.x + R, y: a.y }
		const t = { x: b.x - R - 2, y: b.y }
		shapes.push({ tone: 'line', d: route([s, { x: s.x + 12, y: s.y }, { x: t.x - 12, y: t.y }, t]) }, { tone: 'line', d: arrow({ x: t.x - 10, y: t.y }, t, 6) })
		// Rótulo repetido (`W0 & W1 -->|cmpset| A`) aparece uma vez; a legenda lista todas as ligações.
		if (e.label && !named.has(e.label)) {
			named.add(e.label)
			labels.push({ x: f(t.x - 30), y: f(t.y - 8), text: e.label, size: 10, tone: 'text', anchor: 'middle' })
		}
	}
	for (const n of nodes.values()) {
		const p = pos.get(n.id)!
		shapes.push({ tone: 'chip', x: f(p.x - R), y: f(p.y - R), w: R * 2, h: R * 2 })
		if (n.db) shapes.push({ tone: 'faint', cx: p.x, cy: p.y, r: R - 4 })
		labels.push({ x: p.x, y: f(p.y + 4), text: n.id, size: n.id.length > 2 ? 9 : 11, tone: 'key', anchor: 'middle' })
	}

	const legend: Legend[] = [...nodes.values()].map((n) => ({ id: n.id, label: n.label, kind: 'node' }))
	edges.forEach((e, i) => e.label && legend.push({ id: `e${i}`, label: e.label, kind: 'message', from: e.from, to: e.to }))
	return { kind: 'flow', width: WIDTH, height, shapes, labels, legend }
}

export function tracks(mermaid: string): Scene | null {
	const lines = mermaid.split('\n').map((l) => l.trim()).filter(Boolean)
	const head = lines[0] ?? ''
	if (/^sequenceDiagram/.test(head)) return sequence(lines.slice(1))
	if (/^(flowchart|graph)\b/.test(head)) return flow(lines.slice(1))
	return null
}
