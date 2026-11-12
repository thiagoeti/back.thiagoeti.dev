/**
 * Ícones de utilidade do catálogo (THEME.md › Ícones), aplicados como máscara sobre `bg-current`.
 * Ecossistema, contato, navegação e o logo oficial de cada tecnologia (`tech-*`); diagrama usa glifo próprio (src/lib/glyphs.ts).
 * Classe literal por ícone: o Tailwind só gera o que encontra escrito.
 */
export const ICONS = {
	'arrow-left': 'mask-[url(https://cdn.thiagoeti.dev/icons/arrow-left.svg)]',
	'arrow-right': 'mask-[url(https://cdn.thiagoeti.dev/icons/arrow-right.svg)]',
	'file-code': 'mask-[url(https://cdn.thiagoeti.dev/icons/file-code.svg)]',
	'git-branch': 'mask-[url(https://cdn.thiagoeti.dev/icons/git-branch.svg)]',
	'layout-grid': 'mask-[url(https://cdn.thiagoeti.dev/icons/layout-grid.svg)]',
	'tech-github': 'mask-[url(https://cdn.thiagoeti.dev/icons/tech-github.svg)]',
	'tech-bun': 'mask-[url(https://cdn.thiagoeti.dev/icons/tech-bun.svg)]',
	'tech-fastapi': 'mask-[url(https://cdn.thiagoeti.dev/icons/tech-fastapi.svg)]',
	'tech-laravel': 'mask-[url(https://cdn.thiagoeti.dev/icons/tech-laravel.svg)]',
	'tech-php': 'mask-[url(https://cdn.thiagoeti.dev/icons/tech-php.svg)]',
	'tech-pydantic': 'mask-[url(https://cdn.thiagoeti.dev/icons/tech-pydantic.svg)]',
	'tech-python': 'mask-[url(https://cdn.thiagoeti.dev/icons/tech-python.svg)]',
	'tech-sqlite': 'mask-[url(https://cdn.thiagoeti.dev/icons/tech-sqlite.svg)]',
	'tech-typescript': 'mask-[url(https://cdn.thiagoeti.dev/icons/tech-typescript.svg)]',
	'chart-activity': 'mask-[url(https://cdn.thiagoeti.dev/icons/chart-activity.svg)]',
	'chart-bar': 'mask-[url(https://cdn.thiagoeti.dev/icons/chart-bar.svg)]',
	'code-xml': 'mask-[url(https://cdn.thiagoeti.dev/icons/code-xml.svg)]',
	clock: 'mask-[url(https://cdn.thiagoeti.dev/icons/clock.svg)]',
	container: 'mask-[url(https://cdn.thiagoeti.dev/icons/container.svg)]',
	cpu: 'mask-[url(https://cdn.thiagoeti.dev/icons/cpu.svg)]',
	layers: 'mask-[url(https://cdn.thiagoeti.dev/icons/layers.svg)]',
	network: 'mask-[url(https://cdn.thiagoeti.dev/icons/network.svg)]',
	repeat: 'mask-[url(https://cdn.thiagoeti.dev/icons/repeat.svg)]',
	search: 'mask-[url(https://cdn.thiagoeti.dev/icons/search.svg)]',
	zap: 'mask-[url(https://cdn.thiagoeti.dev/icons/zap.svg)]',
	globe: 'mask-[url(https://cdn.thiagoeti.dev/icons/globe.svg)]',
	menu: 'mask-[url(https://cdn.thiagoeti.dev/icons/menu.svg)]',
	close: 'mask-[url(https://cdn.thiagoeti.dev/icons/close.svg)]',
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

/** Logo oficial da tecnologia (Simple Icons, catálogo `tech-*`); sem logo, `undefined` e vale o desenho do vocabulário (techglyph.ts). */
const BY_TECH: Record<string, IconName> = {
	bun: 'tech-bun',
	fastapi: 'tech-fastapi',
	laravel: 'tech-laravel',
	php: 'tech-php',
	pydantic: 'tech-pydantic',
	python: 'tech-python',
	sqlite: 'tech-sqlite',
	typescript: 'tech-typescript',
}
export const techIconOf = (tech: string): IconName | undefined => BY_TECH[tech.toLowerCase().replace(/[^a-z0-9]/g, '')]
