import { meta } from './content'
import { projects, type Project } from './projects'

/** Identidade e endereços (META.md, BRAND.md); o que o `.content/meta.json` traz vem dele. */
export const SITE = {
	url: meta.canonical,
	host: new URL(meta.canonical).host,
	brand: '@thiagoeti',
	author: meta.author.name,
	/** Papéis da marca (BRAND.md › Nome da marca): as palavras-chave que começam por sigla (`AI …`, `FDE - …`), na ordem do `meta.json`. */
	role: meta.keywords.filter((k) => /^[A-Z]{2,}\b/.test(k)).join(' - '),
	home: meta.author.url,
	github: meta.author.same_as.find((u) => u.includes('github.com')) ?? 'https://github.com/thiagoeti',
	linkedin: meta.author.same_as.find((u) => u.includes('linkedin.com')) ?? '',
	lang: meta.lang,
	locale: meta.open_graph.locale,
	analytics: meta.analytics.google,
} as const

/** Título de página de subdomínio (BRAND.md › Nome da marca): `@thiagoeti — <página>`. */
export const pageTitle = (page: string): string => `${SITE.brand} — ${page}`

/** Menu: todos os projetos e um item por projeto — mesma ordem no topo (desktop) e na base (mobile). */
export type NavItem = { href: string; project?: Project }
export const NAV: NavItem[] = [{ href: '/' }, ...projects.map((project) => ({ href: project.href, project }))]

export const isCurrent = (item: NavItem, path: string): boolean => item.href === path

export const absoluteUrl = (path: string): string => new URL(path, SITE.url).toString()

export const buildDate = (): string => new Date().toISOString().slice(0, 10)

/** Anel de foco global (THEME.md › Estados globais). */
export const focusRing =
	'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0'

/** Transição padrão (THEME.md › Motion): só cor, borda e opacidade. */
export const motion = 'transition-colors duration-150 motion-reduce:transition-none'

/** Botões (THEME.md › Botão); `min-h-11` no toque, `h-9` no desktop. */
const BTN = `min-h-11 px-4
	inline-flex items-center justify-center gap-1.5
	text-xs font-semibold uppercase tracking-wider rounded-control
	lg:min-h-9
	disabled:opacity-40 disabled:pointer-events-none
	${motion}
	${focusRing}`
export const BUTTON = `${BTN} bg-brand text-surface-0 hover:bg-brand-hover`
export const SECONDARY = `${BTN} bg-transparent text-fg border border-line hover:bg-white/5`
export const INLINE_BUTTON = `min-h-11 px-2.5
	inline-flex items-center gap-1.5
	text-xs font-semibold uppercase tracking-wider text-fg-muted rounded-control border border-line
	lg:min-h-7
	hover:text-fg hover:border-line-strong
	${motion}
	${focusRing}`

/** Superfícies (THEME.md › Card Base, Chart Container, Feature Card). */
export const CARD = 'bg-surface-1 rounded-card border border-line'
export const PANEL = 'bg-surface-1 rounded-panel border border-line shadow-panel'

/** Corpo de markdown renderizado (README): texto em Inter, código em JetBrains Mono, tabela no tema; link e bloco de código (`tabindex` do Shiki) com o anel de foco global. */
export const PROSE =
	`text-sm leading-relaxed text-fg-muted
		hover:[&_a]:decoration-brand [&_p]:my-3 [&_strong]:font-semibold [&_strong]:text-fg [&_a]:underline [&_a]:decoration-brand/40 [&_a]:underline-offset-4 [&_a]:text-brand [&_a]:focus-visible:outline-none [&_a]:focus-visible:ring-2 [&_a]:focus-visible:ring-brand/40 [&_a]:focus-visible:ring-offset-2 [&_a]:focus-visible:ring-offset-surface-0 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.88em] [&_code]:bg-surface-3 [&_code]:text-fg [&_code]:rounded-badge [&_pre]:my-4 [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:font-mono [&_pre]:text-xs [&_pre]:leading-relaxed [&_pre]:bg-surface-sunken [&_pre]:border [&_pre]:border-line [&_pre]:focus-visible:outline-none [&_pre]:focus-visible:ring-2 [&_pre]:focus-visible:ring-brand/40 [&_pre]:focus-visible:ring-offset-2 [&_pre]:focus-visible:ring-offset-surface-0 [&_pre_code]:p-0 [&_pre_code]:bg-transparent [&_ol]:my-3 [&_ol]:pl-5 [&_ol]:list-decimal [&_ul]:my-3 [&_ul]:pl-5 [&_ul]:list-disc [&_li]:my-1 [&_table]:w-full [&_table]:my-4 [&_table]:text-xs [&_table]:border-collapse [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-medium [&_th]:text-fg-subtle [&_th]:border-b [&_th]:border-line [&_td]:px-3 [&_td]:py-2 [&_td]:align-top [&_td]:border-b [&_td]:border-line-subtle [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-fg`

/** Código e link inline em trecho curto (passo, célula, legenda); link com o anel de foco global. */
export const INLINE_CODE = '[&_code]:px-1 [&_code]:font-mono [&_code]:text-[0.88em] [&_code]:bg-surface-3 [&_code]:text-fg [&_code]:rounded-badge [&_a]:focus-visible:outline-none [&_a]:focus-visible:ring-2 [&_a]:focus-visible:ring-brand/40 [&_a]:focus-visible:ring-offset-2 [&_a]:focus-visible:ring-offset-surface-0'
