/**
 * Papéis de traço dos desenhos em SVG (diagrama do README): cada forma tem um papel e cada papel uma
 * classe em `src/styles/global.css` (`glyph-*`). O diagrama é desenhado como topologia
 * (.analyse/design.md): fundo pontilhado, nó com halo, ligação em ângulo reto.
 */
export type Tone = 'rule' | 'line' | 'dash' | 'node' | 'dot' | 'zone'

export const TONE: Record<Tone, string> = {
	rule: 'glyph-rule',
	line: 'glyph-line',
	dash: 'glyph-dash',
	node: 'glyph-node',
	dot: 'glyph-dot',
	zone: 'glyph-zone',
}

export type Shape = { tone: Tone; d?: string; cx?: number; cy?: number; r?: number; x?: number; y?: number; w?: number; h?: number }
