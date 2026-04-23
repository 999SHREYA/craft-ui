
// import { render, screen }   from '@testing-library/react'
// import userEvent            from '@testing-library/user-event'
// import { describe, it, expect, vi } from 'vitest'
// import { Button } from './Button'

// describe('Button', () => {
//   it('renders children', () => {
//     render(<Button>Click me</Button>)
//     expect(
//       screen.getByRole('button', { name: /click me/i })
//     ).toBeDefined()
//   })

//   it('calls onClick when clicked', async () => {
//     const user = userEvent.setup()   // userEvent ka instance banao
//     const onClick = vi.fn()
//     render(<Button onClick={onClick}>Click</Button>)
//     await user.click(screen.getByRole('button'))
//     expect(onClick).toHaveBeenCalledOnce()
//   })

//   it('is disabled when isLoading is true', () => {
//     render(<Button isLoading>Save</Button>)
//     expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(true)
//   })

//   it('has aria-busy when loading', () => {
//     render(<Button isLoading>Save</Button>)
//     expect(screen.getByRole('button').getAttribute('aria-busy')).toBe('true')
//   })

//   it('does not fire onClick when disabled', async () => {
//     const user = userEvent.setup()
//     const onClick = vi.fn()
//     render(<Button disabled onClick={onClick}>Click</Button>)
//     await user.click(screen.getByRole('button'))
//     expect(onClick).not.toHaveBeenCalled()
//   })

//   it('forwards ref to button element', () => {
//     const ref = { current: null }
//     render(<Button ref={ref}>Ref test</Button>)
//     expect(ref.current).toBeInstanceOf(HTMLButtonElement)
//   })
// })


// Button.test.tsx
import { render, screen }          from '@testing-library/react'
import userEvent                   from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button }                  from './Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(
      screen.getByRole('button', { name: /click me/i })
    ).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('is disabled when isLoading is true', () => {
    render(<Button isLoading>Save</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('has aria-busy when loading', () => {
    render(<Button isLoading>Save</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
  })

  it('does not fire onClick when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button disabled onClick={onClick}>Click</Button>)
    await user.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('forwards ref to button element', () => {
    const ref = { current: null }
    render(<Button ref={ref}>Ref test</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })
})