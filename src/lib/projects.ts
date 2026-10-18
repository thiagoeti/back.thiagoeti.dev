import { parseDocker, SHIELD, type Docker } from './docker'
import { balanceOf, cents, concurrencyOf, parseReadme, responsesOf, type Readme, type Response } from './readme'
import { sourceRepos, type RepoProject, type SourceFile, type SourceRepo } from './repos'

/**
 * Projetos publicados: todos os repositórios do `data.md`, na ordem citada. Mesma pasta em dois
 * repositórios: vale o primeiro (o estável vem antes do `_`). Nada aqui é texto de conteúdo.
 */
export type Project = Omit<RepoProject, 'docker'> & {
	slug: string
	href: string
	index: number
	/** `01`, `02`… — número do setor no mostrador. */
	serial: string
	/** Nome antes do travessão: `PHP Hyperf`. */
	title: string
	/** Nome depois do travessão: `PIX concorrente com corrotinas`. */
	subtitle: string
	/** Última palavra do título: rótulo curto do menu (`Hyperf`). */
	short: string
	wip: boolean
	repo: SourceRepo
	github: { folder: string; readme: string; docker: string }
	doc: Readme
	responses: Response[]
	ok: number
	refused: number
	balance: { initial: string; final: string }
	concurrency: number | null
	docker: Docker
	/** Flags de blindagem presentes, de `SHIELD.length`. */
	armor: number
	lines: number
	bytes: number
	sources: SourceFile[]
}

const seen = new Set<string>()
const flat = sourceRepos.flatMap((repo) =>
	repo.projects.flatMap((p) => {
		if (seen.has(p.dir)) return []
		seen.add(p.dir)
		return [{ repo, p }]
	}),
)

export const projects: Project[] = flat.map(({ repo, p }, index) => {
	const [title = p.name, ...rest] = p.name.split(/\s+—\s+/)
	const doc = parseReadme(p.readme)
	const responses = responsesOf(doc.output)
	const docker = parseDocker(p.docker)
	const tree = `${repo.url}/tree/HEAD/${p.dir}`
	const blob = `${repo.url}/blob/HEAD/${p.dir}`
	return {
		...p,
		slug: p.dir,
		href: `/${p.dir}`,
		index,
		serial: String(index + 1).padStart(2, '0'),
		title,
		subtitle: rest.join(' — '),
		short: title.split(/[\s+]+/).filter(Boolean).at(-1) ?? title,
		wip: repo.wip,
		repo,
		github: { folder: tree, readme: `${blob}/README.md`, docker: `${blob}/docker.sh` },
		doc,
		responses,
		ok: responses.filter((r) => r.code < 300).length,
		refused: responses.filter((r) => r.code >= 400).length,
		balance: balanceOf(doc.scenario, doc.output),
		concurrency: concurrencyOf(doc.scenario),
		docker,
		armor: SHIELD.filter((k) => docker.shield[k]).length,
		lines: p.files.reduce((s, f) => s + f.lines, 0),
		bytes: p.files.reduce((s, f) => s + f.bytes, 0),
		sources: p.files,
	}
})

export const bySlug = (slug: string) => projects.find((p) => p.slug === slug)

export type Tag = { name: string; count: number }

/** Tags na ordem da primeira aparição, com quantos projetos cada uma marca. */
export const tags: Tag[] = (() => {
	const count = new Map<string, number>()
	for (const p of projects) for (const t of p.tags) count.set(t, (count.get(t) ?? 0) + 1)
	return [...count].map(([name, n]) => ({ name, count: n }))
})()

/** Tecnologias distintas de todos os projetos. */
export const technologies: string[] = [...new Set(projects.flatMap((p) => p.technologies))]

/** Indicadores da capa, medidos dos projetos. */
export const totals = {
	projects: projects.length,
	technologies: technologies.length,
	tags: tags.length,
	responses: projects.reduce((s, p) => s + p.responses.length, 0),
	ok: projects.reduce((s, p) => s + p.ok, 0),
	refused: projects.reduce((s, p) => s + p.refused, 0),
	/** Saldos finais abaixo de zero entre os cenários medidos. */
	negative: projects.filter((p) => p.balance.final && (p.balance.final.includes('-') || cents(p.balance.final) < 0)).length,
	lines: projects.reduce((s, p) => s + p.lines, 0),
}

export const vicinity = (p: Project) => ({
	prev: projects[(p.index - 1 + projects.length) % projects.length]!,
	next: projects[(p.index + 1) % projects.length]!,
})
