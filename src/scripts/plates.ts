/**
 * Pranchas da página do projeto: eixo horizontal. A régua acende a prancha atual; roda do mouse,
 * ← → e a régua viajam uma prancha por vez (snap do navegador). "Disparar" reanima o anel de
 * respostas; o próximo cofre leva o emblema para a página seguinte (view transition).
 */
const EASE = 'cubic-bezier(0.34, 1.56, 0.64, 1)'
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
const VAULT = '[view-transition-name:vault]'

const track = document.querySelector<HTMLElement>('[data-plates]')!
const plates = [...track.querySelectorAll<HTMLElement>('[data-plate]')]
const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-plate-link]')]
let current = -1

function mark(i: number) {
	if (i === current) return
	current = i
	links.forEach((a, k) => {
		a.setAttribute('aria-current', String(k === i))
		if (k === i) a.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduced ? 'auto' : 'smooth' })
	})
}

const offset = (p: HTMLElement) => p.offsetLeft - track.offsetLeft

function go(i: number) {
	const target = plates[Math.max(0, Math.min(plates.length - 1, i))]
	if (!target) return
	track.scrollTo({ left: offset(target), behavior: reduced ? 'auto' : 'smooth' })
	history.replaceState(null, '', `#${target.id}`)
}

/** Prancha atual: a de borda esquerda mais perto da rolagem; no fim do trilho, a última. */
let frame = 0
function measure() {
	const left = track.scrollLeft
	let best = 0
	plates.forEach((p, k) => {
		if (Math.abs(offset(p) - left) < Math.abs(offset(plates[best]!) - left)) best = k
	})
	mark(left + track.clientWidth >= track.scrollWidth - 2 ? plates.length - 1 : best)
}
track.addEventListener('scroll', () => {
	cancelAnimationFrame(frame)
	frame = requestAnimationFrame(measure)
})

links.forEach((a, k) =>
	a.addEventListener('click', (e) => {
		e.preventDefault()
		go(k)
	}),
)

/* Roda vertical vira horizontal quando a prancha não tem mais o que rolar naquele sentido. */
let locked = false
track.addEventListener(
	'wheel',
	(e) => {
		if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.ctrlKey) return
		const plate = (e.target as HTMLElement).closest<HTMLElement>('[data-plate]')
		if (plate) {
			const down = e.deltaY > 0
			const room = down ? plate.scrollTop + plate.clientHeight < plate.scrollHeight - 1 : plate.scrollTop > 0
			if (room) return
		}
		e.preventDefault()
		if (locked || Math.abs(e.deltaY) < 4) return
		locked = true
		go(current + (e.deltaY > 0 ? 1 : -1))
		setTimeout(() => (locked = false), 520)
	},
	{ passive: false },
)

document.addEventListener('keydown', (e) => {
	if (e.altKey || e.metaKey || e.ctrlKey || (e.target as Element).closest?.('input, textarea, summary')) return
	if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
		e.preventDefault()
		go(current + (e.key === 'ArrowRight' ? 1 : -1))
	}
})

/* Endereço com `#prancha`: o navegador alinha o alvo pelo canto mais próximo; a prancha vai para o início. */
function fromHash() {
	const start = plates.findIndex((p) => `#${p.id}` === location.hash)
	if (start >= 0) track.scrollTo({ left: offset(plates[start]!) })
	measure()
}
fromHash()
addEventListener('load', () => requestAnimationFrame(fromHash))
addEventListener('hashchange', fromHash)

/* Disparar: o cenário de novo, marca por marca. */
document.querySelectorAll<HTMLButtonElement>('[data-fire]').forEach((button) =>
	button.addEventListener('click', () => {
		const marks = [...document.querySelectorAll<SVGElement>('[data-receipt] [data-mark]')]
		const step = reduced ? 0 : 45
		button.disabled = true
		button.textContent = button.dataset.busy ?? ''
		marks.forEach((m, k) => m.animate([{ opacity: 0 }, { opacity: 1 }], { duration: reduced ? 0 : 320, delay: k * step, easing: EASE, fill: 'backwards' }))
		setTimeout(() => {
			button.disabled = false
			button.textContent = button.dataset.label ?? ''
		}, marks.length * step + 320)
	}),
)

/* Próximo cofre: o emblema dele assume a transição; o herói desta página a cede. */
document.querySelector<HTMLAnchorElement>('[data-next]')?.addEventListener('click', (e) => {
	document.querySelectorAll('[class*="view-transition-name:vault"]').forEach((el) => el.classList.remove(VAULT))
	;(e.currentTarget as HTMLElement).querySelector('svg')?.classList.add(VAULT)
})
