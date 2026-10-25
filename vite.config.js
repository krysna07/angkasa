import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// In-memory session store so Kiosk and Mobile on the same LAN can exchange real photos
const sessionStore = new Map()

function sessionApiPlugin() {
  return {
    name: 'vite-session-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = new URL(req.url, `http://${req.headers.host}`)
        
        // POST /api/session/:id -> save captured photos & preset info
        if (req.method === 'POST' && url.pathname.startsWith('/api/session/')) {
          const sessionId = url.pathname.replace('/api/session/', '')
          let body = ''
          req.on('data', chunk => { body += chunk })
          req.on('end', () => {
            try {
              const data = JSON.parse(body)
              sessionStore.set(sessionId, { ...data, updatedAt: Date.now() })
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true, sessionId }))
            } catch (e) {
              res.statusCode = 400
              res.end(JSON.stringify({ error: 'Invalid JSON' }))
            }
          })
          return
        }

        // GET /api/session/:id -> retrieve photos & preset info
        if (req.method === 'GET' && url.pathname.startsWith('/api/session/')) {
          const sessionId = url.pathname.replace('/api/session/', '')
          const data = sessionStore.get(sessionId)
          res.setHeader('Content-Type', 'application/json')
          if (data) {
            res.end(JSON.stringify(data))
          } else {
            res.statusCode = 404
            res.end(JSON.stringify({ error: 'Session not found' }))
          }
          return
        }

        next()
      })
    }
  }
}

export default defineConfig({
  plugins: [vue(), sessionApiPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
    open: false
  }
})
