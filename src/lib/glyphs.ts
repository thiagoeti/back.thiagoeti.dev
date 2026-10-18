/**
 * Papéis de traço dos desenhos em SVG (diagrama do README, mapa do chassi e cartões): cada forma tem
 * um papel e cada papel uma classe em `src/styles/global.css` (`glyph-*`). Gramática do rack
 * (.analyse/design.md): trilha fina da placa, chip com cantos vivos, via vazada, trilha ligada no acento.
 */
export type Tone = 'rule' | 'line' | 'dash' | 'chip' | 'via' | 'dot' | 'key' | 'zone' | 'faint'

export const TONE: Record<Tone, string> = {
	rule: 'glyph-rule',
	line: 'glyph-line',
	dash: 'glyph-dash',
	chip: 'glyph-chip',
	via: 'glyph-via',
	dot: 'glyph-dot',
	key: 'glyph-key',
	zone: 'glyph-zone',
	faint: 'glyph-faint',
}

export type Shape = { tone: Tone; d?: string; cx?: number; cy?: number; r?: number; x?: number; y?: number; w?: number; h?: number }
