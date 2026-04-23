// Card.test.tsx
import { render, screen }           from '@testing-library/react'
import { describe, it, expect }     from 'vitest'
import { Card }                     from './Card'

describe('Card', () => {
  it('renders children', () => {
    render(<Card><p>Content</p></Card>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders Card.Header and Card.Title', () => {
    render(
      <Card>
        <Card.Header>
          <Card.Title>Hello</Card.Title>
        </Card.Header>
      </Card>
    )
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders action slot in header', () => {
    render(
      <Card>
        <Card.Header action={<button>Edit</button>}>
          <Card.Title>Title</Card.Title>
        </Card.Header>
      </Card>
    )
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument()
  })

  it('renders full compound structure', () => {
    render(
      <Card>
        <Card.Header>
          <Card.Title>User Profile</Card.Title>
          <Card.Subtitle>Admin</Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <p>Body content</p>
        </Card.Body>
        <Card.Footer>
          <button>Save</button>
        </Card.Footer>
      </Card>
    )
    expect(screen.getByText('User Profile')).toBeInTheDocument()
    expect(screen.getByText('Admin')).toBeInTheDocument()
    expect(screen.getByText('Body content')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
  })
})