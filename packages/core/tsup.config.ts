// packages/core/tsup.config.mts
import { defineConfig } from 'tsup'
import { copyFileSync, mkdirSync } from 'fs'

export default defineConfig({
  entry:     ['src/index.ts'],
  format:    ['esm', 'cjs'],
  dts:       true,
  clean:     true,
  sourcemap: true,
  splitting: false,
  external:  ['react', 'react-dom'],

  // Build complete hone ke baad CSS manually copy karo
  async onSuccess() {
    mkdirSync('dist', { recursive: true })
    copyFileSync('src/tokens/tokens.css',    'dist/tokens.css')
    copyFileSync('src/tokens/primitives.css', 'dist/primitives.css')
    copyFileSync('src/tokens/semantic.css',   'dist/semantic.css')
    console.log('✓ CSS tokens copied to dist/')
  },
})