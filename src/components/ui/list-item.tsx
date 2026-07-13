import * as React from 'react'
import { clsx } from 'clsx'
import { Icon } from './icons/Icon'
import { Checkbox } from './checkbox'

// ─── Types ────────────────────────────────────────────────────────────────────

export type ListItemVariant = 'simple' | 'team' | 'member'

export interface ListItemProps {
  /** Visual variant — drives layout and left content */
  variant?: ListItemVariant
  /** Primary label text */
  label: string
  /** Subtitle / meta line below the label
   *  - team:   e.g. "ORG • 20 members"
   *  - member: e.g. "m.g.freund@aol.com"
   */
  subtitle?: string
  /** Leading icon (Simple variant only) */
  leftIcon?: React.ReactNode
  /** Initials shown inside the gradient badge (Team variant) */
  initials?: string
  /** Avatar image URL (Member variant) */
  avatar?: string
  /** Shows a ✓ on the right — indicates the item is currently selected */
  selected?: boolean
  /** Render a Checkbox on the far left */
  showCheckbox?: boolean
  /** Checkbox checked state (requires showCheckbox) */
  checked?: boolean
  /** Checkbox change handler */
  onCheckedChange?: (checked: boolean) => void
  onClick?: () => void
  className?: string
}

// ─── Team badge ───────────────────────────────────────────────────────────────
//
// Figma: 32×32 px, rounded-md, orchid gradient fill identical to primary button,
// white semibold 14px initial(s).

const TeamBadge = ({ initials }: { initials: string }) => (
  <span
    className="inline-flex shrink-0 h-8 w-8 items-center justify-center rounded-md text-white font-semibold text-h5"
    style={{
      background:
        'linear-gradient(-38.83deg, rgba(255,255,255,0) 16.44%, rgba(255,255,255,0.6) 94.43%), #c95bc1',
    }}
    aria-hidden="true"
  >
    {initials}
  </span>
)

// ─── Component ────────────────────────────────────────────────────────────────
//
// Figma specs (node 324:16134):
//   Simple  → h=36px,     pl=12px pr=8px, gap=8px
//   Team    → min-h=52px, px=8px,         gap=8px
//   Member  → min-h=52px, px=8px,         gap=8px
//
//   Default bg: white   |  Hover bg: grey-100
//   Label:   13px / Medium / grey-1000
//   Subtitle: 12px / Medium / grey-800
//   Right check icon: ic-check 16px, grey-800 — visible when selected

export const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  (
    {
      variant = 'simple',
      label,
      subtitle,
      leftIcon,
      initials,
      avatar,
      selected = false,
      showCheckbox = false,
      checked = false,
      onCheckedChange,
      onClick,
      className,
    },
    ref,
  ) => {
    const isSimple = variant === 'simple'
    const isTeam   = variant === 'team'
    const isMember = variant === 'member'

    return (
      <div
        ref={ref}
        onClick={onClick}
        role={onClick ? 'option' : undefined}
        aria-selected={onClick ? selected : undefined}
        className={clsx(
          'flex w-full items-center gap-2 cursor-pointer select-none',
          'bg-white hover:bg-grey-100 transition-colors duration-100 outline-none',
          isSimple
            ? 'h-9 pl-3 pr-2'
            : 'min-h-[52px] px-2 py-2',
          className,
        )}
      >
        {/* ── Far-left checkbox ── */}
        {showCheckbox && (
          <span
            onClick={e => e.stopPropagation()}
            className="shrink-0 inline-flex items-center self-center"
          >
            <Checkbox
              checked={checked}
              onChange={onCheckedChange}
            />
          </span>
        )}

        {/* ── Simple: optional leading icon ── */}
        {isSimple && leftIcon && (
          <span
            className="shrink-0 inline-flex h-5 w-5 items-center justify-center text-grey-800"
            aria-hidden="true"
          >
            {leftIcon}
          </span>
        )}

        {/* ── Team: gradient badge ── */}
        {isTeam && initials && <TeamBadge initials={initials} />}

        {/* ── Member: avatar ── */}
        {isMember && avatar && (
          <img
            src={avatar}
            alt=""
            className="shrink-0 h-8 w-8 rounded-full object-cover"
            aria-hidden="true"
          />
        )}

        {/* ── Content ── */}
        <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
          <span className="text-body-m font-medium text-grey-1000 truncate leading-[18px]">
            {label}
          </span>
          {subtitle && (
            <span className="text-body-s font-medium text-grey-800 truncate leading-[16px]">
              {subtitle}
            </span>
          )}
        </div>

        {/* ── Right check (selected indicator) ── */}
        <span
          className={clsx(
            'shrink-0 inline-flex h-4 w-4 items-center justify-center text-grey-800',
            'transition-opacity duration-100',
            selected ? 'opacity-100' : 'opacity-0',
          )}
          aria-hidden="true"
        >
          <Icon name="ic-check" size={16} />
        </span>
      </div>
    )
  },
)

ListItem.displayName = 'ListItem'
