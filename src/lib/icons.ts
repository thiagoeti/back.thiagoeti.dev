/**
 * Ícones de utilidade do catálogo (THEME.md › Ícones), aplicados como máscara sobre `bg-current`.
 * Só ecossistema, contato e navegação: conteúdo usa glifo próprio (src/lib/glyphs.ts).
 * Classe literal por ícone: o Tailwind só gera o que encontra escrito.
 */
export const ICONS = {
	'arrow-left': 'mask-[url(https://cdn.thiagoeti.dev/icons/arrow-left.svg)]',
	'arrow-right': 'mask-[url(https://cdn.thiagoeti.dev/icons/arrow-right.svg)]',
	'file-code': 'mask-[url(https://cdn.thiagoeti.dev/icons/file-code.svg)]',
	'git-branch': 'mask-[url(https://cdn.thiagoeti.dev/icons/git-branch.svg)]',
	'layout-grid': 'mask-[url(https://cdn.thiagoeti.dev/icons/layout-grid.svg)]',
	'tech-github': 'mask-[url(https://cdn.thiagoeti.dev/icons/tech-github.svg)]',
	globe: 'mask-[url(https://cdn.thiagoeti.dev/icons/globe.svg)]',
	mail: 'mask-[url(https://cdn.thiagoeti.dev/icons/mail.svg)]',
	terminal: 'mask-[url(https://cdn.thiagoeti.dev/icons/terminal.svg)]',
	'system-ai': 'mask-[url(https://cdn.thiagoeti.dev/system/ai.svg)]',
	'system-back': 'mask-[url(https://cdn.thiagoeti.dev/system/back.svg)]',
	'system-book': 'mask-[url(https://cdn.thiagoeti.dev/system/book.svg)]',
	'system-front': 'mask-[url(https://cdn.thiagoeti.dev/system/front.svg)]',
	'system-github': 'mask-[url(https://cdn.thiagoeti.dev/system/github.svg)]',
	'system-learn': 'mask-[url(https://cdn.thiagoeti.dev/system/learn.svg)]',
	'system-linkedin': 'mask-[url(https://cdn.thiagoeti.dev/system/linkedin.svg)]',
	'system-pattern': 'mask-[url(https://cdn.thiagoeti.dev/system/pattern.svg)]',
	'system-stack': 'mask-[url(https://cdn.thiagoeti.dev/system/stack.svg)]',
	'system-whatsapp': 'mask-[url(https://cdn.thiagoeti.dev/system/whatsapp.svg)]',
} as const

export type IconName = keyof typeof ICONS

/** Arquivo do ícone (para `<image>` dentro do mostrador SVG). */
export const iconUrl = (name: IconName): string => ICONS[name].match(/url\((.+)\)/)![1]!

/** Ícone do campo `icon` do `.content/data.json`; nome sem arquivo próprio usa o equivalente. */
const BY_DATA: Record<string, IconName> = {
	linkedin: 'system-linkedin',
	github: 'system-github',
	branch: 'git-branch',
	learn: 'system-learn',
	book: 'system-book',
	front: 'system-front',
	back: 'system-back',
	stack: 'system-stack',
	ai: 'system-ai',
	pattern: 'system-pattern',
	index: 'layout-grid',
	email: 'mail',
	whatsapp: 'system-whatsapp',
}
export const iconOf = (icon: string): IconName => BY_DATA[icon] ?? 'globe'
