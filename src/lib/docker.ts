/**
 * Ficha do servidor lida do `docker.sh` de cada projeto: recursos, porta, imagem, ciclo de vida e
 * as flags de blindagem — cada flag é um LED na chapa do servidor. Flag ausente fica vazia, nunca
 * inventada.
 */
export type Docker = {
	image: string
	cpus: string
	memory: string
	swap: string
	port: string
	pids: string
	user: string
	restart: string
	nofile: string
	stopSignal: string
	stopTimeout: string
	/** Intervalo do health check (`10s`). */
	healthInterval: string
	/** Rotação de log: `10m × 3`. */
	log: string
	/** Blindagem, na ordem de `SHIELD`: cada item presente ou não. */
	shield: Record<ShieldKey, boolean>
}

export const SHIELD = ['user', 'readOnly', 'capDrop', 'noNewPrivileges', 'pids', 'health'] as const
export type ShieldKey = (typeof SHIELD)[number]

const flag = (src: string, name: string) => src.match(new RegExp(`(?:^|\\s)${name}[ =]([^\\s\\\\]+)`, 'm'))?.[1]?.replace(/^['"]|['"]$/g, '') ?? ''

const opt = (src: string, name: string) => src.match(new RegExp(`--log-opt[ =]${name}=([^\\s\\\\]+)`))?.[1] ?? ''

export function parseDocker(src: string): Docker {
	const user = flag(src, '--user')
	const size = opt(src, 'max-size')
	const files = opt(src, 'max-file')
	return {
		image: src.match(/^\s+([a-z0-9][\w./-]*:[\w.-]+)\s*\\?\s*$/m)?.[1] ?? '',
		cpus: flag(src, '--cpus'),
		memory: flag(src, '-m') || flag(src, '--memory'),
		swap: flag(src, '--memory-swap'),
		port: flag(src, '-p').split(':').at(-1) ?? '',
		pids: flag(src, '--pids-limit'),
		user,
		restart: flag(src, '--restart'),
		nofile: flag(src, '--ulimit').replace(/^nofile=/, '').split(':')[0] ?? '',
		stopSignal: flag(src, '--stop-signal'),
		stopTimeout: flag(src, '--stop-timeout'),
		healthInterval: flag(src, '--health-interval'),
		log: size ? (files ? `${size} × ${files}` : size) : '',
		shield: {
			user: !!user && !/^(root|0)(:|$)/.test(user),
			readOnly: /(^|\s)--read-only(\s|$)/m.test(src),
			capDrop: /--cap-drop[ =]ALL/.test(src),
			noNewPrivileges: /no-new-privileges/.test(src),
			pids: !!flag(src, '--pids-limit'),
			health: /--health-cmd/.test(src),
		},
	}
}
