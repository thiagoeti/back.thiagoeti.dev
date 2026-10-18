/**
 * Regra geométrica única (.analyse/design.md › Gramática): traçado octilinear — todo traço é
 * horizontal, vertical ou a 45° — sobre grade de 8 unidades; todo nó é um círculo.
 * Mapa, faixas de linha, diagramas e glifos saem destas funções.
 */
export type Pt = { x: number; y: number }

export const f = (n: number): number => Math.round(n * 100) / 100

/** Encaixa na grade de 8. */
export const snap = (n: number): number => Math.round(n / 8) * 8

/**
 * Ligação octilinear de `a` a `b`: reta quando alinhados; senão reta, diagonal a 45° e reta,
 * com a diagonal centrada. Desnível maior que o avanço vira trecho vertical no meio.
 */
export function connector(a: Pt, b: Pt): string {
	const dx = b.x - a.x
	const dy = b.y - a.y
	if (!dy || !dx) return `L${f(b.x)} ${f(b.y)}`
	const sx = Math.sign(dx)
	const sy = Math.sign(dy)
	if (Math.abs(dy) <= Math.abs(dx)) {
		const m = (Math.abs(dx) - Math.abs(dy)) / 2
		return `L${f(a.x + sx * m)} ${f(a.y)}L${f(b.x - sx * m)} ${f(b.y)}L${f(b.x)} ${f(b.y)}`
	}
	const m = (Math.abs(dy) - Math.abs(dx)) / 2
	return `L${f(a.x)} ${f(a.y + sy * m)}L${f(b.x)} ${f(b.y - sy * m)}L${f(b.x)} ${f(b.y)}`
}

/** Caminho octilinear por uma sequência de pontos. */
export function route(points: Pt[]): string {
	const [first, ...rest] = points
	if (!first) return ''
	let d = `M${f(first.x)} ${f(first.y)}`
	let prev = first
	for (const p of rest) {
		d += connector(prev, p)
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
