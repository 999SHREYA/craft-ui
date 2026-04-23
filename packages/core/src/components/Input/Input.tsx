// packages/core/src/components/Input/Input.tsx
import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'
import styles from './Input.module.css'

// Input ke variants — size aur state
const inputVariants = cva(styles.input, {
  variants: {
    size: {
      sm: styles.sizeSm,
      md: styles.sizeMd,
      lg: styles.sizeLg,
    },
    // Error state styling ke liye
    isError: {
      true:  styles.error,
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    isError: false,
  },
})

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?:       string
  hint?:        string        // helper text neeche
  errorMessage?: string       // error text — isError auto true ho jaayega
  leftAddon?:   React.ReactNode
  rightAddon?:  React.ReactNode
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
    // Agar errorMessage hai toh isError automatically true
    const hasError = Boolean(errorMessage) || isError === true

    // Accessible ID — label aur input ko connect karta hai
    const inputId    = id ?? `input-${Math.random().toString(36).slice(2, 7)}`
    const hintId     = hint         ? `${inputId}-hint`  : undefined
    const errorId    = errorMessage ? `${inputId}-error` : undefined

    // aria-describedby — screen readers ke liye
    // hint aur error dono ho sakte hain ek saath
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

    return (
      <div className={cn(styles.root, disabled && styles.rootDisabled)}>

        {/* Label — htmlFor se input se linked */}
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}

        {/* Input wrapper — addons ke liye */}
        <div className={cn(
          styles.wrapper,
          hasError    && styles.wrapperError,
          disabled    && styles.wrapperDisabled,
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
            aria-invalid={hasError}          // screen readers ke liye
            aria-describedby={describedBy}   // hint/error se link
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

        {/* Hint text */}
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