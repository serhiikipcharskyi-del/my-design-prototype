import * as React from 'react'
import { clsx } from 'clsx'
import { Icon } from './icons/Icon'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ChatSuggestionProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Suggestion label text */
  label: string
  /** Leading icon — defaults to ic-decide */
  icon?: React.ReactNode
}

// ─── Component ────────────────────────────────────────────────────────────────
//
// Figma specs (node 319:6767):
//   Row: w-full, gap-8px, p-4px, rounded-md         default: transparent   hover: bg-grey-200
//   Icon badge: 28px, bg-white, rounded-full, 16px icon centered
//   Label: 13px Medium, text-[#5a5a5a] (color/charcoal/900)

export const ChatSuggestion = React.forwardRef<HTMLButtonElement, ChatSuggestionProps>(
  ({ label, icon, className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={clsx(
        'flex w-full items-center gap-2 rounded-md p-1',
        'cursor-pointer outline-none transition-colors duration-100',
        'hover:bg-grey-200',
        'focus-visible:ring-2 focus-visible:ring-orchid-1000 focus-visible:ring-offset-2',
        className,
      )}
      {...props}
    >
      <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-grey-1000">
        {icon ?? <Icon name="ic-decide" size={16} />}
      </span>
      <span className="min-w-0 flex-1 truncate text-left text-body-m font-medium text-[#5a5a5a]">
        {label}
      </span>
    </button>
  ),
)

ChatSuggestion.displayName = 'ChatSuggestion'
