// Avatar.test.tsx — poori file update karo
import { render, screen }       from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Avatar }               from './Avatar'

describe('Avatar', () => {
  it('renders image when src provided', () => {
    render(<Avatar src="photo.jpg" alt="Shreya" />)
    // img element directly query karo — role nahi, kyunki
    // wrapper span aur img dono "img" role rakhte the
    expect(screen.getByAltText('Shreya')).toBeInTheDocument()
  })

  it('renders initials when name provided and no src', () => {
    // "Shreya Mishra" → "SM" ✓
    render(<Avatar name="Shreya Mishra" />)
    expect(screen.getByText('SM')).toBeInTheDocument()
  })

  it('renders single initial for single name', () => {
    render(<Avatar name="Shreya" />)
    expect(screen.getByText('S')).toBeInTheDocument()
  })

  it('renders fallback icon when no src and no name', () => {
    render(<Avatar />)
    // Koi img element nahi — wrapper span ka role="img" check karo
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('has accessible label from name when showing initials', () => {
    render(<Avatar name="Shreya Mishra" />)
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'Shreya Mishra')
  })

  it('image has correct alt text', () => {
    render(<Avatar src="photo.jpg" alt="Profile photo" />)
    expect(screen.getByAltText('Profile photo')).toBeInTheDocument()
  })
})