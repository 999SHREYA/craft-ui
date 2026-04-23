// Input.tsx
import { forwardRef, useId } from 'react'   // ← useId add kiya
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'
import styles from './Input.module.css'

const inputVariants = cva(styles.input, {
  variants: {
    size: {
      sm: styles.sizeSm,
      md: styles.sizeMd,
      lg: styles.sizeLg,
    },
    isError: {
      true:  styles.error,
      false: '',
    },
  },
  defaultVariants: {
    size:    'md',
    isError: false,
  },
})

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?:        string
  hint?:         string
  errorMessage?: string
  leftAddon?:    React.ReactNode
  rightAddon?:   React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      errorMessage,
      leftAddon,
      rightAddon,
      size,
      isError,
      className,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(errorMessage) || isError === true

    // ✅ useId — SSR-safe, server+client pe same value
    const generatedId = useId()
    const inputId     = id ?? generatedId
    const hintId      = hint         ? `${inputId}-hint`  : undefined
    const errorId     = errorMessage ? `${inputId}-error` : undefined
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

    return (
      <div className={cn(styles.root, disabled && styles.rootDisabled)}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}

        <div className={cn(
          styles.wrapper,
          hasError && styles.wrapperError,
          disabled && styles.wrapperDisabled,
        )}>
          {leftAddon && (
            <span className={styles.addon} aria-hidden="true">
              {leftAddon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={describedBy}
            className={cn(
              inputVariants({ size, isError: hasError }),
              leftAddon  && styles.hasLeft,
              rightAddon && styles.hasRight,
              className,
            )}
            {...props}
          />

          {rightAddon && (
            <span className={styles.addon} aria-hidden="true">
              {rightAddon}
            </span>
          )}
        </div>

        {hint && !errorMessage && (
          <span id={hintId} className={styles.hint}>
            {hint}
          </span>
        )}

        {errorMessage && (
          <span id={errorId} className={styles.errorMessage} role="alert">
            {errorMessage}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'