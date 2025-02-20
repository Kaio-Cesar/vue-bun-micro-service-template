import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { auth } from '../auth/better_auth'

const app = new Hono()

app.use(
  '/api/auth/**',
  cors({
    origin: process.env.CLIENT_URL!,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  })
)
app.on(['POST', 'GET'], '/api/auth/**', c => auth.handler(c.req.raw))

const server = Bun.serve({
  port: 3000,
  fetch: app.fetch,
})

console.log(server.url.href)

export default server
