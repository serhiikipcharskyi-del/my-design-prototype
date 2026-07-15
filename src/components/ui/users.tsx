import * as React from 'react'
import { clsx } from 'clsx'
import { Avatar } from './avatar'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UsersPerson {
  src?: string
  initials?: string
  alt?: string
}

export interface UsersProps {
  /** 'group' — overlapping avatar stack with a "+N" overflow badge. 'single' — one avatar + name. */
  type?: 'group' | 'single'
  /** 32px avatars (default). false renders the 24px compact size. */
  big?: boolean
  people: UsersPerson[]
  /** Max avatars shown before collapsing the rest into a "+N" badge — group only */
  maxVisible?: number
  /** Name shown next to the avatar — single only */
  name?: string
  /** Shows a "+N guests" label after the avatar stack — group only */
  showLabel?: boolean
  /** Overrides the generated overflow label text (defaults to "+N guests") */
  label?: string
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────
//
// Figma specs (node 2186:45175, "Users"):
//   Group   avatars overlap by 6px (-space-x-1.5), white ring for separation,
//           overflow badge = bg-grey-100 border-grey-400, text = grey-1000
//   Single  avatar + name, gap 6px
//   big=true → 32px avatars / Body M label   big=false → 24px avatars / Body S label

export const Users = React.forwardRef<HTMLDivElement, UsersProps>(
  (
    { type = 'group', big = true, people, maxVisible = 3, name, showLabel = false, label, className },
    ref,
  ) => {
    const avatarSize = big ? 32 : 24

    if (type === 'single') {
      const person = people[0]
      return (
        <div ref={ref} className={clsx('flex items-center gap-1.5', className)}>
          <Avatar src={person?.src} initials={person?.initials} alt={person?.alt ?? name} size={avatarSize} />
          <span className={clsx('font-sans font-medium text-grey-1000', big ? 'text-body-m' : 'text-body-s')}>
            {name}
          </span>
        </div>
      )
    }

    const visible = people.slice(0, maxVisible)
    const overflow = people.length - visible.length

    return (
      <div ref={ref} className={clsx('flex items-center gap-1', className)}>
        <div className="flex items-center -space-x-1.5">
          {visible.map((person, i) => (
            <Avatar
              key={i}
              src={person.src}
              initials={person.initials}
              alt={person.alt}
              size={avatarSize}
              className="ring-2 ring-white"
            />
          ))}

          {overflow > 0 && (
            <span
              className={clsx(
                'flex shrink-0 items-center justify-center rounded-full ring-2 ring-white',
                'border border-grey-400 bg-grey-100 font-sans font-semibold text-grey-1000',
                big ? 'text-[12px]' : 'text-[10px] uppercase',
              )}
              style={{ width: avatarSize, height: avatarSize }}
            >
              +{overflow}
            </span>
          )}
        </div>

        {showLabel && (
          <span className="whitespace-nowrap font-sans text-body-m font-medium text-grey-1000">
            {label ?? `+ ${overflow > 0 ? overflow : people.length} guests`}
          </span>
        )}
      </div>
    )
  },
)

Users.displayName = 'Users'
