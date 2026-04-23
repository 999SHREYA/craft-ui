// src/components/Card/Card.tsx
import { createContext, useContext } from 'react'
import { cn } from '../../lib/cn'
import styles from './Card.module.css'

// ─── Context ───────────────────────────────────────────
// Card ke andar ke components ko pata ho ki variant kya hai
interface CardContextValue {
  variant: 'elevated' | 'outlined' | 'filled'
}

const CardContext = createContext<CardContextValue>({
  variant: 'elevated',
})

// Custom hook — context consume karna easy ho jaata hai
function useCard() {
  return useContext(CardContext)
}

// ─── Root ──────────────────────────────────────────────
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardContextValue['variant']
  // Hover effect — interactive cards ke liye (e.g. clickable cards)
  isHoverable?: boolean
}

export function Card({
  variant = 'elevated',
  isHoverable = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <CardContext.Provider value={{ variant }}>
      <div
        className={cn(
          styles.root,
          styles[variant],
          isHoverable && styles.hoverable,
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </CardContext.Provider>
  )
}

// ─── Header ────────────────────────────────────────────
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  // Optional action slot — right side mein kuch render karo (button, badge etc.)
  action?: React.ReactNode
}

function CardHeader({ action, className, children, ...props }: CardHeaderProps) {
  return (
    <div className={cn(styles.header, className)} {...props}>
      <div className={styles.headerContent}>{children}</div>
      {action && <div className={styles.headerAction}>{action}</div>}
    </div>
  )
}

// ─── Title ─────────────────────────────────────────────
function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn(styles.title, className)} {...props}>
      {children}
    </h3>
  )
}

// ─── Subtitle ──────────────────────────────────────────
function CardSubtitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn(styles.subtitle, className)} {...props}>
      {children}
    </p>
  )
}

// ─── Body ──────────────────────────────────────────────
function CardBody({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(styles.body, className)} {...props}>
      {children}
    </div>
  )
}

// ─── Footer ────────────────────────────────────────────
function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(styles.footer, className)} {...props}>
      {children}
    </div>
  )
}

// ─── Divider ───────────────────────────────────────────
function CardDivider({ className }: { className?: string }) {
  return <hr className={cn(styles.divider, className)} />
}


Card.Header   = CardHeader
Card.Title    = CardTitle
Card.Subtitle = CardSubtitle
Card.Body     = CardBody
Card.Footer   = CardFooter
Card.Divider  = CardDivider

Card.displayName          = 'Card'
CardHeader.displayName    = 'Card.Header'
CardTitle.displayName     = 'Card.Title'
CardSubtitle.displayName  = 'Card.Subtitle'
CardBody.displayName      = 'Card.Body'
CardFooter.displayName    = 'Card.Footer'
CardDivider.displayName   = 'Card.Divider'