// packages/core/src/types/vitest.d.ts

import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers'

// Vitest ke Assertion type ko extend karo jest-dom matchers se
declare module 'vitest' {
  interface Assertion<R = unknown>
    extends TestingLibraryMatchers<R, void> {}

  interface AsymmetricMatchersContaining
    extends TestingLibraryMatchers<unknown, void> {}
}