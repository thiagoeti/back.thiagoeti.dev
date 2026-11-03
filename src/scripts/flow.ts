/**
 * Motor dos dados em movimento (.analyse/design.md › Revisão 10): um ponto anda por trilhos (caminhos
 * SVG ou retas) e avisa ao chegar. Posição escrita em atributo `transform` do SVG, quadro a quadro;
 * nenhum `style`. Usado pela abertura (`systems.ts`), pelo glifo do projeto (`glyph.ts`) e pelo 404.
 */
export const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

type Pt = { x: number; y: number }
type Leg = (t: number) => Pt
type Tone = 'request' | 'success' | 'warning' | 'danger' | 'info'

const NS = 'http://www.w3.org/2000/svg'
const CLASS: Record<Tone, string> = {
	request: 'fill-fg',
	success: 'fill-success',
	warning: 'fill-warning',
	danger: 'fill-danger',
	info: 'fill-info',
}

/** Trilho de um caminho SVG, ida (`back = false`) ou volta. */
export function along(path: SVGPathElement, back = false): Leg {
	const len = path.getTotalLength()
	return (t) => {
		const p = path.getPointAtLength((back ? 1 - t : t) * len)
		return { x: p.x, y: p.y }
	}
}
/** Trilho reto de `a` a `b`. */
export const line = (a: Pt, b: Pt): Leg => (t) => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t })

type Dot = { el: SVGCircleElement; legs: Leg[]; start: number; dur: number; fade: boolean; done?: () => void }
const dots = new Set<Dot>()
let frame = 0

const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2)

function tick(now: number) {
	for (const d of dots) {
		const t = Math.min(1, Math.max(0, (now - d.start) / d.dur))
		const k = ease(t) * d.legs.length
		const i = Math.min(d.legs.length - 1, Math.floor(k))
		const p = d.legs[i]!(Math.min(1, k - i))
		d.el.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`)
		d.el.setAttribute('opacity', d.fade && t > 0.75 ? String((1 - t) * 4) : t < 0.05 ? String(t * 20) : '1')
		if (t >= 1) {
			d.el.remove()
			dots.delete(d)
			d.done?.()
		}
	}
	frame = dots.size ? requestAnimationFrame(tick) : 0
}

/** Solta um ponto em `layer` que percorre `legs` em `dur` ms; `done` ao chegar. */
export function send(layer: Element, legs: Leg[], tone: Tone, dur: number, done?: () => void, fade = false, r = 3) {
	const el = document.createElementNS(NS, 'circle')
	el.setAttribute('r', String(r))
	el.setAttribute('class', CLASS[tone])
	el.setAttribute('opacity', '0')
	layer.append(el)
	dots.add({ el, legs, start: performance.now(), dur, fade, done })
	if (!frame) frame = requestAnimationFrame(tick)
}
