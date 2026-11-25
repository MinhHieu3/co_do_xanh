import { defineConfig, loadEnv, type Plugin, type PreviewServer, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { handleForms } from './api/forms.ts'

function localFormsApi(mode: string): Plugin {
  const mount = ({ middlewares }: ViteDevServer | PreviewServer) => {
    const env = loadEnv(mode, process.cwd(), ['ORDER_API_URL', 'VITE_API_URL', 'ZALO_', 'VITE_SHOW_PRICE'])
    middlewares.use('/api/forms', (req, res, next) => {
      void handleForms(req, res, env).catch(next)
    })
  }
  return { name: 'local-forms-api', configureServer: mount, configurePreviewServer: mount }
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), localFormsApi(mode)],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        en: resolve(import.meta.dirname, 'index-en.html')
      },
      output: {
        manualChunks(id) {
          if (id.includes('lucide-react')) {
            return 'lucide';
          }
          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
            return 'vendor';
          }
        }
      }
    }
  },
  css: {
    lightningcss: {
      errorRecovery: true
    }
  }
}))
