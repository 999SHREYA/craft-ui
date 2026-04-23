// src/components/Spinner/Spinner.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'
import styles from './Spinner.module.css'

const spinnerVariants = cva(styles.root, {
  variants: {
    size: {
      sm: styles.sm,
      md: styles.md,
      lg: styles.lg,
    },
    variant: {
      primary: styles.primary,
      muted:   styles.muted,
      white:   styles.white,
    },
  },
  defaultVariants: {
    size:    'md',
    variant: 'primary',
  },
})

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string  // screen reader text
}

export function Spinner({
  size,
  variant,
  label = 'Loading...',
  className,
  ...props
}: SpinnerProps) {
  return (
    <span
      role="status"           // screen reader ko batao — status update hai
      aria-label={label}
      className={cn(spinnerVariants({ size, variant }), className)}
      {...props}
    >
      {/* Visual spinner — aria-hidden kyunki role="status" + aria-label upar hai */}
      <span className={styles.wheel} aria-hidden="true" />
    </span>
  )
}

Spinner.displayName = 'Spinner'