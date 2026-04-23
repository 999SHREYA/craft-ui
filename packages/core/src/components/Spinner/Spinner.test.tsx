// Spinner.test.tsx
import { render, screen }       from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Spinner }              from './Spinner'

describe('Spinner', () => {
  it('has role="status"', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('has default aria-label', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading...')
  })

  it('accepts custom label', () => {
    render(<Spinner label="Saving changes..." />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Saving changes...')
  })
})