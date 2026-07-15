import * as React from 'react'
import { clsx } from 'clsx'
import { Icon } from './icons/Icon'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DropdownProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  /** Status dot color (CSS value) */
  dotColor?: string
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────
//
// Figma specs (node 441:17257, "Dropdown"):
//   240×36, border-grey-200, rounded-md (8px), hover → bg-grey-100
//   pl-3 pr-2 py-2, gap-6 between text block and arrow
//   Text block: 8px dot + gap-1.5 + truncated label (13px/Medium, text-grey-950)
//   Trailing arrow-filled-down, 20px

export const Dropdown = React.forwardRef<HTMLButtonElement, DropdownProps>(
  ({ label, dotColor = '#0000ff', className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={clsx(
        'inline-flex h-9 w-60 items-center gap-6 rounded-md border border-grey-200',
        'py-2 pl-3 pr-2 cursor-pointer outline-none',
        'hover:bg-grey-100',
        'disabled:opacity-50 disabled:pointer-events-none',
        'transition-colors duration-100',
        'focus-visible:ring-2 focus-visible:ring-orchid-1000 focus-visible:ring-offset-1',
        className,
      )}
      {...props}
    >
      <span className="flex min-w-0 flex-1 items-center gap-1.5">
        <span
          className="shrink-0 rounded-full"
          style={{ width: 8, height: 8, background: dotColor }}
          aria-hidden="true"
        />
        <span className="min-w-0 flex-1 truncate text-left font-sans text-body-m font-medium text-grey-950">
          {label}
        </span>
      </span>
      <Icon name="arrow-filled-down" size={20} className="shrink-0 text-grey-1000" />
    </button>
  ),
)

Dropdown.displayName = 'Dropdown'
