import * as React from 'react'
import { clsx } from 'clsx'
import { Button } from './button'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface EmptyStateAction {
  label: string
  icon?: React.ReactNode
  onClick?: () => void
}

export interface EmptyStateProps {
  /** Illustration — typically an <EmptyStateIcon entity="..." />. Omit for none. */
  icon?: React.ReactNode
  title: string
  description?: string
  /** Secondary buttons rendered below the description. Varies by use case — 0 to N. */
  actions?: EmptyStateAction[]
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────
//
// Figma specs (node 3727:63143, "Empty State"):
//   Card: white bg, grey-200 border, radius-md (8px)
//   Title block max-width 600px, centered, gap-5 (20px)
//   Heading: 14px/Semi Bold/16px (text-h5)   Description: 12px/Medium/16px (text-body-s)
//   Actions: secondary buttons (lg), gap-3 (12px), wrap when they don't fit on one line

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, actions, className }, ref) => (
    <div
      ref={ref}
      className={clsx(
        'flex flex-col items-center rounded-md border border-grey-200 bg-white px-8 py-20',
        className,
      )}
    >
      <div className="flex w-full max-w-[600px] flex-col items-center gap-5">
        {icon}

        <div className="flex flex-col items-center gap-1.5 text-center">
          <p className="text-h5 font-semibold text-grey-1000">{title}</p>
          {description && (
            <p className="text-body-s font-medium text-grey-900">{description}</p>
          )}
        </div>

        {actions && actions.length > 0 && (
          <div className="flex flex-wrap items-start justify-center gap-3">
            {actions.map((action, i) => (
              <Button
                key={i}
                variant="secondary"
                size="lg"
                leftIcon={action.icon}
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  ),
)

EmptyState.displayName = 'EmptyState'
