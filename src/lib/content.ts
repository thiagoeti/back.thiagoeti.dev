import raw from '../../.content/data.json'
import md from '../../.content/data.md?raw'
import metaRaw from '../../.content/meta.json'

/**
 * Leitura do `.content/` (CONTENT.md). Nenhum texto de conteúdo nasce aqui:
 * tudo vem dos arquivos; este módulo só dá forma.
 */
export type Link = { label: string; type?: string; link?: string; value?: string; icon: string }

/** Metadados da página (`.content/meta.json`): título, descrição, imagem, Open Graph e analytics. */
export const meta = metaRaw

export type Section = { title: string; description: string }

/** Primeiro parágrafo depois de um título do `data.md`: o texto que apresenta o bloco. */
function lead(body: string): string {
	return body.split(/\n\s*\n/).map((b) => b.trim()).find((b) => b && !/^[|#\-*>]/.test(b)) ?? ''
}

/** `# Título` do `data.md` e o parágrafo que o segue. */
export const intro: Section = (() => {
	const match = md.match(/^# (.+)\n([\s\S]*?)(?=^## )/m)
	return { title: match?.[1]?.trim() ?? '', description: lead(match?.[2] ?? '') }
})()

/** Títulos `##` do `data.md`, na ordem: `Projetos`, `Dados e conteúdo`, `Ecossistema`, `Contatos`. */
export const headings: string[] = [...md.matchAll(/^## (.+)$/gm)].map((m) => m[1]!.trim())

/** Bloco do `data.md` cujo título bate com a chave do `data.json` pela posição a partir do fim. */
const keys = Object.keys(raw) as (keyof typeof raw)[]
export const titles = Object.fromEntries(keys.map((k, i) => [k, headings[headings.length - keys.length + i] ?? k])) as Record<keyof typeof raw, string>

/** Título do bloco de projetos (`## Projetos`): o primeiro `##` do `data.md`. */
export const projectsTitle = headings[0] ?? ''

export const ecosystem: Link[] = raw.ecosystem
export const contacts: Link[] = raw.contacts

/** Endereço sem protocolo nem barra final. */
export const host = (url: string): string => url.replace(/^https?:\/\//, '').replace(/\/$/, '')

const whatsapp = (value: string) => `https://wa.me/${value.replace(/\D/g, '')}`

export const linkHref = (l: Link): string => l.link ?? (l.value?.includes('@') ? `mailto:${l.value}` : whatsapp(l.value ?? ''))
export const linkText = (l: Link): string => (l.link ? host(l.link) : (l.value ?? ''))
