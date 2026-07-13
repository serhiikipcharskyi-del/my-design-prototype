import * as React from 'react'
import { clsx } from 'clsx'
import { Icon } from './icons/Icon'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BreadcrumbProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Marks this as the current/active crumb — darker text */
  active?: boolean
  /** Leading chevron (hide on the first crumb in a trail) */
  leftIcon?: boolean
  /** Trailing chevron (hide on the last crumb in a trail) */
  rightIcon?: boolean
}

// ─── Component ────────────────────────────────────────────────────────────────
//
// Figma verified (node 203:4035):
//   Not active  label=grey-900  bg=transparent          hover: bg=grey-100
//   Active      label=grey-950  bg=transparent          hover: bg=grey-100
//   Icons: arrow-simple-left / arrow-simple-right, 20px, color follows label

export const Breadcrumb = React.forwardRef<HTMLButtonElement, BreadcrumbProps>(
  (
    { active = false, leftIcon = true, rightIcon = true, children, className, ...props },
    ref,
  ) => (
    <button
      ref={ref}
      type="button"
      className={clsx(
        'inline-flex items-center justify-center gap-2 h-8 p-2 rounded-md',
        'font-sans select-none whitespace-nowrap cursor-pointer',
        'transition-colors duration-150 outline-none',
        'hover:bg-grey-100',
        'focus-visible:ring-2 focus-visible:ring-orchid-1000 focus-visible:ring-offset-2',
        active ? 'text-grey-950' : 'text-grey-900',
        className,
      )}
      {...props}
    >
      {leftIcon && <Icon name="arrow-simple-left" size={20} />}
      {children && <span className="text-body-m font-medium">{children}</span>}
      {rightIcon && <Icon name="arrow-simple-right" size={20} />}
    </button>
  ),
)

Breadcrumb.displayName = 'Breadcrumb'
