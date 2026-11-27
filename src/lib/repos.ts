import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import markdown from '../../.content/data.md?raw'

/**
 * Repositórios citados no `data.md › Projetos`, lidos no build. Ordem de procura: caminho local
 * citado no `data.md`, montagem do container (`/repos/<repo>`, ver `docker.sh`) e, por último,
 * o arquivo bruto do GitHub. Sufixo `_` no nome do repositório: em desenvolvimento (WIP).
 * Um projeto é uma pasta com o próprio `data.json` (a ficha); pasta sem `data.json` fica fora. Do `data.json` da raiz
 * valem segmento, descrição e medição; o catálogo `projects[]` da raiz só vale quando não há pasta para listar (GitHub).
 */
export type SourceFile = { path: string; lines: number; bytes: number; code: string }

export type RepoProject = {
	/** Pasta do projeto dentro do repositório: `php-hyperf`. */
	dir: string
	/** Repositório publicado e pasta: `back/php-hyperf`. */
	path: string
	name: string
	description: string
	technologies: string[]
	tags: string[]
	readme: string
	/** Script do container: `docker.sh` ou, no runtime, `<pasta>.sh` (`node.sh`); vazio quando não há. */
	script: string
	/** Conteúdo do script do container. */
	docker: string
	/** * Endereços da ficha (`data.json`): framework, biblioteca, site, documentação, MCP, pasta publicada e perfil. */
	refs: { framework: string; library: string; link: string; docs: string; mcp: string; project: string; github: string }
	/** IDs do Context7: `/hyperf/hyperf`. */
	context7: string[]
	/** Skills da ficha, em URL. */
	skills: string[]
	/** Pastas de projetos relacionados: `php-swoole`. */
	related: string[]
	/** Arquivos da pasta, sem o README; vazio quando lido do GitHub. */
	files: SourceFile[]
}

export type SourceRepo = {
	label: string
	url: string
	owner: string
	name: string
	wip: boolean
	/** De onde veio: pasta local, montagem do container, GitHub ou nada. */
	origin: 'local' | 'mount' | 'github' | 'none'
	/** Campos da raiz do `data.json` do repositório. */
	segment: string
	spec: string
	description: string
	total: number | null
	measured: string
	projects: RepoProject[]
}

const MOUNT = '/repos'
const RAW = 'https://raw.githubusercontent.com'
const TIMEOUT_MS = 8_000

