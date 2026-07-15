import * as React from 'react'
import { clsx } from 'clsx'

// ─── Types ────────────────────────────────────────────────────────────────────

export type TableCellAlign = 'left' | 'center' | 'right'

export interface TableCellProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Fixed column width (px number or any CSS width) */
  width?: number | string
  minWidth?: number | string
  maxWidth?: number | string
  /** Column fills remaining row space instead of using a fixed width */
  grow?: boolean
  align?: TableCellAlign
  children?: React.ReactNode
}

// ─── Component ────────────────────────────────────────────────────────────────
//
// Figma specs (node 719:30781): every column is `px-4 py-2` (16/8px) with
// `gap-2`, vertically centered — width/grow/align vary per column and per
// row type (header vs. process vs. opportunity), so those are left to the
// caller rather than baked in here.

export const TableCell = React.forwardRef<HTMLDivElement, TableCellProps>(
  ({ width, minWidth, maxWidth, grow = false, align = 'left', className, style, children, ...props }, ref) => (
    <div
      ref={ref}
      role="cell"
      className={clsx(
        'flex h-full min-w-0 items-center gap-2 px-4 py-2',
        grow && 'flex-1',
        align === 'right' && 'justify-end text-right',
        align === 'center' && 'justify-center text-center',
        className,
      )}
      style={{
        width: grow ? undefined : width,
        minWidth,
        maxWidth,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  ),
)

TableCell.displayName = 'TableCell'
