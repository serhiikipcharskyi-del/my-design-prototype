import * as React from 'react'
import { clsx } from 'clsx'
import { Icon } from './icons/Icon'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PaginatorProps {
  currentPage: number
  totalPages: number
  onPageChange?: (page: number) => void
  rowsPerPage: number
  rowsPerPageOptions?: number[]
  onRowsPerPageChange?: (rows: number) => void
  className?: string
}

type PageItem = { page: number; ellipsis?: false; jump?: boolean } | { ellipsis: true }

// ─── Page range ───────────────────────────────────────────────────────────────
//
// Figma only demonstrates one case (page 1 of 9 → "1 2 …9"): the current page
// and its immediate sibling shown individually, then any remaining gap before
// the last page collapses into a single clickable "…N" button (not a plain
// ellipsis + separate last-page button). A symmetric leading ellipsis is used
// when the window doesn't reach page 1, since Figma doesn't cover that case
// but it's the standard, safe convention.

function getPageItems(current: number, total: number, siblingCount = 1): PageItem[] {
  const left = Math.max(1, current - siblingCount)
  const right = Math.min(total, current + siblingCount)

  const items: PageItem[] = []
  for (let page = left; page <= right; page++) items.push({ page })

  if (right < total) {
    items.push(right === total - 1 ? { page: total } : { page: total, jump: true })
  }
  if (left > 1) {
    const prefix: PageItem[] = [{ page: 1 }]
    if (left > 2) prefix.push({ ellipsis: true })
    items.unshift(...prefix)
  }
  return items
}

// ─── Component ────────────────────────────────────────────────────────────────
//
// Figma specs (node 719:31300, "Paginator Row"):
//   Rows per page: label (13px/Medium) + h-10 select trigger, border-grey-200,
//     rounded-md, arrow-filled-down (20px)
//   Paginator: prev/next arrow-simple buttons (p-2, rounded-md, 16px icon),
//     page items 32×32 rounded-sm (4px), active = bg-orchid-1000/text-white,
//     inactive = bg-white border-grey-200/text-grey-800, jump item 40×32 no border

export const Paginator = ({
  currentPage,
  totalPages,
  onPageChange,
  rowsPerPage,
  rowsPerPageOptions = [10, 20, 50, 100],
  onRowsPerPageChange,
  className,
}: PaginatorProps) => {
  const items = React.useMemo(
    () => getPageItems(currentPage, totalPages),
    [currentPage, totalPages],
  )

  return (
    <div className={clsx('flex w-full items-center justify-between', className)}>
      <div className="flex items-center gap-4">
        <span className="text-body-m font-medium text-grey-1000">Rows per page</span>
        <div className="relative inline-flex h-10 items-center gap-1.5 rounded-md border border-grey-200 bg-white py-2.5 pl-4 pr-2">
          <select
            value={rowsPerPage}
            onChange={e => onRowsPerPageChange?.(Number(e.target.value))}
            className="cursor-pointer appearance-none bg-transparent pr-5 font-sans text-body-m font-medium text-grey-1000 outline-none"
          >
            {rowsPerPageOptions.map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <Icon
            name="arrow-filled-down"
            size={20}
            className="pointer-events-none absolute right-2 text-grey-1000"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Previous page"
          disabled={currentPage <= 1}
          onClick={() => onPageChange?.(currentPage - 1)}
          className={clsx(
            'flex items-center justify-center gap-1 rounded-md p-2 cursor-pointer outline-none',
            'hover:bg-grey-100 disabled:opacity-40 disabled:pointer-events-none',
            'focus-visible:ring-2 focus-visible:ring-orchid-1000 focus-visible:ring-offset-1',
          )}
        >
          <Icon name="arrow-simple-left" size={16} className="text-grey-1000" />
        </button>

        <div className="flex items-start gap-2">
          {items.map((item, i) =>
            item.ellipsis ? (
              <span
                key={`ellipsis-${i}`}
                className="flex h-8 w-8 items-center justify-center text-body-s font-medium text-grey-800"
              >
                …
              </span>
            ) : (
              <button
                key={item.page}
                type="button"
                aria-label={`Page ${item.page}`}
                aria-current={item.page === currentPage ? 'page' : undefined}
                onClick={() => onPageChange?.(item.page)}
                className={clsx(
                  'flex h-8 shrink-0 cursor-pointer items-center justify-center rounded-sm outline-none',
                  'text-body-s font-medium',
                  'focus-visible:ring-2 focus-visible:ring-orchid-1000 focus-visible:ring-offset-1',
                  item.page === currentPage
                    ? 'w-8 bg-orchid-1000 text-white'
                    : item.jump
                      ? 'w-10 bg-white text-grey-800 hover:bg-grey-100'
                      : 'w-8 border border-grey-200 bg-white text-grey-800 hover:bg-grey-100',
                )}
              >
                {item.jump ? `…${item.page}` : item.page}
              </button>
            ),
          )}
        </div>

        <button
          type="button"
          aria-label="Next page"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange?.(currentPage + 1)}
          className={clsx(
            'flex items-center justify-center gap-1 rounded-md p-2 cursor-pointer outline-none',
            'hover:bg-grey-100 disabled:opacity-40 disabled:pointer-events-none',
            'focus-visible:ring-2 focus-visible:ring-orchid-1000 focus-visible:ring-offset-1',
          )}
        >
          <Icon name="arrow-simple-right" size={16} className="text-grey-1000" />
        </button>
      </div>
    </div>
  )
}
