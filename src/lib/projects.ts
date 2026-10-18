import { parseDocker, SHIELD, type Docker } from './docker'
import { parseReadme, type Readme } from './readme'
import { sourceRepos, type RepoProject, type SourceFile, type SourceRepo } from './repos'

/**
 * Projetos publicados: todos os repositórios do `data.md`, na ordem citada. Mesma pasta em dois
 * repositórios: vale o primeiro (o estável vem antes do `_`). Nada aqui é texto de conteúdo.
 * No rack, cada projeto é um servidor e cada tag uma porta numerada do patch panel.
 */
export type Project = Omit<RepoProject, 'docker'> & {
	slug: string
	href: string
	index: number
	/** Número do servidor: `1`, `2`… */
	number: number
	/** `01`, `02`… — como vai gravado na chapa. */
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
	const docker = parseDocker(p.docker)
	const blob = `${repo.url}/blob/HEAD/${p.dir}`
	return {
		...p,
		slug: p.dir,
		href: `/${p.dir}`,
		index,
		number: index + 1,
		serial: String(index + 1).padStart(2, '0'),
		title,
		subtitle: rest.join(' — '),
		short: title.split(/[\s+]+/).filter(Boolean).at(-1) ?? title,
		wip: repo.wip,
		repo,
		github: { folder: `${repo.url}/tree/HEAD/${p.dir}`, readme: `${blob}/README.md`, docker: `${blob}/docker.sh` },
		doc: parseReadme(p.readme),
		docker,
		armor: SHIELD.filter((k) => docker.shield[k]).length,
		lines: p.files.reduce((s, f) => s + f.lines, 0),
		bytes: p.files.reduce((s, f) => s + f.bytes, 0),
		sources: p.files,
	}
})

export const bySlug = (slug: string) => projects.find((p) => p.slug === slug)

export type Tag = { name: string; count: number; servers: number[]; port: number; label: string }

/** Tags na ordem da primeira aparição: a porta de cada uma no patch panel (`01`…), quantos servidores liga e quais. */
export const tags: Tag[] = (() => {
	const map = new Map<string, number[]>()
	for (const p of projects) for (const t of p.tags) map.set(t, [...(map.get(t) ?? []), p.number])
	return [...map].map(([name, servers], i) => ({ name, count: servers.length, servers, port: i + 1, label: String(i + 1).padStart(2, '0') }))
})()

/** Tags que mais de um servidor tem: cabos que cruzam o rack. */
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
