import * as React from 'react'
import { clsx } from 'clsx'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SegmentControlItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Marks this item as the selected segment */
  active?: boolean
  /** Icon-only mode — 32×32 square, no label */
  iconOnly?: boolean
  /** Icon displayed in icon-only mode */
  icon?: React.ReactNode
}

export interface SegmentControlOption<T extends string = string> {
  value: T
  label: React.ReactNode
  icon?: React.ReactNode
  iconOnly?: boolean
}

export interface SegmentControlProps<T extends string = string> {
  value: T
  onChange: (value: T) => void
  options: SegmentControlOption<T>[]
  className?: string
}

// ─── SegmentControlItem ───────────────────────────────────────────────────────
//
// Figma specs (node 203:4260 / 203:4329):
//   h = 36px (fills 40px container with 2px padding), border-radius = 6px
//   px = 12px, gap = 6px
//   active   → bg-white      text-grey-1000
//   inactive → bg-grey-100   text-grey-900   hover → bg-grey-200
//   icon-only → w-32px, h fills container, 20px icon inside

export const SegmentControlItem = React.forwardRef<
  HTMLButtonElement,
  SegmentControlItemProps
>(
  (
    { active = false, iconOnly = false, icon, children, className, ...props },
    ref,
  ) => (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={active}
      className={clsx(
        'relative inline-flex items-center justify-center',
        'rounded-[6px] cursor-pointer select-none whitespace-nowrap',
        'text-body-m font-medium font-sans',
        'transition-colors duration-100 outline-none',
        'focus-visible:ring-2 focus-visible:ring-orchid-1000 focus-visible:ring-offset-1',
        'disabled:opacity-50 disabled:pointer-events-none',
        iconOnly ? 'h-[36px] w-8' : 'h-[36px] gap-1.5 px-3',
        active
          ? 'bg-white text-grey-1000'
          : 'bg-grey-100 text-grey-900 hover:bg-grey-200',
        className,
      )}
      {...props}
    >
      {iconOnly ? (
        <span
          className="inline-flex items-center justify-center shrink-0 h-5 w-5"
          aria-hidden="true"
        >
          {icon}
        </span>
      ) : (
        children
      )}
    </button>
  ),
)

SegmentControlItem.displayName = 'SegmentControlItem'

// ─── SegmentControl ───────────────────────────────────────────────────────────
//
// Figma specs (node 203:4329):
//   h = 40px, bg-grey-100, padding = 2px, rounded = 8px (radius-md), no gap

export function SegmentControl<T extends string = string>({
  value,
  onChange,
  options,
  className,
}: SegmentControlProps<T>) {
  return (
    <div
      role="tablist"
      className={clsx(
        'inline-flex items-center h-10 p-0.5 rounded-md bg-grey-100',
        className,
      )}
    >
      {options.map(opt => (
        <SegmentControlItem
          key={String(opt.value)}
          active={opt.value === value}
          iconOnly={opt.iconOnly}
          icon={opt.icon}
          onClick={() => onChange(opt.value)}
          aria-label={
            opt.iconOnly && typeof opt.label === 'string' ? opt.label : undefined
          }
        >
          {opt.label}
        </SegmentControlItem>
      ))}
    </div>
  )
}
