// packages/docs/next.config.ts
import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  transpilePackages: ['@craft-ui/core'],
  turbopack: {
    root: path.resolve(__dirname, '../..'),
    resolveAlias: {
      '@craft-ui/core': path.resolve(__dirname, '../core/src/index.ts'),
    },
  },
}

export default nextConfig