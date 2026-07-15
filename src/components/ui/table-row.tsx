import * as React from 'react'
import { clsx } from 'clsx'

// ─── Types ────────────────────────────────────────────────────────────────────

export type TableRowVariant = 'header' | 'body' | 'group'

export interface TableRowProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: TableRowVariant
  children?: React.ReactNode
}

// ─── Style map ────────────────────────────────────────────────────────────────
//
// Figma specs (node 719:30781, "Table") — this file covers only the row
// shell + generic column layout (see TableCell); the wide variety of column
// content (tags, buttons, progress meta, sparkle titles…) is assembled by
// consumers from existing components, since real tables mix these freely.
//
//   header  bg-grey-50               border-b border-grey-200, ~40px tall
//   body    bg-white,   real :hover  border-b border-grey-200, ~48–64px tall
//   group   bg-white                 border-b border-grey-200 (section/summary row)

const variantStyles: Record<TableRowVariant, string> = {
  header: 'bg-grey-50',
  body: 'bg-white transition-colors duration-100 hover:bg-grey-50',
  group: 'bg-white',
}

// ─── Component ────────────────────────────────────────────────────────────────

export const TableRow = React.forwardRef<HTMLDivElement, TableRowProps>(
  ({ variant = 'body', className, children, ...props }, ref) => (
    <div
      ref={ref}
      role="row"
      className={clsx(
        'flex w-full items-stretch border-b border-grey-200',
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
)

TableRow.displayName = 'TableRow'
