/**
 * Página do projeto: a lista de arquivos troca o código (abas, ↑ ↓ ← → entre arquivos); fora da
 * lista, ← → abrem o projeto anterior e o próximo.
 */
const tabs = [...document.querySelectorAll<HTMLButtonElement>('[role="tab"]')]
function select(tab: HTMLButtonElement, focus = false) {
	for (const t of tabs) {
		const on = t === tab
		t.setAttribute('aria-selected', String(on))
		t.tabIndex = on ? 0 : -1
		document.getElementById(t.getAttribute('aria-controls') ?? '')?.toggleAttribute('hidden', !on)
	}
	if (focus) tab.focus()
}
tabs.forEach((tab, i) => {
	tab.addEventListener('click', () => select(tab))
	tab.addEventListener('keydown', (e) => {
		const step = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0
		if (!step) return
		e.preventDefault()
		e.stopPropagation()
		select(tabs[(i + step + tabs.length) % tabs.length]!, true)
	})
})

const [prev, next] = document.querySelectorAll<HTMLAnchorElement>('a[data-neighbor]')
document.addEventListener('keydown', (e) => {
	if (e.altKey || e.metaKey || e.ctrlKey || (e.target instanceof Element && e.target.closest('input, textarea, summary, [role="tab"], [role="tabpanel"]'))) return
	const to = e.key === 'ArrowLeft' ? prev : e.key === 'ArrowRight' ? next : undefined
	if (to) location.assign(to.href)
})
