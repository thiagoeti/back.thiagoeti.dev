/**
 * Chassi aberto (página do projeto): o compartimento à vista acende no mapa do chassi
 * (`aria-current`), e no mobile a fileira de compartimentos rola até ele. ← → puxam o servidor
 * vizinho (acima, abaixo); a chapa leva a transição `server` para a página dele.
 */
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-map]')]
const parts = [...document.querySelectorAll<HTMLElement>('[data-compartment]')]
const seen = new Map<string, boolean>()

function mark(id: string) {
	for (const a of links) {
		const on = a.dataset.map === id
		if (on) a.setAttribute('aria-current', 'true')
		else a.removeAttribute('aria-current')
		if (on && a.offsetParent && a.parentElement?.parentElement?.scrollWidth! > a.parentElement?.parentElement?.clientWidth!) {
			a.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduced ? 'auto' : 'smooth' })
		}
	}
}

const observer = new IntersectionObserver(
	(entries) => {
		for (const e of entries) seen.set(e.target.id, e.isIntersecting)
		const first = parts.find((s) => seen.get(s.id))
		if (first) mark(first.id)
	},
	{ rootMargin: '-96px 0px -55% 0px' },
)
parts.forEach((s) => observer.observe(s))
mark(location.hash.slice(1) || parts[0]?.id || '')

const [prev, next] = [...document.querySelectorAll<HTMLAnchorElement>('#traseira a[href^="/"]:not([href="/"])')]
document.addEventListener('keydown', (e) => {
	if (e.altKey || e.metaKey || e.ctrlKey || (e.target as Element).closest?.('input, textarea, summary')) return
	const to = e.key === 'ArrowLeft' ? prev : e.key === 'ArrowRight' ? next : undefined
	if (to) location.assign(to.href)
})
