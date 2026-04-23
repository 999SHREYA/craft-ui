// Badge.test.tsx
import { render, screen }           from '@testing-library/react'
import { describe, it, expect }     from 'vitest'
import { Badge }                    from './Badge'

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Active</Badge>)
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('renders leftIcon', () => {
    render(<Badge leftIcon={<span data-testid="icon" />}>Label</Badge>)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('applies variant class', () => {
    render(<Badge variant="success">Success</Badge>)
    const el = screen.getByText('Success')
    expect(el.className).toMatch(/success/i)
  })
})