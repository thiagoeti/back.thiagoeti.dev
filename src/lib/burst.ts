/**
 * Rajada do cenário: as respostas HTTP citadas na linha `Saída:` do README, na ordem em que aparecem.
 * `33 respostas \`201\`` vira 33 respostas; `\`201 SETTLED\`` vira uma, com o rótulo. Linha sem código
 * HTTP não gera rajada (sem dado, sem componente).
 */
export type Hit = { count: number; code: string; label: string }

export type Tone = 'success' | 'warning' | 'danger'

export type Burst = {
	hits: Hit[]
	/** Uma entrada por resposta, na ordem. */
	cells: { code: string; tone: Tone }[]
	total: number
	ok: number
	refused: number
	failed: number
	/** Rajada (muitas respostas iguais) ou sequência curta de respostas distintas. */
	kind: 'burst' | 'sequence'
}

/** `33 respostas \`201\``, `17 \`422\`` ou `\`201 SETTLED\``: contagem opcional antes do código. */
const HIT = /(?:(\d+)\s+(?:respostas?\s+)?)?`([1-5]\d{2})(?:\s+([A-Z][A-Z_]+))?`/g

export const toneOf = (code: string): Tone => (code.startsWith('2') || code.startsWith('3') ? 'success' : code.startsWith('4') ? 'warning' : 'danger')

export function parseBurst(output: string): Burst | null {
	const hits: Hit[] = [...output.matchAll(HIT)].map((m) => ({ count: Number(m[1] ?? 1), code: m[2]!, label: m[3] ?? '' }))
	if (!hits.length) return null
	const cells = hits.flatMap((h) => Array.from({ length: h.count }, () => ({ code: h.code, tone: toneOf(h.code) })))
	const count = (t: Tone) => cells.filter((c) => c.tone === t).length
	return {
		hits,
		cells,
		total: cells.length,
		ok: count('success'),
		refused: count('warning'),
		failed: count('danger'),
		kind: hits.some((h) => h.count > 1) ? 'burst' : 'sequence',
	}
}

/** Saldo final citado: `saldo … R$ 10,00` ou `saldo \`1234567\` centavos` na `Saída` ou, sem ele, no `Cenário`. */
export function finalBalance(output: string, scenario: string): string {
	const reais = (s: string) => [...s.matchAll(/[Ss]aldo[^R]{0,24}R\$\s?([\d.]+,\d{2})/g)].at(-1)?.[1] ?? ''
	const cents = (s: string) => {
		const n = [...s.matchAll(/[Ss]aldo\s+`?(\d+)`?\s+centavos/g)].at(-1)?.[1]
		return n ? (Number(n) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''
	}
	const value = reais(output) || cents(output) || reais(scenario) || cents(scenario)
	return value ? `R$ ${value}` : ''
}
