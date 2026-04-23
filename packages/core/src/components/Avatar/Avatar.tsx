// src/components/Avatar/Avatar.tsx
import { useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'
import styles from './Avatar.module.css'

const avatarVariants = cva(styles.root, {
  variants: {
    size: {
      xs: styles.xs,
      sm: styles.sm,
      md: styles.md,
      lg: styles.lg,
      xl: styles.xl,
    },
    shape: {
      circle:  styles.circle,
      square:  styles.square,
    },
  },
  defaultVariants: {
    size:  'md',
    shape: 'circle',
  },
})

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {
  src?:  string
  alt?:  string
  name?: string   // initials generate karne ke liye
}

// Name se initials nikalna — "Shreya Sharma" → "SS"
function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)           // whitespace pe split
    .slice(0, 2)            // max 2 words
    .map(word => word[0])   // pehla character
    .join('')
    .toUpperCase()
}

// Name se deterministic color — same name = same color hamesha
// Hashing technique hai yeh — interview mein pooch sakte hain
function getColorIndex(name: string): number {
  return name
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0) % 6
}

const COLOR_CLASSES = [
  styles.color0, // purple
  styles.color1, // blue
  styles.color2, // green
  styles.color3, // orange
  styles.color4, // pink
  styles.color5, // teal
]

// Fallback icon — jab na image ho na name
function FallbackIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={styles.fallbackIcon}
    >
      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
    </svg>
  )
}

export function Avatar({
  src,
  alt,
  name,
  size,
  shape,
  className,
  ...props
}: AvatarProps) {
  const [imgError, setImgError] = useState(false)

  const showImage    = src && !imgError
  const showInitials = !showImage && name
  const showFallback = !showImage && !showInitials

  const colorClass = name ? COLOR_CLASSES[getColorIndex(name)] : styles.color0

  // Jab image show ho rahi hai — span ko role="img" mat do
  // <img> khud accessible hai apne alt se
  // Jab initials/fallback ho — span ko role="img" do kyunki koi img element nahi
  const needsRole = !showImage

  return (
    <span
      className={cn(
        avatarVariants({ size, shape }),
        (showInitials || showFallback) && colorClass,
        className,
      )}
      aria-label={needsRole ? (alt ?? name ?? 'avatar') : undefined}
      role={needsRole ? 'img' : undefined}
      {...props}
    >
      {showImage && (
        <img
          src={src}
          alt={alt ?? name ?? ''}
          className={styles.image}
          onError={() => setImgError(true)}
        />
      )}

      {showInitials && (
        <span aria-hidden="true" className={styles.initials}>
          {getInitials(name)}
        </span>
      )}

      {showFallback && <FallbackIcon />}
    </span>
  )
}

Avatar.displayName = 'Avatar'