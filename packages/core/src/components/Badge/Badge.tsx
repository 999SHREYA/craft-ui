// src/components/Badge/Badge.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'
import styles from './Badge.module.css'

const badgeVariants = cva(styles.base, {
  variants: {
    variant: {
      default:  styles.default,
      success:  styles.success,
      warning:  styles.warning,
      danger:   styles.danger,
      outline:  styles.outline,
    },
    size: {
      sm: styles.sm,
      md: styles.md,
    },
  },
  defaultVariants: {
    variant: 'default',
    size:    'md',
  },
})

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  leftIcon?:  React.ReactNode
  rightIcon?: React.ReactNode
}

export function Badge({
  variant,
  size,
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {leftIcon && (
        <span className={styles.icon} aria-hidden="true">
          {leftIcon}
        </span>
      )}
      {children}
      {rightIcon && (
        <span className={styles.icon} aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </span>
  )
}

Badge.displayName = 'Badge'