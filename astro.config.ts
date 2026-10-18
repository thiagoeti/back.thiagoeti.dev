import { copyFileSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'astro/config'
import type { AstroIntegration } from 'astro'
import tailwindcss from '@tailwindcss/vite'
import { loadEnv } from 'vite'

/** `public/llms.txt` é cópia de `.content/data.md` (CONTENT.md): sincroniza antes de cada build. */
const llms: AstroIntegration = {
	name: 'llms-txt',
	hooks: {
		'astro:config:setup': () => {
			copyFileSync(
				fileURLToPath(new URL('./.content/data.md', import.meta.url)),
				fileURLToPath(new URL('./public/llms.txt', import.meta.url)),
			)
		},
	},
}

/** CDN por ambiente: o código usa a URL de produção; `CDN` do `.env.local` a troca no build. */
const CDN_PROD = 'https://cdn.thiagoeti.dev'
const CDN = loadEnv(process.env.NODE_ENV ?? '', process.cwd(), '').CDN || CDN_PROD

const escape = (s: string) => s.replace(/[^\w-]/g, '\\$&')

const cdn: AstroIntegration = {
	name: 'cdn',
	hooks: {
		'astro:build:done': ({ dir }) => {
			if (CDN === CDN_PROD) return
			const walk = (path: string) => {
				for (const entry of readdirSync(path, { withFileTypes: true })) {
					const file = join(path, entry.name)
					if (entry.isDirectory()) walk(file)
					else if (/\.(html|css|js|xml)$/.test(entry.name)) {
						const src = readFileSync(file, 'utf8')
						// escapada (seletor CSS do Tailwind) antes da normal
						const out = src.split(escape(CDN_PROD)).join(escape(CDN)).split(CDN_PROD).join(CDN)
						if (out !== src) writeFileSync(file, out)
					}
				}
			}
			walk(fileURLToPath(dir))
		},
	},
}

// https://astro.build/config
// Sitemap próprio em `src/pages/sitemap.xml.ts`: o ecossistema exige `/sitemap.xml`.
export default defineConfig({
	site: 'https://back.thiagoeti.dev',
	output: 'static',
	trailingSlash: 'never',
	build: { format: 'directory', inlineStylesheets: 'always' },
	integrations: [llms, cdn],
	vite: { plugins: [tailwindcss()] },
})
