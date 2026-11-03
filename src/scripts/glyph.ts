/**
 * Glifo do projeto em funcionamento (.analyse/design.md › Revisão 10): dados correm sem parar entre
 * a moldura da linguagem e cada satélite (as demais tecnologias), nos dois sentidos. Para fora da
 * tela ou com a aba oculta; parado com `prefers-reduced-motion`.
 */
import { line, reduced, send } from './flow'

const svg = document.querySelector<SVGSVGElement>('svg[data-glyph]:has([data-particles])')
let running = false
let timers: number[] = []

function loop(link: SVGLineElement) {
	if (!running || !svg) return
	const layer = svg.querySelector('[data-particles]')!
	const a = { x: Number(link.getAttribute('x1')), y: Number(link.getAttribute('y1')) }
	const b = { x: Number(link.getAttribute('x2')), y: Number(link.getAttribute('y2')) }
	const out = Math.random() < 0.5
	send(layer, [out ? line(a, b) : line(b, a)], out ? 'success' : 'info', 900, undefined, true, 2.2)
	timers.push(window.setTimeout(() => loop(link), 700 + Math.random() * 1100))
}

function start() {
	if (running || reduced || !svg || document.hidden) return
	running = true
	;[...svg.querySelectorAll<SVGLineElement>('line[data-link]')].forEach((l, i) => timers.push(window.setTimeout(() => loop(l), i * 220)))
}
function stop() {
	running = false
	timers.forEach(clearTimeout)
	timers = []
}

if (svg && !reduced) {
	new IntersectionObserver((e) => (e.some((x) => x.isIntersecting) ? start() : stop()), { threshold: 0.2 }).observe(svg)
	document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()))
}
