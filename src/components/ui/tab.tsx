import * as React from 'react'
import { clsx } from 'clsx'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TabProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Active/selected state — shows bottom border indicator */
  active?: boolean
  /** Badge count (renders a 20×20 pill) */
  badge?: React.ReactNode
  /** Icon before the label */
  leftIcon?: React.ReactNode
  /** Icon after the label */
  rightIcon?: React.ReactNode
}

export interface TabListProps {
  children: React.ReactNode
  className?: string
}

// ─── Tab ──────────────────────────────────────────────────────────────────────
//
// Figma specs (node 319:6610):
//   Outer: px-1 (4px) py-1.5 (6px), border-b-2 active indicator
//   Inner label: h-7 (28px), px-2 (8px), py-1 (4px), gap-1.5 (6px), rounded-sm
//                hover → bg-grey-100
//   Text: 13px / Medium (Body/M)
//     active  → text-grey-1000
//     inactive → text-grey-900
//   Badge: 20×20px, rounded-sm (4px), 12px / Medium (Body/S)
//     active  → bg-grey-1000 text-white
//     inactive → bg-grey-50  text-grey-900
//   Icons: 16×16px

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  (
    { active = false, badge, leftIcon, rightIcon, children, className, ...props },
    ref,
  ) => (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={active}
      className={clsx(
        // outer wrapper — holds the bottom-border indicator
        'group inline-flex items-center px-1 py-1.5',
        'cursor-pointer select-none outline-none',
        'disabled:opacity-50 disabled:pointer-events-none',
        // always reserve border space so height never shifts
        active ? 'border-b-2 border-grey-1000' : 'border-b-2 border-transparent',
        className,
      )}
      {...props}
    >
      <span
        className={clsx(
          // inner label container — gets the hover background
          'inline-flex items-center gap-1.5 h-7 px-2 py-1 rounded-sm',
          'font-sans text-body-m font-medium whitespace-nowrap',
          'transition-colors duration-100',
          'group-hover:bg-grey-100',
          'group-focus-visible:ring-2 group-focus-visible:ring-orchid-1000 group-focus-visible:ring-offset-1',
          active ? 'text-grey-1000' : 'text-grey-900',
        )}
      >
        {leftIcon && (
          <span
            className="shrink-0 inline-flex items-center justify-center h-4 w-4"
            aria-hidden="true"
          >
            {leftIcon}
          </span>
        )}

        {children}

        {rightIcon && (
          <span
            className="shrink-0 inline-flex items-center justify-center h-4 w-4"
            aria-hidden="true"
          >
            {rightIcon}
          </span>
        )}

        {badge !== undefined && (
          <span
            className={clsx(
              'inline-flex items-center justify-center shrink-0',
              'h-5 w-5 rounded-sm font-sans text-body-s font-medium',
              active ? 'bg-grey-1000 text-white' : 'bg-grey-50 text-grey-900',
            )}
          >
            {badge}
          </span>
        )}
      </span>
    </button>
  ),
)

Tab.displayName = 'Tab'

// ─── TabList ──────────────────────────────────────────────────────────────────
//
// Horizontal container for Tab items.
// The bottom border acts as the track; active Tab's border-b-2 overlaps it.

export const TabList = ({ children, className }: TabListProps) => (
  <div
    role="tablist"
    className={clsx(
      'inline-flex items-end border-b border-grey-200',
      className,
    )}
  >
    {children}
  </div>
)
