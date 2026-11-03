import { meta } from './content'
import { projects, type Project } from './projects'

/** Identidade e endereços (META.md, BRAND.md); o que o `.content/meta.json` traz vem dele. */
export const SITE = {
	url: meta.canonical,
	host: new URL(meta.canonical).host,
	brand: '@thiagoeti',
	author: meta.author.name,
	/** Papéis da marca (BRAND.md › Nome da marca): as palavras-chave em caixa alta, na ordem do `meta.json`. */
	role: meta.keywords.filter((k) => /[A-Z]/.test(k) && k === k.toUpperCase()).join(' - '),
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
const BTN = `inline-flex min-h-11 lg:min-h-9 items-center justify-center gap-1.5 rounded-control px-4 text-xs font-semibold uppercase tracking-wider disabled:pointer-events-none disabled:opacity-40 ${motion} ${focusRing}`
export const BUTTON = `${BTN} bg-brand text-surface-0 hover:bg-brand-hover`
export const SECONDARY = `${BTN} border border-line bg-transparent text-fg hover:bg-white/5`
export const INLINE_BUTTON = `inline-flex min-h-11 lg:min-h-7 items-center gap-1.5 rounded-control border border-line px-2.5 text-xs font-semibold uppercase tracking-wider text-fg-muted hover:border-line-strong hover:text-fg ${motion} ${focusRing}`

/** Superfícies (THEME.md › Card Base, Chart Container, Feature Card). */
export const CARD = 'rounded-card border border-line bg-surface-1'
export const PANEL = 'rounded-panel border border-line bg-surface-1 shadow-panel'

/** Corpo de markdown renderizado (README): texto em Inter, código em JetBrains Mono, tabela no tema. */
export const PROSE =
	'text-sm leading-relaxed text-fg-muted [&_p]:my-3 [&_strong]:font-semibold [&_strong]:text-fg [&_a]:text-brand [&_a]:underline [&_a]:decoration-brand/40 [&_a]:underline-offset-4 hover:[&_a]:decoration-brand [&_code]:rounded-badge [&_code]:bg-surface-3 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.88em] [&_code]:text-fg [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:border [&_pre]:border-line [&_pre]:bg-surface-sunken [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-xs [&_pre]:leading-relaxed [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1 [&_table]:my-4 [&_table]:w-full [&_table]:border-collapse [&_table]:text-xs [&_th]:border-b [&_th]:border-line [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-medium [&_th]:text-fg-subtle [&_td]:border-b [&_td]:border-line-subtle [&_td]:px-3 [&_td]:py-2 [&_td]:align-top [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-fg'

/** Código inline em trecho curto (passo, célula, legenda). */
export const INLINE_CODE = '[&_code]:rounded-badge [&_code]:bg-surface-3 [&_code]:px-1 [&_code]:font-mono [&_code]:text-[0.88em] [&_code]:text-fg'
