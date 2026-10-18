import { projects } from './projects'
import { sourceRepos } from './repos'

/**
 * Elevação do rack (.analyse/design.md › Gramática): a capa é a frente de um rack de 19" e tudo nela
 * ocupa um número inteiro de U. A numeração desce do alto, como na etiqueta do poste: o primeiro
 * painel tem o U mais alto. Ordem fixa — chapa de identificação, patch panel, bandeja de cabos, um
 * servidor por projeto, uma gaveta de discos por repositório, a régua de tomadas e o switch.
 */
export type UnitKind = 'nameplate' | 'patch' | 'tray' | 'server' | 'storage' | 'pdu' | 'switch'

export type Unit = {
	kind: UnitKind
	/** Altura em U. */
	size: number
	/** U do alto e de baixo do painel: `20` e `18`. */
	top: number
	bottom: number
	/** Servidor: slug do projeto; gaveta: nome do repositório. */
	key?: string
}

const SIZE: Record<UnitKind, number> = { nameplate: 3, patch: 2, tray: 1, server: 2, storage: 2, pdu: 2, switch: 3 }

const order: { kind: UnitKind; key?: string }[] = [
	{ kind: 'nameplate' },
	{ kind: 'patch' },
	{ kind: 'tray' },
	...projects.map((p) => ({ kind: 'server' as const, key: p.slug })),
	...sourceRepos.map((r) => ({ kind: 'storage' as const, key: r.name })),
	{ kind: 'pdu' },
	{ kind: 'switch' },
]

/** Altura total do rack em U. */
export const HEIGHT = order.reduce((s, u) => s + SIZE[u.kind], 0)

export const units: Unit[] = (() => {
	let top = HEIGHT
	return order.map((u) => {
		const size = SIZE[u.kind]
		const unit = { ...u, size, top, bottom: top - size + 1 }
		top -= size
		return unit
	})
})()

export const unitOf = (kind: UnitKind, key?: string): Unit => units.find((u) => u.kind === kind && u.key === key)!

/** `U14–13` ou `U5`. */
export const slot = (u: Unit): string => (u.size > 1 ? `U${u.top}–${u.bottom}` : `U${u.top}`)
