// app/page.tsx
'use client'


import { useState, type ChangeEvent } from 'react'
import {
  Button, Input, Badge,
  Card, Avatar, Spinner
} from '@craft-ui/core'

export default function Home() {
  const [loading, setLoading]   = useState(false)
  const [inputVal, setInputVal] = useState('')
  const [hasError, setHasError] = useState(false)

  function simulateLoad() {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <main className="min-h-screen p-10 max-w-4xl mx-auto">

      {/* Header */}
      <div className="mb-12">
        <h1 style={{
          fontSize: 'var(--text-2xl)',
          fontWeight: 'var(--font-semibold)',
          color: 'var(--color-text)',
          marginBottom: 'var(--space-2)',
        }}>
          Craft UI
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
          A production-grade component library
        </p>
      </div>

      {/* Button Section */}
      <section className="mb-10">
        <SectionTitle>Button</SectionTitle>
        <div className="flex flex-wrap gap-3 mb-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button isLoading={loading} onClick={simulateLoad}>
            {loading ? 'Saving...' : 'Click to load'}
          </Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      <Divider />

      {/* Input Section */}
      <section className="mb-10">
        <SectionTitle>Input</SectionTitle>
        <div className="flex flex-col gap-4 max-w-sm">
          <Input
            label="Email"
            placeholder="you@example.com"
            hint="We will never share your email"
            value={inputVal}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setInputVal(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Min 8 characters"
            errorMessage={hasError ? 'Password is too short' : undefined}
          />
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setHasError(e => !e)}
          >
            Toggle error state
          </Button>
          <Input
            label="Search"
            placeholder="Search anything..."
            leftAddon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            }
          />
          <Input label="Disabled input" defaultValue="Cannot edit" disabled />
        </div>
      </section>

      <Divider />

      {/* Badge Section */}
      <section className="mb-10">
        <SectionTitle>Badge</SectionTitle>
        <div className="flex flex-wrap gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Active</Badge>
          <Badge variant="warning">Pending</Badge>
          <Badge variant="danger">Failed</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success" size="sm">Small</Badge>
        </div>
      </section>

      <Divider />

      {/* Avatar Section */}
      <section className="mb-10">
        <SectionTitle>Avatar</SectionTitle>
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <Avatar name="Shreya Mishra" size="xs" />
          <Avatar name="Rahul Gupta"   size="sm" />
          <Avatar name="Priya Singh"   size="md" />
          <Avatar name="Arjun Mehta"   size="lg" />
          <Avatar name="Kavya Nair"    size="xl" />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Avatar size="md" />
          <Avatar
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Shreya"
            alt="Shreya"
            size="md"
          />
          <Avatar name="Shreya Mishra" shape="square" size="md" />
        </div>
      </section>

      <Divider />

      {/* Spinner Section */}
      <section className="mb-10">
        <SectionTitle>Spinner</SectionTitle>
        <div className="flex flex-wrap items-center gap-6">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
          <Spinner variant="muted" />
          <div style={{ background: 'var(--color-primary)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
            <Spinner variant="white" />
          </div>
        </div>
      </section>

      <Divider />

      {/* Card Section */}
      <section className="mb-10">
        <SectionTitle>Card</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <Card variant="elevated">
            <Card.Header action={<Badge variant="success">Active</Badge>}>
              <Card.Title>Elevated card</Card.Title>
              <Card.Subtitle>With action slot</Card.Subtitle>
            </Card.Header>
            <Card.Body>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                Card body content goes here. This is the elevated variant with a subtle shadow.
              </p>
            </Card.Body>
            <Card.Footer>
              <Button size="sm" variant="primary">Action</Button>
              <Button size="sm" variant="ghost">Cancel</Button>
            </Card.Footer>
          </Card>

          <Card variant="outlined" isHoverable>
            <Card.Header>
              <Card.Title>Hoverable card</Card.Title>
              <Card.Subtitle>Outlined variant</Card.Subtitle>
            </Card.Header>
            <Card.Body>
              <div className="flex items-center gap-3">
                <Avatar name="Shreya Sharma" size="md" />
                <div>
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>
                    Shreya Mishra
                  </p>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                    Frontend Engineer
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

        </div>
      </section>

    </main>
  )
}

// ── Small helper components ──────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontSize:     'var(--text-lg)',
      fontWeight:   'var(--font-semibold)',
      marginBottom: 'var(--space-4)',
      color:        'var(--color-text)',
    }}>
      {children}
    </h2>
  )
}

function Divider() {
  return (
    <hr style={{
      border:       'none',
      borderTop:    '1px solid var(--color-border)',
      margin:       'var(--space-8) 0',
    }} />
  )
}