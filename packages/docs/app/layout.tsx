// packages/docs/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Craft UI',
  description: 'A production-grade component library',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Public folder se serve — zero bundler involvement */}
        <link rel="stylesheet" href="/tokens.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}