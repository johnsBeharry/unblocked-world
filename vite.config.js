import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const sassFunctionsPath = fileURLToPath(
  new URL('./src/styles/_functions.scss', import.meta.url),
).replaceAll('\\', '/')

export default defineConfig({
  plugins: [react()],
  appType: 'custom',
  css: {
    modules: { localsConvention: 'camelCase' },
    preprocessorOptions: {
      scss: {
        additionalData: `@use "${sassFunctionsPath}" as *;\n`,
      },
    },
  },
})
