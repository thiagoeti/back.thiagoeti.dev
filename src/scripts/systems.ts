/**
 * Abertura em funcionamento (.analyse/design.md › Revisão 10): dados passam sem parar pelos trilhos
 * entre os sistemas. Cada trilho tem o seu ritmo:
 * - `sync`: a requisição vai (clara) e a resposta volta (verde; às vezes âmbar);
 * - `async`: a mensagem vai para a fila e da fila para o worker (ciano), sem volta;
 * - `store`: a escrita vai ao banco (verde) e a confirmação volta apagada.
 * O sistema que recebe pulsa. Para quando a cena sai da tela ou a aba fica oculta. Com
 * `prefers-reduced-motion`, nada anda.
 */
import { along, reduced, send } from './flow'

const scene = document.querySelector<HTMLElement>('[data-systems]')
let running = false
let timers: number[] = []

const view = () => [...document.querySelectorAll<SVGSVGElement>('[data-systems-view]')].find((v) => v.getBoundingClientRect().width > 0)

function pulse(node: Element | null) {
	if (!node) return
	node.toggleAttribute('data-pulse', true)
	window.setTimeout(() => node.removeAttribute('data-pulse'), 260)
}

function loop(v: SVGSVGElement, rail: SVGPathElement) {
	if (!running) return
	const layer = v.querySelector('[data-particles]')!
	const to = v.querySelector(`[data-sys="${rail.dataset.to}"]`)
	const from = v.querySelector(`[data-sys="${rail.dataset.from}"]`)
	const flow = rail.dataset.flow
	const len = rail.getTotalLength()
	const dur = Math.max(650, len * 3.2)
	if (flow === 'async') send(layer, [along(rail)], 'info', dur * 1.3, () => pulse(to), false, 2.6)
	else if (flow === 'store')
		send(layer, [along(rail)], 'success', dur, () => {
			pulse(to)
			send(layer, [along(rail, true)], 'request', dur * 0.8, () => pulse(from), true, 1.8)
		}, false, 2.6)
	else
		send(layer, [along(rail)], 'request', dur, () => {
			pulse(to)
			send(layer, [along(rail, true)], Math.random() < 0.12 ? 'warning' : 'success', dur * 0.9, () => pulse(from), true, 2.4)
		}, false, 2.6)
	const base = flow === 'async' ? 1500 : flow === 'store' ? 1900 : 1100
	timers.push(window.setTimeout(() => loop(v, rail), base * (0.5 + Math.random())))
}

function start() {
	if (running || reduced || document.hidden) return
	const v = view()
	if (!v) return
	running = true
	const rails = [...v.querySelectorAll<SVGPathElement>('[data-rail]')]
	rails.forEach((r, i) => timers.push(window.setTimeout(() => loop(v, r), i * 140)))
}

function stop() {
	running = false
	timers.forEach(clearTimeout)
	timers = []
}

if (scene && !reduced) {
	new IntersectionObserver((entries) => (entries.some((e) => e.isIntersecting) ? start() : stop()), { threshold: 0.1 }).observe(scene)
	document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()))
	let width = innerWidth
	addEventListener('resize', () => {
		// troca paisagem ↔ retrato: recomeça no desenho à vista
		if ((width < 768) === (innerWidth < 768)) return
		width = innerWidth
		stop()
		start()
	})
}
