/**
 * Leitura do README de cada projeto. Todos seguem o mesmo roteiro — Diagrama, Cenário,
 * Como funciona, Executar, Skills, Trade-offs — e cada parte vira uma prancha. Seção fora
 * do roteiro entra como prancha genérica, na ordem em que aparece.
 */
export type Part = { title: string; body: string }

export type Table = { head: string[]; rows: string[][] }

export type Readme = {
	title: string
	intro: string
	parts: Part[]
	diagram: string
	scenario: string
	steps: string[]
	/** Bloco de comandos de `## Executar`, sem a cerca. */
	run: string
	/** Linha `Saída:` de `## Executar`, sem o rótulo. */
	output: string
	skills: Table
	tradeoffs: Table
}

export const KNOWN = ['Diagrama', 'Cenário', 'Como funciona', 'Executar', 'Skills', 'Trade-offs'] as const
export type Known = (typeof KNOWN)[number]

export const knownOf = (title: string): Known | undefined => KNOWN.find((k) => title.startsWith(k))

const cells = (row: string) => row.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim())

export function table(body: string): Table {
	const rows = body.split('\n').filter((l) => l.trim().startsWith('|'))
	return { head: rows[0] ? cells(rows[0]) : [], rows: rows.slice(2).map(cells) }
}

export function parseReadme(markdown: string): Readme {
	const title = markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? ''
	const chunks = markdown.split(/^##\s+/m)
	const intro = chunks[0]!.replace(/^#\s+.+$/m, '').trim()
	const parts = chunks.slice(1).map((chunk): Part => {
		const [head = '', ...rest] = chunk.split('\n')
		return { title: head.trim(), body: rest.join('\n').trim() }
	})
	const part = (k: Known) => parts.find((p) => knownOf(p.title) === k)?.body ?? ''
	const run = part('Executar')

	return {
		title,
		intro,
		parts,
		diagram: part('Diagrama').match(/```mermaid\n([\s\S]*?)```/)?.[1]?.trim() ?? '',
		scenario: part('Cenário'),
		steps: part('Como funciona')
			.split('\n')
			.filter((l) => /^\d+\.\s/.test(l))
			.map((l) => l.replace(/^\d+\.\s*/, '').trim()),
		run: run.match(/```\w*\n([\s\S]*?)```/)?.[1]?.trimEnd() ?? '',
		output: run.match(/^Saída:\s*(.+)$/m)?.[1]?.trim() ?? '',
		skills: table(part('Skills')),
		tradeoffs: table(part('Trade-offs')),
	}
}
