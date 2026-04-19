import { defineConfig } from 'tsup'

export default defineConfig({
  entry:  ['src/index.ts'],  // entry point
  format: ['esm', 'cjs'],    // dono formats build karo
  dts:    true,              // TypeScript .d.ts files generate karo
  clean:  true,              // build se pehle dist/ clean karo
  sourcemap: true,          // debugging ke liye source maps
  splitting: false,         // library mein code splitting mat karo

  // React ko bundle mat karo — peer dependency hai
  external: ['react', 'react-dom'],

  // CSS tokens file copy karo dist/ mein
  publicDir: 'src/tokens',
})