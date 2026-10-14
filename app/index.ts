import { Elysia, file } from 'elysia'
import { cors } from '@elysiajs/cors'
import { staticPlugin } from '@elysiajs/static'

// config - .env
const ENV_PORT = Number(Bun.env.PORT)
if (!ENV_PORT) throw new Error('.env PORT')

const app = new Elysia()
	// CORS - allow from any origin
	.use(cors({origin: '*'}))
	// health check
	.get('/health', () => ('ok'))
	// build - home
	.get('/', file(`${import.meta.dir}/../dist/index.html`))
	// build - files (dist)
	.use(staticPlugin({
		assets: `${import.meta.dir}/../dist`,
		prefix: '/',
		alwaysStatic: true,
		indexHTML: true,
	}))
	// public
	.use(staticPlugin({
		assets: `${import.meta.dir}/../public`,
		prefix: '/',
		alwaysStatic: true,
		indexHTML: false,
	}))
	.listen(ENV_PORT)

// log
console.log(`🦊 Server running at http://localhost:${app.server?.port}`)
