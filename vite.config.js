import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'base-redirect',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url === '/temp-demo') req.url = '/temp-demo/'
          next()
        })
      },
      configurePreviewServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url === '/temp-demo') req.url = '/temp-demo/'
          next()
        })
      },
    },
  ],
  base: '/temp-demo/',
})
