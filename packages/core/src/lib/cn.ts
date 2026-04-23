import { clsx, type ClassValue } from 'clsx'

/**
 * Merge class names, resolve conflicts.
 * Use this in every component.
 *
 * cn('px-4 py-2', condition && 'bg-red', className)
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}