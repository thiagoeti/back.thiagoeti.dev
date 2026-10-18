/**
 * Ficha de execução lida do `docker.sh` de cada projeto: recursos, porta, imagem e as
 * flags de blindagem. Flag ausente fica vazia — nunca inventada.
 */
export type Docker = {
	image: string
	cpus: string
	memory: string
	port: string
	pids: string
	user: string
	stopTimeout: string
	/** Blindagem, na ordem de `SHIELD`: cada item presente ou não. */
	shield: Record<ShieldKey, boolean>
}

export const SHIELD = ['user', 'readOnly', 'capDrop', 'noNewPrivileges', 'pids', 'health'] as const
export type ShieldKey = (typeof SHIELD)[number]

const flag = (src: string, name: string) => src.match(new RegExp(`(?:^|\\s)${name}[ =]([^\\s\\\\]+)`, 'm'))?.[1]?.replace(/^['"]|['"]$/g, '') ?? ''

export function parseDocker(src: string): Docker {
	const user = flag(src, '--user')
	return {
		image: src.match(/^\s+([a-z0-9][\w./-]*:[\w.-]+)\s*\\?\s*$/m)?.[1] ?? '',
		cpus: flag(src, '--cpus'),
		memory: flag(src, '-m') || flag(src, '--memory'),
		port: flag(src, '-p').split(':').at(-1) ?? '',
		pids: flag(src, '--pids-limit'),
		user,
		stopTimeout: flag(src, '--stop-timeout'),
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
