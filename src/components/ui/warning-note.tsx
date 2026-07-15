import * as React from 'react'
import { clsx } from 'clsx'
import { Icon } from './icons/Icon'

// ─── Types ────────────────────────────────────────────────────────────────────

export type WarningNoteType = 'attention' | 'warning'

export interface WarningNoteProps {
  type?: WarningNoteType
  children: React.ReactNode
  className?: string
}

// ─── Style map ────────────────────────────────────────────────────────────────
//
// Figma specs (node 4328:53631, "WarningNote"):
//   Inline banner, rounded-md (8px), px-3 py-2, gap-6 (6px), text-body-m
//   Attention  bg-[#fff8f0]   text/icon = variant-autumn-ember (#b75f17)
//   Warning    bg-tag-red-600 text/icon = variant-fiery-terracotta (#f74b3b)

const typeStyles: Record<WarningNoteType, string> = {
  attention: 'bg-[#fff8f0] text-variant-autumn-ember',
  warning: 'bg-tag-red-600 text-variant-fiery-terracotta',
}

// ─── Component ────────────────────────────────────────────────────────────────

export const WarningNote = React.forwardRef<HTMLDivElement, WarningNoteProps>(
  ({ type = 'attention', children, className }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={clsx(
        'flex w-full items-center gap-1.5 rounded-md px-3 py-2',
        typeStyles[type],
        className,
      )}
    >
      <Icon name="ic-warning" size={20} className="shrink-0" />
      <p className="font-sans text-body-m font-medium">{children}</p>
    </div>
  ),
)

WarningNote.displayName = 'WarningNote'
