import { parseDocker, SHIELD, type Docker } from './docker'
import { parseReadme, type Readme } from './readme'
import { sourceRepos, type RepoProject, type SourceFile, type SourceRepo } from './repos'

/**
 * Projetos publicados: todos os repositórios do `data.md`, na ordem citada. Mesma pasta em dois
 * repositórios: vale o primeiro (o estável vem antes do `_`). Nada aqui é texto de conteúdo.
 * Cada projeto é um nó da malha (.analyse/design.md).
 */
export type Project = Omit<RepoProject, 'docker'> & {
	slug: string
	href: string
	index: number
	/** Ordem na lista: `1`, `2`… */
	number: number
	/** Nome antes do travessão: `PHP Hyperf`. */
	title: string
	/** Nome depois do travessão: `PIX concorrente com corrotinas`. */
	subtitle: string
	/** Última palavra do título: rótulo curto do menu (`Hyperf`). */
	short: string
	wip: boolean
	repo: SourceRepo
	/** Endereços no GitHub, pela pasta publicada da ficha (`project`); `docker` vazio quando a pasta não tem script de container. */
	github: { folder: string; readme: string; docker: string }
	doc: Readme
	docker: Docker
	/** Flags de segurança presentes, de `SHIELD.length`. */
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
	const lines = p.files.reduce((s, f) => s + f.lines, 0)
	const docker = parseDocker(p.docker)
	const folder = p.refs.project || `${repo.url}/tree/HEAD/${p.dir}`
	const blob = folder.replace('/tree/', '/blob/')
	return {
		...p,
		slug: p.dir,
		href: `/${p.dir}`,
		index,
		number: index + 1,
		title,
		subtitle: rest.join(' — '),
		short: title.split(/[\s+]+/).filter(Boolean).at(-1) ?? title,
		wip: repo.wip,
		repo,
		github: { folder, readme: `${blob}/README.md`, docker: p.script ? `${blob}/${p.script}` : '' },
		doc: parseReadme(p.readme),
		docker,
		armor: SHIELD.filter((k) => docker.shield[k]).length,
		lines,
		bytes: p.files.reduce((s, f) => s + f.bytes, 0),
		sources: p.files,
	}
})

export const bySlug = (slug: string) => projects.find((p) => p.slug === slug)

/** Projetos relacionados da ficha (`related`), na ordem citada; pasta sem projeto publicado fica fora. */
export const relatedOf = (p: Project): Project[] => p.related.map(bySlug).filter((x): x is Project => !!x && x.slug !== p.slug)

export type Tag = { name: string; count: number; projects: string[] }

/** Tags da que mais projetos tem para a que menos tem; empate fica na ordem da primeira aparição. */
export const tags: Tag[] = (() => {
	const map = new Map<string, string[]>()
	for (const p of projects) for (const t of p.tags) map.set(t, [...(map.get(t) ?? []), p.slug])
	return [...map].map(([name, list]) => ({ name, count: list.length, projects: list })).sort((a, b) => b.count - a.count)
})()

/** Tags que mais de um projeto tem. */
export const shared: Tag[] = tags.filter((t) => t.count > 1)

export const tagOf = (name: string) => tags.find((t) => t.name === name)

/** Tecnologias distintas de todos os projetos. */
export const technologies: string[] = [...new Set(projects.flatMap((p) => p.technologies))]

/** Indicadores da capa, medidos dos projetos. */
export const totals = {
	projects: projects.length,
	technologies: technologies.length,
	tags: tags.length,
	shared: shared.length,
	files: projects.reduce((s, p) => s + p.sources.length, 0),
	lines: projects.reduce((s, p) => s + p.lines, 0),
}

export const vicinity = (p: Project) => ({
	prev: projects[(p.index - 1 + projects.length) % projects.length]!,
	next: projects[(p.index + 1) % projects.length]!,
})
