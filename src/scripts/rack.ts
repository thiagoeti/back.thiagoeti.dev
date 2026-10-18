/**
 * Rack da capa: ligar uma porta do patch panel (a tag), o cabo que desce até as placas de rede dos
 * servidores que têm a tag, escolher servidor pelo teclado, puxar o servidor (view transition) e os
 * easter eggs. Física única: trilho (`ease-rail`).
 *
 * Cabo: sai da boca da porta no patch panel, desce até a bandeja, corre até o organizador vertical,
 * desce até a altura do servidor e entra por baixo na porta da placa de rede. Cada tag tem a sua
 * pista na bandeja e no organizador; cada porta da placa, a sua pista de entrada. Sem tag ligada,
 * todos os cabos aparecem apagados; ligada, os dela acendem no acento e os outros quase somem.
 */
import page from '../../.analyse/page.json'

const t = page.text
const fill = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k: string) => String(v[k] ?? ''))
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
const desktop = matchMedia('(min-width: 64rem)')

const rack = document.querySelector<HTMLElement>('[data-rack]')!
const svg = rack.querySelector<SVGSVGElement>('[data-cables]')!
const tray = rack.querySelector<HTMLElement>('[data-tray]')!
const channel = rack.querySelector<HTMLElement>('[data-channel]')!
const servers = [...rack.querySelectorAll<HTMLAnchorElement>('a[data-server]')]
const ports = [...document.querySelectorAll<HTMLButtonElement>('button[data-tag]')]
const lit = document.querySelector<HTMLElement>('[data-lit]')
const toast = document.querySelector<HTMLElement>('[data-toast]')
const NS = 'http://www.w3.org/2000/svg'

/** Porta (`07`) → tag; servidor → portas da placa. */
const tagOf = new Map(ports.filter((p) => p.dataset.port).map((p) => [p.dataset.port!, p.dataset.tag!]))
const nicsOf = (s: HTMLElement) => [...s.querySelectorAll<HTMLElement>('[data-nic]')]
const has = (s: HTMLElement, tag: string) => nicsOf(s).some((n) => tagOf.get(n.dataset.nic!) === tag)

let current = ''

// ── cabos ──────────────────────────────────────────────────────────────────────────────────────

type Cable = { path: SVGPathElement; tag: string; server: string }
let cables: Cable[] = []

/** Polilinha com cantos arredondados (raio `r`), só trechos retos na horizontal e na vertical. */
function rounded(points: [number, number][], r = 5): string {
	let d = `M${points[0]![0]} ${points[0]![1]}`
	for (let i = 1; i < points.length - 1; i++) {
		const [px, py] = points[i - 1]!
		const [x, y] = points[i]!
		const [nx, ny] = points[i + 1]!
		const a = Math.min(r, Math.hypot(x - px, y - py) / 2)
		const b = Math.min(r, Math.hypot(nx - x, ny - y) / 2)
		const ux = Math.sign(x - px)
		const uy = Math.sign(y - py)
		const vx = Math.sign(nx - x)
		const vy = Math.sign(ny - y)
		d += `L${x - ux * a} ${y - uy * a}Q${x} ${y} ${x + vx * b} ${y + vy * b}`
	}
	const [lx, ly] = points.at(-1)!
	return `${d}L${lx} ${ly}`
}

