/**
 * Geometria do diagrama (.analyse/design.md): toda ligação anda em ângulo reto — horizontal,
 * vertical, horizontal — como num mapa de topologia.
 */
export type Pt = { x: number; y: number }

export const f = (n: number): number => Math.round(n * 100) / 100

/** Ligação em ângulo reto de `a` a `b`, virando na coluna `mid` (padrão: meio do caminho). */
export function elbow(a: Pt, b: Pt, mid = (a.x + b.x) / 2): string {
	if (a.y === b.y) return `L${f(b.x)} ${f(b.y)}`
	return `L${f(mid)} ${f(a.y)}L${f(mid)} ${f(b.y)}L${f(b.x)} ${f(b.y)}`
}

/** Caminho em ângulo reto por uma sequência de pontos. */
export function route(points: Pt[]): string {
	const [first, ...rest] = points
	if (!first) return ''
	let d = `M${f(first.x)} ${f(first.y)}`
	let prev = first
	for (const p of rest) {
		d += elbow(prev, p)
		prev = p
	}
	return d
}

/** Seta na ponta de um segmento reto (direção de `a` para `b`). */
export function arrow(a: Pt, b: Pt, size = 6): string {
	const len = Math.hypot(b.x - a.x, b.y - a.y) || 1
	const ux = (b.x - a.x) / len
	const uy = (b.y - a.y) / len
	const bx = b.x - ux * size
	const by = b.y - uy * size
	return `M${f(bx - uy * size * 0.6)} ${f(by + ux * size * 0.6)}L${f(b.x)} ${f(b.y)}L${f(bx + uy * size * 0.6)} ${f(by - ux * size * 0.6)}`
}
