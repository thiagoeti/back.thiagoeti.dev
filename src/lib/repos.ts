import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import markdown from '../../.content/data.md?raw'

/**
 * Repositórios citados no `data.md › Projetos`, lidos no build. Ordem de procura: caminho local
 * citado no `data.md`, montagem do container (`/repos/<repo>`, ver `docker.sh`) e, por último,
 * o arquivo bruto do GitHub. Sufixo `_` no nome do repositório: em desenvolvimento (WIP).
 */
export type SourceFile = { path: string; lines: number; bytes: number; code: string }

export type RepoProject = {
	/** Pasta do projeto dentro do repositório: `php-hyperf`. */
	dir: string
	/** Caminho declarado no `data.json`: `back/php-hyperf`. */
	path: string
	name: string
	description: string
	technologies: string[]
	tags: string[]
	readme: string
	docker: string
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

type Reader = { json: () => Promise<string>; file: (dir: string, name: string) => Promise<string>; files: (dir: string) => SourceFile[] }

function localReader(root: string): Reader {
	const read = (path: string) => (existsSync(path) ? readFileSync(path, 'utf8') : '')
	return {
		json: async () => read(join(root, 'data.json')),
		file: async (dir, name) => read(join(root, dir, name)),
		files: (dir) => (existsSync(join(root, dir)) ? walk(join(root, dir)).sort((a, b) => a.path.localeCompare(b.path)) : []),
	}
}

function githubReader(owner: string, name: string): Reader {
	const base = `${RAW}/${owner}/${name}/HEAD`
	return {
		json: () => fetchRaw(`${base}/data.json`),
		file: (dir, file) => fetchRaw(`${base}/${dir}/${file}`),
		files: () => [],
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
	const list = Array.isArray(data.projects) ? (data.projects as Record<string, unknown>[]) : []
	const projects = await Promise.all(
		list.map(async (p): Promise<RepoProject | null> => {
			const path = str(p.path)
			const dir = path.split('/').filter(Boolean).at(-1) ?? ''
			if (!dir) return null
			const [readme, docker] = await Promise.all([reader.file(dir, 'README.md'), reader.file(dir, 'docker.sh')])
			return {
				dir,
				path,
				name: str(p.name) || dir,
				description: str(p.description),
				technologies: strings(p.technologies),
				tags: strings(p.tags),
				readme,
				docker,
				files: reader.files(dir),
			}
		}),
	)

	return {
		...empty,
		origin: local ? 'local' : mount ? 'mount' : 'github',
		segment: str(data.segment),
		spec: str(data.spec),
		description: str(data.description),
		total: typeof data.total === 'number' ? data.total : null,
		measured: str(data.measured),
		projects: projects.filter((p): p is RepoProject => !!p),
	}
}

export const sourceRepos: SourceRepo[] = await Promise.all(links.map(load))