function draw() {
	if (!desktop.matches) {
		svg.replaceChildren()
		cables = []
		return
	}
	const box = rack.getBoundingClientRect()
	const rel = (el: Element) => {
		const r = el.getBoundingClientRect()
		return { x: r.left - box.left, y: r.top - box.top, w: r.width, h: r.height }
	}
	const T = rel(tray)
	const C = rel(channel)
	const total = Math.max(1, tagOf.size - 1)
	const next: Cable[] = []
	const frag = document.createDocumentFragment()

	for (const s of servers) {
		const nics = nicsOf(s)
		nics.forEach((nic, k) => {
			const port = nic.dataset.nic!
			const tag = tagOf.get(port)
			const jack = document.querySelector(`button[data-port="${port}"] [data-jack]`)
			const plug = nic.querySelector('svg')
			if (!tag || !jack || !plug) return
			const i = Number(port) - 1
			const J = rel(jack)
			const N = rel(plug)
			const jx = J.x + J.w / 2
			const ty = T.y + 6 + (i / total) * (T.h - 12)
			const cx = C.x + 8 + (i / total) * (C.w - 16)
			const nx = N.x + N.w / 2
			const ny = N.y + N.h - 1
			const ly = ny + 7 + (nics.length - 1 - k) * 3
			const path = document.createElementNS(NS, 'path')
			path.setAttribute('d', rounded([[jx, J.y + J.h - 1], [jx, ty], [cx, ty], [cx, ly], [nx, ly], [nx, ny]]))
			path.setAttribute(
				'class',
				'fill-none stroke-fg-faint [stroke-width:1.5] [stroke-linecap:round] transition-[stroke,opacity] duration-300 ease-rail data-[on]:stroke-brand data-[on]:[stroke-width:2.25] data-[dim]:opacity-15 data-[hint]:stroke-fg-muted motion-reduce:transition-none',
			)
			frag.append(path)
			next.push({ path, tag, server: s.dataset.server! })
		})
	}
	svg.replaceChildren(frag)
	cables = next
	paint(false)
}

/** Acende os cabos da tag ligada; com `trace`, o cabo é puxado da porta até o servidor. */
function paint(trace: boolean) {
	for (const c of cables) {
		const on = !!current && c.tag === current
		c.path.toggleAttribute('data-on', on)
		c.path.toggleAttribute('data-dim', !!current && !on)
		if (on) svg.append(c.path)
		if (on && trace && !reduced) {
			const len = c.path.getTotalLength()
			c.path.animate([{ strokeDasharray: `${len}`, strokeDashoffset: `${len}` }, { strokeDasharray: `${len}`, strokeDashoffset: '0' }], { duration: 520, easing: 'cubic-bezier(0.32, 0.72, 0, 1)' })
		}
	}
}

/** Prévia: passar o mouse na porta ou no servidor clareia os cabos dele. */
function hint(match: (c: Cable) => boolean) {
	for (const c of cables) c.path.toggleAttribute('data-hint', match(c))
}

// ── tag ligada ─────────────────────────────────────────────────────────────────────────────────

function connect(tag: string, trace = true) {
	current = tag
	for (const p of ports) {
		const on = p.dataset.tag === tag
		p.setAttribute('aria-pressed', String(on))
		p.toggleAttribute('data-on', on)
	}
	let count = 0
	for (const s of servers) {
		const on = !tag || has(s, tag)
		if (on) count++
		s.toggleAttribute('data-off', !on)
		for (const n of nicsOf(s)) n.toggleAttribute('data-on', !!tag && tagOf.get(n.dataset.nic!) === tag)
	}
	if (lit) lit.textContent = fill(t.patch.lit, { n: count, total: servers.length })
	const url = new URL(location.href)
	if (tag) url.searchParams.set('tag', tag)
	else url.searchParams.delete('tag')
	history.replaceState(history.state, '', url)
	paint(trace)
}

for (const p of ports) {
	p.addEventListener('click', () => connect(p.dataset.tag === current ? '' : p.dataset.tag!))
	p.addEventListener('pointerenter', () => p.dataset.tag && hint((c) => c.tag === p.dataset.tag))
	p.addEventListener('pointerleave', () => hint(() => false))
}

// ── servidor escolhido e teclado ───────────────────────────────────────────────────────────────

let active = -1
function choose(i: number) {
	active = i
	servers.forEach((s, k) => s.toggleAttribute('data-active', k === i))
	const s = servers[i]
	if (s) {
		s.focus({ preventScroll: false })
		hint((c) => c.server === s.dataset.server)
	}
}