const section = markdown.split(/^## /m).find((s) => /github\.com\//.test(s)) ?? ''
const links = [...section.matchAll(/\[([^\]]+)\]\((https:\/\/github\.com\/([^/)]+)\/([^/)]+))\)/g)]
const paths = [...section.matchAll(/`(\/[^`]+)`/g)].map((m) => m[1]!)

/**
 * Repositório vizinho pelo nome (`skills`, `skills_`): ao lado das pastas locais citadas no `data.md`
 * ou na montagem do container. Sem pasta, `undefined`.
 */
export const localRepo = (repo: string): string | undefined =>
	[...new Set(paths.map((p) => join(p, '..', repo))), join(MOUNT, repo)].find((p) => existsSync(p))

/** Arquivo bruto do GitHub, sem token; falha vira texto vazio. */
export const raw = (owner: string, repo: string, path: string) => fetchRaw(`${RAW}/${owner}/${repo}/HEAD/${path}`)

const strings = (value: unknown): string[] => (Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string' && !!v.trim()) : [])
const str = (value: unknown): string => (typeof value === 'string' ? value.trim() : '')

const IGNORE = /(^|\/)(\.git|\.claude|node_modules|vendor)(\/|$)/

function walk(root: string, dir = root): SourceFile[] {
	return readdirSync(dir, { withFileTypes: true }).flatMap((entry): SourceFile[] => {
		const file = join(dir, entry.name)
		const path = relative(root, file)
		if (IGNORE.test(path)) return []
		if (entry.isDirectory()) return walk(root, file)
		if (!entry.isFile() || entry.name === 'README.md') return []
		const code = readFileSync(file, 'utf8')
		return [{ path, lines: code.trimEnd().split('\n').length, bytes: statSync(file).size, code }]
	})
}

async function fetchRaw(url: string): Promise<string> {
	try {
		const response = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) })
		return response.ok ? await response.text() : ''
	} catch {
		return ''
	}
}

type Reader = {
	json: () => Promise<string>
	file: (dir: string, name: string) => Promise<string>
	files: (dir: string) => SourceFile[]
	/** Pastas com o próprio `data.json`, em ordem; vazio quando lido do GitHub. */
	dirs: () => string[]
}

function localReader(root: string): Reader {
	const read = (path: string) => (existsSync(path) ? readFileSync(path, 'utf8') : '')
	return {
		json: async () => read(join(root, 'data.json')),
		file: async (dir, name) => read(join(root, dir, name)),
		files: (dir) => (existsSync(join(root, dir)) ? walk(join(root, dir)).sort((a, b) => a.path.localeCompare(b.path)) : []),
		dirs: () =>
			readdirSync(root, { withFileTypes: true })
				.filter((d) => d.isDirectory() && !d.name.startsWith('.') && existsSync(join(root, d.name, 'data.json')))
				.map((d) => d.name)
				.sort(),
	}
}

function githubReader(owner: string, name: string): Reader {
	const base = `${RAW}/${owner}/${name}/HEAD`
	return {
		json: () => fetchRaw(`${base}/data.json`),
		file: (dir, file) => fetchRaw(`${base}/${dir}/${file}`),
		files: () => [],
		dirs: () => [],
	}
}

async function load([, label = '', url = '', owner = '', name = '']: RegExpMatchArray): Promise<SourceRepo> {
	const local = paths.find((p) => p.split('/').at(-1) === name && existsSync(p))
	const mount = existsSync(join(MOUNT, name)) ? join(MOUNT, name) : undefined
	const root = local ?? mount
	const reader = root ? localReader(root) : githubReader(owner, name)
	const empty: SourceRepo = { label, url, owner, name, wip: name.endsWith('_'), origin: 'none', segment: '', spec: '', description: '', total: null, measured: '', projects: [] }

	const json = await reader.json()
	if (!json) {
		if (!root) console.warn(`[repos] ${name}: sem pasta local nem data.json no GitHub`)
		return { ...empty, origin: root ? (local ? 'local' : 'mount') : 'none' }
	}

	const data = JSON.parse(json) as Record<string, unknown>
	const published = name.replace(/_+$/, '')
	const folders = reader.dirs()
	const legacy = Array.isArray(data.projects) ? (data.projects as Record<string, unknown>[]) : []
	const entries: { dir: string; path: string; p: Record<string, unknown> }[] = folders.length
		? await Promise.all(folders.map(async (dir) => ({ dir, path: `${published}/${dir}`, p: JSON.parse(await reader.file(dir, 'data.json')) as Record<string, unknown> })))
		: legacy.map((p) => ({ dir: str(p.path).split('/').filter(Boolean).at(-1) ?? '', path: str(p.path), p }))
	const projects = await Promise.all(
		entries.map(async ({ dir, path, p }): Promise<RepoProject | null> => {
			if (!dir) return null
			const [readme, compose, runtime] = await Promise.all([reader.file(dir, 'README.md'), reader.file(dir, 'docker.sh'), reader.file(dir, `${dir}.sh`)])
			const script = compose ? 'docker.sh' : runtime ? `${dir}.sh` : ''
			return {
				dir,
				path,
				name: str(p.title) || str(p.name) || dir,
				description: str(p.description),
				technologies: strings(p.technologies),
				tags: strings(p.tags),
				readme,
				script,
				docker: compose || runtime,
				refs: { framework: str(p.framework), library: str(p.library), link: str(p.link), docs: str(p.docs), mcp: str(p.mcp), project: str(p.project), github: str(p.github) },
				context7: strings(p.context7),
				skills: strings(p.skills),
				related: strings(p.related),
				files: reader.files(dir),
			}
		}),
	)

	const list = projects.filter((p): p is RepoProject => !!p)
	return {
		...empty,
		origin: local ? 'local' : mount ? 'mount' : 'github',
		segment: str(data.segment),
		spec: str(data.spec),
		description: str(data.description),
		measured: str(data.measured),
		projects: list,
		total: typeof data.total === 'number' ? data.total : list.length,
	}
}

export const sourceRepos: SourceRepo[] = await Promise.all(links.map(load))
