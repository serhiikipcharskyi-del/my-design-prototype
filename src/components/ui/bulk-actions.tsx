import * as React from 'react'
import { clsx } from 'clsx'
import { Checkbox } from './checkbox'
import { Button } from './button'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BulkAction {
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  /** Destructive styling — vibrant-coral text instead of white */
  destructive?: boolean
}

export interface BulkActionsProps {
  selectedCount: number
  /** Total selectable items — when given, the checkbox shows fully-checked once selectedCount reaches it */
  totalCount?: number
  /** Overrides the generated "N {itemLabel} selected" label */
  label?: React.ReactNode
  itemLabel?: string
  onSelectAll?: (checked: boolean) => void
  actions: BulkAction[]
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────
//
// Figma specs (node 3182:29993, "Bulk actions"):
//   Dark toolbar (bg-grey-1000), rounded-md, modal-style drop shadow
//   Left: checkbox (indeterminate while partially selected) + count label
//         (14px/Regular/24px, white)
//   Right: action buttons — the shared Button component (ghost variant, md
//          size), which is already styled for a dark/brand background;
//          `destructive` swaps its label/icon to vibrant-coral in place of
//          a heavier solid `dangerous` button.
//
//   Built generic on purpose (like EmptyState/ChatInput): `actions` is a plain
//   array so the same bar works for members, teams, tickets, or any other
//   selectable list — only the item label and actions change per use case.

export const BulkActions = React.forwardRef<HTMLDivElement, BulkActionsProps>(
  (
    { selectedCount, totalCount, label, itemLabel = 'items', onSelectAll, actions, className },
    ref,
  ) => {
    const allSelected = totalCount !== undefined && totalCount > 0 && selectedCount >= totalCount
    const indeterminate = selectedCount > 0 && !allSelected

    return (
      <div
        ref={ref}
        className={clsx(
          'flex w-full items-center justify-between rounded-md bg-grey-1000 px-4 py-3',
          'shadow-[8px_16px_24px_0px_rgba(90,102,118,0.16)]',
          className,
        )}
      >
        <div className="flex items-center gap-2">
          <Checkbox checked={allSelected} indeterminate={indeterminate} onChange={onSelectAll} />
          <span className="whitespace-nowrap font-sans text-body-l font-normal text-white">
            {label ?? `${selectedCount} ${itemLabel} selected`}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {actions.map((action, i) => (
            <Button
              key={i}
              variant="ghost"
              size="md"
              leftIcon={action.icon}
              destructive={action.destructive}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    )
  },
)

BulkActions.displayName = 'BulkActions'
