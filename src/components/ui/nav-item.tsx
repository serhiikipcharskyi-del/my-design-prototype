import * as React from 'react'
import { clsx } from 'clsx'
import { Icon } from './icons/Icon'

// ─── Types ────────────────────────────────────────────────────────────────────

export type NavItemVariant = 'team' | 'menu' | 'profile' | 'action'

export interface NavItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: NavItemVariant
  /** false = collapsed sidebar rail — icon/avatar only, no label */
  expand?: boolean
  /** "menu" only — marks the active route (white pill + border) */
  selected?: boolean
  /** "menu" — leading nav icon. "action" — leading icon, defaults to ic-download */
  icon?: React.ReactNode
  /** "menu" label / "team" org name / "action" button label */
  label?: string
  /** "menu" — trailing keyboard-shortcut badge, e.g. "/" (expanded only) */
  shortcut?: string
  /** "team" — badge initials, e.g. "OR" */
  badge?: string
  /** "team" — badge background color (defaults to orchid-1000) */
  badgeColor?: string
  /** "profile" — avatar image URL */
  avatar?: string
  /** "profile" — display name */
  name?: string
  /** "profile" — email / secondary line */
  email?: string
}

// ─── Org badge — team variant ──────────────────────────────────────────────────

const OrgBadge = ({ badge, color = '#c95bc1' }: { badge: string; color?: string }) => (
  <span
    className="inline-flex size-5 shrink-0 items-center justify-center rounded-[3.33px] text-body-xs font-medium text-white"
    style={{
      background: `linear-gradient(-38.83deg, rgba(255,255,255,0) 16.44%, rgba(255,255,255,0.6) 94.43%), ${color}`,
    }}
    aria-hidden="true"
  >
    {badge}
  </span>
)

// ─── Component ────────────────────────────────────────────────────────────────
//
// Figma specs (node 719:26445):
//   Team    → h-9,  border-grey-200 bg-white shadow-sm    hover: border-grey-400
//             badge (OR) + org name + chevron, collapsed = badge only
//   Menu    → h-10, transparent                            hover: bg-grey-200
//             selected: bg-white border-grey-200 shadow-sm
//             icon + label, collapsed = icon only, centered
//   Profile → avatar + name/email + chevron                hover: bg-grey-100
//             collapsed = avatar only, centered
//   Action  → h-10, bg-white border-orchid-400              hover: bg-grey-50
//             icon (ic-download) + label, collapsed = icon only

export const NavItem = React.forwardRef<HTMLButtonElement, NavItemProps>(
  (
    {
      variant = 'menu',
      expand = true,
      selected = false,
      icon,
      label,
      shortcut,
      badge = 'OR',
      badgeColor,
      avatar,
      name,
      email,
      className,
      ...props
    },
    ref,
  ) => {
    const isTeam = variant === 'team'
    const isMenu = variant === 'menu'
    const isProfile = variant === 'profile'
    const isAction = variant === 'action'

    return (
      <button
        ref={ref}
        type="button"
        aria-current={isMenu && selected ? 'page' : undefined}
        className={clsx(
          'inline-flex shrink-0 items-center rounded-md outline-none',
          'transition-colors duration-100 cursor-pointer',
          'focus-visible:ring-2 focus-visible:ring-orchid-1000 focus-visible:ring-offset-2',

          // ── Team ──
          isTeam && [
            'h-9 gap-2 border bg-white shadow-[1px_1px_1px_rgba(0,0,0,0.06)]',
            'border-grey-200 hover:border-grey-400',
            expand ? 'w-full justify-start px-2' : 'w-9 justify-center',
          ],

          // ── Menu ──
          isMenu && [
            'h-10 gap-2 border',
            selected
              ? 'border-grey-200 bg-white shadow-[1px_1px_1px_rgba(0,0,0,0.06)]'
              : 'border-transparent hover:bg-grey-200',
            expand ? 'w-full justify-start px-3' : 'w-10 justify-center',
          ],

          // ── Profile ──
          isProfile && [
            'hover:bg-grey-100',
            expand ? 'w-full justify-start gap-3 px-2 py-1' : 'size-8 justify-center',
          ],

          // ── Action ──
          isAction && [
            'h-10 gap-2 border border-orchid-900 bg-white hover:bg-grey-50',
            expand ? 'w-full justify-center px-5' : 'w-10 justify-center',
          ],

          className,
        )}
        {...props}
      >
        {/* ── Team ── */}
        {isTeam && (
          <>
            <OrgBadge badge={badge} color={badgeColor} />
            {expand && (
              <>
                <span className="flex-1 min-w-0 truncate text-left text-body-m font-medium text-grey-1000">
                  {label}
                </span>
                <Icon name="ic-select" size={16} className="shrink-0 text-grey-800" />
              </>
            )}
          </>
        )}

        {/* ── Menu ── */}
        {isMenu && (
          <>
            {icon && (
              <span className="inline-flex size-5 shrink-0 items-center justify-center text-grey-1000" aria-hidden="true">
                {icon}
              </span>
            )}
            {expand && (
              <span className="flex-1 min-w-0 truncate text-left text-body-m font-medium text-grey-1000">
                {label}
              </span>
            )}
            {expand && shortcut && (
              <span className="flex h-6 w-[22px] shrink-0 items-center justify-center rounded-sm bg-grey-200 text-body-m font-medium text-grey-800">
                {shortcut}
              </span>
            )}
          </>
        )}

        {/* ── Profile ── */}
        {isProfile && (
          <>
            {avatar ? (
              <img src={avatar} alt="" className="size-8 shrink-0 rounded-full object-cover" aria-hidden="true" />
            ) : (
              <span className="size-8 shrink-0 rounded-full bg-grey-200" aria-hidden="true" />
            )}
            {expand && (
              <>
                <span className="flex flex-1 min-w-0 flex-col items-start gap-1">
                  <span className="w-full truncate text-left text-body-m font-semibold leading-[16px] text-grey-1000">
                    {name}
                  </span>
                  <span className="w-full truncate text-left text-body-s font-medium leading-[16px] text-grey-900">
                    {email}
                  </span>
                </span>
                <Icon name="ic-select" size={16} className="shrink-0 text-grey-800" />
              </>
            )}
          </>
        )}

        {/* ── Action ── */}
        {isAction && (
          <>
            <span className="inline-flex size-4 shrink-0 items-center justify-center text-[#0b0114]" aria-hidden="true">
              {icon ?? <Icon name="ic-download" size={16} />}
            </span>
            {expand && (
              <span className="truncate text-body-m font-medium text-[#0b0114]">{label}</span>
            )}
          </>
        )}
      </button>
    )
  },
)

NavItem.displayName = 'NavItem'
