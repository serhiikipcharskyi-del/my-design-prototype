import * as React from 'react'
import { clsx } from 'clsx'
import { Icon } from './icons/Icon'

// ─── Types ────────────────────────────────────────────────────────────────────

export type TagVariant =
  | 'high'    // orchid bg + dark-orchid text
  | 'med'     // blue-lavender bg + dark-blue text
  | 'low'     // sky bg + dark-teal text
  | 'na'      // white bg + grey text (label: "Skip")
  | 'alert'   // red bg + dark-red text
  | 'success' // green bg + dark-green text
  | 'grey'    // grey bg + grey text
  | 'team'    // white bordered bg + colored dot + label
  | 'member'  // grey bg + avatar + name

export interface TagProps {
  variant?: TagVariant
  /** Tag label */
  children: React.ReactNode
  /** Show × remove button */
  onRemove?: () => void
  /** Avatar image URL — used with 'member' variant */
  avatar?: string
  /** Bullet dot color (CSS value) — used with 'team' variant */
  dotColor?: string
  className?: string
}

// ─── Style maps ───────────────────────────────────────────────────────────────
//
// Figma specs (node 214:2259):
//   All tags: inline-flex items-center gap-1 rounded-sm (4px)
//   Text tags: px-2 py-1  |  member: p-1  |  text 12px / Medium
//
//   high    bg=orchid-200    text=#652e61 (tag-orchid-900)
//   med     bg=#dbe3fe       text=#25397d (tag-blue-900)
//   low     bg=#daf5ff       text=#236680 (tag-sky-900)
//   na      bg=white         text=grey-1000
//   alert   bg=tag-red-600   text=tag-red-900
//   success bg=tag-green-600 text=tag-green-900
//   grey    bg=grey-100      text=grey-1000
//   team    bg=white border-grey-200 + 6px dot + text=grey-1000
//   member  bg=grey-100 p-1 + 20px avatar + text=grey-1000

type VariantStyle = { wrapper: string; label: string }

const variantStyles: Record<TagVariant, VariantStyle> = {
  high:    { wrapper: 'bg-orchid-200 px-2 py-1',           label: 'text-tag-orchid-900' },
  med:     { wrapper: 'bg-tag-blue-200 px-2 py-1',         label: 'text-tag-blue-900'   },
  low:     { wrapper: 'bg-tag-sky-200 px-2 py-1',          label: 'text-tag-sky-900'    },
  na:      { wrapper: 'bg-white px-2 py-1',                label: 'text-grey-1000'      },
  alert:   { wrapper: 'bg-tag-red-600 px-2 py-1',          label: 'text-tag-red-900'    },
  success: { wrapper: 'bg-tag-green-600 px-2 py-1',        label: 'text-tag-green-900'  },
  grey:    { wrapper: 'bg-grey-100 px-2 py-1',             label: 'text-grey-1000'      },
  team:    { wrapper: 'bg-white border border-grey-200 px-2 py-1', label: 'text-grey-1000' },
  member:  { wrapper: 'bg-grey-100 p-1',                   label: 'text-grey-1000'      },
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  (
    {
      variant = 'grey',
      children,
      onRemove,
      avatar,
      dotColor = '#c95bc1',
      className,
    },
    ref,
  ) => {
    const { wrapper, label } = variantStyles[variant]

    return (
      <div
        ref={ref}
        className={clsx(
          'inline-flex items-center gap-1 rounded-sm',
          'font-sans text-body-s font-medium whitespace-nowrap',
          wrapper,
          className,
        )}
      >
        {/* Team variant — colored bullet dot */}
        {variant === 'team' && (
          <span
            className="shrink-0 rounded-full"
            style={{ width: 6, height: 6, background: dotColor }}
            aria-hidden="true"
          />
        )}

        {/* Member variant — avatar */}
        {variant === 'member' && avatar && (
          <img
            src={avatar}
            alt=""
            className="shrink-0 rounded-full object-cover"
            style={{ width: 20, height: 20 }}
            aria-hidden="true"
          />
        )}

        {/* Label */}
        <span className={label}>{children}</span>

        {/* Remove button — team / member only */}
        {onRemove && (variant === 'team' || variant === 'member') && (
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove"
            className={clsx(
              'shrink-0 inline-flex items-center justify-center',
              // h-4 = 16px = text line-height → button never expands the tag height
              'h-4 w-4 rounded-sm cursor-pointer',
              'text-grey-900 hover:text-grey-1000 hover:bg-grey-200',
              'transition-colors duration-100 outline-none',
              'focus-visible:ring-1 focus-visible:ring-orchid-1000',
            )}
          >
            <Icon name="ic-close" size={12} />
          </button>
        )}
      </div>
    )
  },
)

Tag.displayName = 'Tag'
