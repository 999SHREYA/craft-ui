// Input.test.tsx
import { render, screen }           from '@testing-library/react'
import userEvent                    from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Input }                    from './Input'

describe('Input', () => {

  // ── Rendering ──
  it('renders input element', () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders label when provided', () => {
    render(<Input label="Email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('renders hint text', () => {
    render(<Input hint="We will never spam you" />)
    expect(screen.getByText('We will never spam you')).toBeInTheDocument()
  })

  it('renders error message', () => {
    render(<Input errorMessage="This field is required" />)
    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })

  // ── Accessibility ──
  it('marks input as invalid when errorMessage is present', () => {
    render(<Input errorMessage="Required" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('links label to input via htmlFor', () => {
    render(<Input label="Username" />)
    // getByLabelText internally checks htmlFor — agar linked nahi hai toh fail
    expect(screen.getByLabelText('Username')).toBeInTheDocument()
  })

  it('input is described by error message', () => {
    render(<Input errorMessage="Too short" />)
    const input = screen.getByRole('textbox')
    const errorEl = screen.getByText('Too short')
    expect(input).toHaveAttribute('aria-describedby', errorEl.id)
  })

  // ── Behaviour ──
  it('calls onChange when typing', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Input onChange={onChange} />)
    await user.type(screen.getByRole('textbox'), 'hello')
    expect(onChange).toHaveBeenCalled()
  })

  it('is disabled when disabled prop is passed', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('forwards ref to input element', () => {
    const ref = { current: null }
    render(<Input ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  // ── Controlled pattern ──
  it('reflects controlled value', () => {
    render(<Input value="controlled" onChange={vi.fn()} />)
    expect(screen.getByRole('textbox')).toHaveValue('controlled')
  })

  // ── Uncontrolled pattern ──
  it('uses defaultValue as initial value', () => {
    render(<Input defaultValue="uncontrolled" />)
    expect(screen.getByRole('textbox')).toHaveValue('uncontrolled')
  })
})