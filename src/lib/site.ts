import { meta } from './content'
import { projects, type Project } from './projects'

/** Identidade e endereços (META.md, BRAND.md); o que o `.content/meta.json` traz vem dele. */
export const SITE = {
	url: meta.canonical,
	host: new URL(meta.canonical).host,
	brand: '@thiagoeti',
	author: meta.author.name,
	role: meta.keywords.find((k) => /engineer/i.test(k)) ?? '',
	home: meta.author.url,
	github: meta.author.same_as.find((u) => u.includes('github.com')) ?? 'https://github.com/thiagoeti',
	lang: meta.lang,
	locale: meta.open_graph.locale,
	analytics: meta.analytics.google,
} as const

/** Título de página de subdomínio (BRAND.md › Nome da marca): `@thiagoeti — <página>`. */
export const pageTitle = (page: string): string => `${SITE.brand} — ${page}`

/** Menu: o mostrador e um item por projeto — mesma ordem no topo (desktop) e na base (mobile). */
export type NavItem = { href: string; project?: Project }
export const NAV: NavItem[] = [{ href: '/' }, ...projects.map((project) => ({ href: project.href, project }))]

export const isCurrent = (item: NavItem, path: string): boolean => item.href === path

export const absoluteUrl = (path: string): string => new URL(path, SITE.url).toString()

export const buildDate = (): string => new Date().toISOString().slice(0, 10)

/** Anel de foco global (THEME.md › Estados globais). */
export const focusRing =
	'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0'

/** Física única (`ease-detent`): trava de cofre. */
export const detent = 'transition duration-320 ease-detent motion-reduce:transition-none'

/**
 * Trinco — o botão do site: rótulo mono com um anel à esquerda que se fecha no hover/foco
 * (o `before` vazado ganha preenchimento). Só cor e borda mudam.
 */
export const LATCH = `group/latch inline-flex min-h-11 lg:min-h-9 items-center gap-2.5 rounded-full border border-line bg-surface-1 pl-2.5 pr-4 text-xs font-semibold uppercase tracking-wider text-fg-muted hover:border-brand/40 hover:text-fg before:size-3 before:shrink-0 before:rounded-full before:border before:border-brand before:bg-transparent hover:before:bg-brand focus-visible:before:bg-brand ${detent} ${focusRing}`

/** Trinco aceso: ação principal da tela. */
export const LATCH_KEY = `${LATCH} border-brand/40 bg-brand/10 text-brand hover:bg-brand/15`

/** Corpo de markdown renderizado (README): tipografia da família única, código e tabela no tema. */
export const PROSE =
	'text-sm leading-relaxed text-fg-muted [&_p]:my-3 [&_strong]:font-semibold [&_strong]:text-fg [&_a]:text-brand [&_a]:underline [&_a]:decoration-brand/40 [&_a]:underline-offset-4 hover:[&_a]:decoration-brand [&_code]:rounded-badge [&_code]:bg-surface-3 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[0.92em] [&_code]:text-fg [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-card [&_pre]:border [&_pre]:border-line [&_pre]:bg-surface-sunken [&_pre]:p-4 [&_pre]:text-xs [&_pre]:leading-relaxed [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1 [&_table]:my-4 [&_table]:w-full [&_table]:border-collapse [&_table]:text-xs [&_th]:border-b [&_th]:border-line [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-wider [&_th]:text-fg-subtle [&_td]:border-b [&_td]:border-line-subtle [&_td]:px-3 [&_td]:py-2 [&_td]:align-top [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-fg'
