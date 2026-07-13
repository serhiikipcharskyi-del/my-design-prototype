import * as React from 'react'
import { clsx } from 'clsx'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Pressed/active state — orchid bg + pink text */
  selected?: boolean
}

// ─── Component ────────────────────────────────────────────────────────────────
//
// Figma specs (node 3677:59317):
//   px = 10px, py = 8px, gap = 6px, border-radius = 16px (radius-xl)
//   font: 12px / Medium / line-height 16px (Body/S)
//
//   default  → bg-grey-200   text-grey-900
//   hover    → bg-grey-400   text-grey-1000
//   selected → bg-orchid-200 text-tag-pink-900  (hover same as selected)

export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ selected = false, children, className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-pressed={selected}
      className={clsx(
        'inline-flex items-center justify-center gap-1.5 overflow-hidden',
        'px-2.5 py-2 rounded-xl',
        'text-body-s font-medium font-sans whitespace-nowrap',
        'cursor-pointer select-none outline-none',
        'transition-colors duration-100',
        'disabled:opacity-50 disabled:pointer-events-none',
        'focus-visible:ring-2 focus-visible:ring-orchid-1000 focus-visible:ring-offset-1',
        selected
          ? 'bg-orchid-200 text-tag-pink-900'
          : 'bg-grey-200 text-grey-900 hover:bg-grey-400 hover:text-grey-1000',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  ),
)

Chip.displayName = 'Chip'
