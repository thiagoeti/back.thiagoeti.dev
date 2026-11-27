import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { localRepo, raw } from './repos'

/**
 * Skills citadas na ficha (`skills` do `data.json`), com o que o próprio `SKILL.md` diz: nome e descrição do
 * frontmatter. Ordem de leitura: repositório vizinho (`skills`, depois o par em desenvolvimento `skills_`), montagem
 * do container e, por último, o arquivo bruto do GitHub. `SKILL.md` que não abriu fica só com o nome.
 */
export type Skill = {
	/** Nome da skill: `php-hyperf`. */
	name: string
	/** Família pelo prefixo do nome (`php`, `bun`, `docker`…); nome sem hífen é a própria família. */
	family: string
	/** `SKILL.md` no GitHub. */
	href: string
	/** `description` do frontmatter: quando usar. */
	description: string
}

const URL_RE = /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/[^/]+\/(.+\/SKILL\.md)$/i

/** Campo simples do frontmatter YAML (`chave: valor`, com ou sem aspas). */
function field(front: string, key: string): string {
	const line = front.split('\n').find((l) => l.startsWith(`${key}:`))
	return line?.slice(key.length + 1).trim().replace(/^(['"])(.*)\1$/, '$2') ?? ''
}

async function source(owner: string, repo: string, path: string): Promise<string> {
	for (const name of [repo, `${repo}_`]) {
		const root = localRepo(name)
		if (root && existsSync(join(root, path))) return readFileSync(join(root, path), 'utf8')
	}
	return raw(owner, repo, path)
}

const cache = new Map<string, Promise<Skill>>()

function read(href: string): Promise<Skill> {
	const [, owner = '', repo = '', path = ''] = URL_RE.exec(href) ?? []
	const folder = path.split('/').at(-2) ?? href
	return (async () => {
		const front = /^---\n([\s\S]*?)\n---/.exec(await source(owner, repo, path))?.[1] ?? ''
		const name = field(front, 'name') || folder
		return { name, family: name.split('-')[0] ?? name, href, description: field(front, 'description') }
	})()
}

/** Skills da ficha, na ordem do dado; o endereço do repositório de skills (sem `SKILL.md`) fica de fora. */
export function skillsOf(urls: string[]): Promise<Skill[]> {
	return Promise.all(
		urls
			.filter((u) => URL_RE.test(u))
			.map((u) => {
				if (!cache.has(u)) cache.set(u, read(u))
				return cache.get(u)!
			}),
	)
}

/** Repositório de skills citado na ficha: `https://github.com/thiagoeti/skills`. */
export const skillsRepo = (urls: string[]): string =>
	urls.find((u) => /^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/.test(u)) ?? urls.find((u) => URL_RE.test(u))?.replace(/\/blob\/.*$/, '') ?? ''
