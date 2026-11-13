/**
 * Capa: filtro por tag (`?tag=`) e busca (`?q=`) na vitrine; `/` foca a busca, `Esc` limpa; o nome
 * clicado vira o título da página do projeto (view transition `project`; a volta está em `base.astro`).
 * A abertura em movimento está em `src/scripts/systems.ts`.
 */
import page from '../../.analyse/page.json'

const t = page.text
const fill = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k: string) => String(v[k] ?? ''))

const cards = [...document.querySelectorAll<HTMLLIElement>('li[data-project]')]
const buttons = [...document.querySelectorAll<HTMLButtonElement>('button[data-tag]')]
const inputs = [...document.querySelectorAll<HTMLInputElement>('input[data-search]')]
const counts = [...document.querySelectorAll<HTMLElement>('[data-shown]')]
const empty = document.querySelector<HTMLElement>('[data-empty]')
const tagsOf = (el: HTMLElement) => (el.dataset.tags ?? '').split(' ').filter(Boolean)

let tag = ''
let query = ''

function apply() {
	const q = query.trim().toLowerCase()
	let shown = 0
	for (const c of cards) {
		const match = (!tag || tagsOf(c).includes(tag)) && (!q || (c.dataset.search ?? '').includes(q))
		c.toggleAttribute('data-off', !match)
		if (match) shown++
		for (const chip of c.querySelectorAll<HTMLElement>('[data-chip]')) chip.toggleAttribute('data-on', chip.dataset.chip === tag)
	}
	for (const b of buttons) b.setAttribute('aria-pressed', String(b.dataset.tag === tag))
	for (const i of inputs) if (i.value !== query) i.value = query
	for (const c of counts) c.textContent = fill(t.filter.count, { n: shown, total: cards.length })
	empty?.toggleAttribute('data-show', shown === 0)
	const url = new URL(location.href)
	const set = (k: string, v: string) => (v ? url.searchParams.set(k, v) : url.searchParams.delete(k))
	set('tag', tag)
	set('q', query)
	history.replaceState(history.state, '', url)
}

for (const b of buttons) b.addEventListener('click', () => ((tag = b.dataset.tag === tag ? '' : (b.dataset.tag ?? '')), apply()))
for (const i of inputs) i.addEventListener('input', () => ((query = i.value), apply()))
// Com script, a busca filtra na hora; o envio do formulário (`?q=`) fica para quem navega sem script.
for (const i of inputs) i.form?.addEventListener('submit', (e) => e.preventDefault())

for (const c of cards) {
	c.querySelector('a[data-title]')?.addEventListener('click', () => {
		for (const x of document.querySelectorAll<HTMLElement>('[data-title]')) x.classList.remove('[view-transition-name:project]')
		c.querySelector<HTMLElement>('[data-title]')?.classList.add('[view-transition-name:project]')
	})
}

document.addEventListener('keydown', (e) => {
	if (e.metaKey || e.ctrlKey || e.altKey) return
	const field = e.target instanceof Element ? e.target.closest('input, textarea, [contenteditable]') : null
	if (e.key === 'Escape') {
		if (tag || query) ((tag = ''), (query = ''), apply())
		if (field instanceof HTMLInputElement) field.blur()
		return
	}
	if (!field && e.key === '/') {
		e.preventDefault()
		inputs.find((i) => i.offsetParent !== null)?.focus()
	}
})

console.log(['  ▭ ──·──╮      ┌─ ▤ ─·─ ⚙', '  ▯ ──·──⬡ ─·─ ▣', '  ≡ ──·──╯      └─ ⚡   ⛁', '', t.eggs.console].join('\n'))

const params = new URL(location.href).searchParams
const start = params.get('tag') ?? ''
tag = buttons.some((b) => b.dataset.tag === start) ? start : ''
query = params.get('q') ?? ''
apply()
