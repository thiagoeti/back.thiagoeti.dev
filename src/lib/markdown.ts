import { createSatteriMarkdownProcessor } from '@astrojs/markdown-satteri'

/**
 * Markdown do README renderizado no build. O processador é criado uma vez — o Shiki carrega
 * gramática e tema na construção. Saída sem `style` inline (STACK.md): a cor de cada token vira
 * classe Tailwind dentro de 2 cores + 1 acento.
 */
let processor: Awaited<ReturnType<typeof createSatteriMarkdownProcessor>> | null = null

export async function renderMarkdown(markdown: string): Promise<string> {
	if (!markdown.trim()) return ''
	processor ??= await createSatteriMarkdownProcessor({
		gfm: true,
		shikiConfig: { theme: 'github-dark-default', wrap: false },
	})
	const { code } = await processor.render(markdown)
	return sanitize(withoutInlineStyle(code))
}

/** Token do tema `github-dark-default` → luz ou acento. Escrito por extenso para o Tailwind gerar. */
const TOKEN: Record<string, string> = {
	'#e6edf3': 'text-fg',
	'#ff7b72': 'text-fg',
	'#d2a8ff': 'text-fg',
	'#a5d6ff': 'text-brand',
	'#79c0ff': 'text-brand',
	'#7ee787': 'text-brand',
	'#ffa657': 'text-fg-muted',
	'#8b949e': 'text-fg-subtle',
}

function withoutInlineStyle(html: string): string {
	return html
		.replace(/<pre class="([^"]*)" style="[^"]*"/g, '<pre class="$1 text-fg"')
		.replace(/ style="color:(#[0-9a-f]{6})(;font-weight:bold)?[^"]*"/gi, (_, hex: string, bold?: string) => ` class="${TOKEN[hex.toLowerCase()] ?? 'text-fg-muted'}${bold ? ' font-semibold' : ''}"`)
		.replace(/ style="[^"]*"/g, '')
}

/** Sem script, estilo, quadro nem evento; link externo abre em nova aba (LAYOUT.md › Navegação). */
function sanitize(html: string): string {
	return html
		.replace(/<(script|style|iframe|object|embed|noscript|template)\b[\s\S]*?<\/\1\s*>/gi, '')
		.replace(/\s(on[a-z]+)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
		.replace(/(\s(?:href|src)\s*=\s*["']?)\s*(?:javascript|vbscript|data:text\/html)[^"'\s>]*/gi, '$1#')
		.replace(/<a href="(https?:\/\/[^"]+)"(?![^>]*\btarget=)/g, '<a href="$1" target="_blank" rel="noopener"')
}

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Trecho curto (passo, célula, cenário): `código`, **negrito** e [link](url), sem parágrafo. */
export function inline(text: string): string {
	return text
		.split('`')
		.map((piece, i) =>
			i % 2
				? `<code>${escape(piece)}</code>`
				: escape(piece)
						.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
						.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>'),
		)
		.join('')
}
