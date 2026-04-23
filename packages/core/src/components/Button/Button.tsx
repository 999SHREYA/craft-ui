// packages/core/src/components/Button/Button.tsx

import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'
import styles from './Button.module.css'

// cva = "class variance authority"
// Yeh variants ko type-safe tarike se define karta hai
// Isko samjho: Button ka "contract" hai yeh — kya-kya possible hai
const buttonVariants = cva(
  // Base classes — hamesha lagte hain
  styles.base,
  {
    variants: {
      variant: {
        primary:   styles.primary,
        secondary: styles.secondary,
        ghost:     styles.ghost,
        danger:    styles.danger,
      },
      size: {
        sm: styles.sm,
        md: styles.md,
        lg: styles.lg,
      },
    },
    defaultVariants: {
      variant: 'primary',
      size:    'md',
    },
  }
)

// ButtonProps ka type — yeh public API hai tumhare component ka
// VariantProps se automatically type-safe variants milte hain
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  leftIcon?:  React.ReactNode
  rightIcon?: React.ReactNode
}

// forwardRef — consumer ko ref access mil sake
// Iske bina form libraries aur third-party tools kaam nahi karte
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      isLoading,
      leftIcon,
      rightIcon,
      disabled,
      className,
      children,
      ...props    // baaki saare native button props pass through
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}    // screen readers ke liye
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {isLoading ? (
          <span className={styles.spinner} aria-hidden="true" />
        ) : (
          leftIcon
        )}

        <span className={styles.label}>{children}</span>

        {!isLoading && rightIcon}
      </button>
    )
  }
)

// Display name debugging ke liye — React DevTools mein dikhta hai
Button.displayName = 'Button'