servers.forEach((s, i) => {
	s.addEventListener('pointerenter', () => hint((c) => c.server === s.dataset.server))
	s.addEventListener('pointerleave', () => hint(() => false))
	s.addEventListener('focus', () => (active = i))
	// Puxar o servidor: só o clicado leva o nome da transição para a página dele.
	s.addEventListener('click', () => {
		servers.forEach((x) => (x.style.viewTransitionName = ''))
		s.style.viewTransitionName = 'server'
	})
})

const enabled = () => servers.map((s, i) => [s, i] as const).filter(([s]) => !s.hasAttribute('data-off'))

document.addEventListener('keydown', (e) => {
	if (e.metaKey || e.ctrlKey || e.altKey) return
	const target = e.target as HTMLElement
	if (target.closest('input, textarea, [contenteditable]')) return
	if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
		const list = enabled()
		if (!list.length) return
		e.preventDefault()
		const at = list.findIndex(([, i]) => i === active)
		const step = e.key === 'ArrowDown' ? 1 : -1
		const pick = list[(at + step + list.length) % list.length] ?? list[0]!
		choose(pick[1])
	} else if (/^[1-9]$/.test(e.key) && servers[Number(e.key) - 1]) {
		choose(Number(e.key) - 1)
	} else if (e.key === 'Escape' && current) {
		connect('')
	} else if (/^[a-z]$/.test(e.key)) {
		egg(e.key)
	}
})

// ── easter eggs ────────────────────────────────────────────────────────────────────────────────

let typed = ''
let timer = 0
function say(message: string) {
	if (!toast) return
	toast.textContent = message
	toast.toggleAttribute('data-show', true)
	clearTimeout(timer)
	timer = window.setTimeout(() => toast.toggleAttribute('data-show', false), 2400)
}

/** `ping`: o pacote desce o rack e cada servidor ligado pisca os LEDs ao responder. */
function ping() {
	const list = enabled()
	list.forEach(([s], k) => {
		setTimeout(() => {
			for (const led of s.querySelectorAll<HTMLElement>('[data-led], [data-power]')) led.animate([{ opacity: 1 }, { opacity: 0.15 }, { opacity: 1 }], { duration: 260, iterations: 2 })
		}, reduced ? 0 : k * 140)
	})
	say(fill(t.eggs.ping, { n: list.length }))
}

/** `reboot`: o rack apaga e religa servidor por servidor, de cima para baixo. */
function reboot() {
	servers.forEach((s, k) => {
		s.animate([{ opacity: 1 }, { opacity: 0.2, offset: 0.3 }, { opacity: 0.2, offset: 0.6 }, { opacity: 1 }], { duration: reduced ? 1 : 900, delay: reduced ? 0 : k * 160, easing: 'cubic-bezier(0.32, 0.72, 0, 1)' })
	})
	say(t.eggs.reboot)
}

function egg(key: string) {
	typed = (typed + key).slice(-6)
	if (typed.endsWith('ping')) ping()
	else if (typed.endsWith('reboot')) reboot()
}

console.log(
	[
		'┌──────────────────────────────┐',
		...servers.map((s) => `│ ${String(s.dataset.number).padStart(2, '0')} ▣ ${s.dataset.server!.padEnd(16)} ●●● │`),
		'└──────────────────────────────┘',
		t.eggs.console,
	].join('\n'),
)

// ── início ─────────────────────────────────────────────────────────────────────────────────────

const start = new URL(location.href).searchParams.get('tag') ?? ''
draw()
connect(ports.some((p) => p.dataset.tag === start) ? start : '', false)

let frame = 0
const redraw = () => {
	cancelAnimationFrame(frame)
	frame = requestAnimationFrame(draw)
}
new ResizeObserver(redraw).observe(rack)
addEventListener('scroll', redraw, { passive: true })
desktop.addEventListener('change', redraw)
document.fonts?.ready.then(redraw)
