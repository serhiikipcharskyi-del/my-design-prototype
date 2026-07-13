import * as React from 'react'
import { clsx } from 'clsx'
import { Icon } from './icons/Icon'

// ─── Types ────────────────────────────────────────────────────────────────────

export type AvatarSize = 16 | 20 | 24 | 32 | 36 | 40 | 48 | 56 | 64 | 80 | 160

export interface AvatarProps {
  /** Image URL — renders a photo avatar. Falls back to initials, then a generic icon. */
  src?: string
  alt?: string
  /** Two-letter fallback shown when no image is available */
  initials?: string
  size?: AvatarSize
  /** Shows a dark overlay + edit icon on hover — for uploadable avatars (requires `src`) */
  editable?: boolean
  /** Name shown in a tooltip above the avatar on hover */
  tooltip?: string
  className?: string
}

// ─── Fallback icon ────────────────────────────────────────────────────────────
//
// Generic filled person glyph — used when neither `src` nor `initials` is given.
// Not part of the shared (auto-generated) icon set, since it's Avatar-specific.

const PersonIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.418 0-9 2.239-9 5v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2c0-2.761-4.582-5-9-5Z"
    />
  </svg>
)

// ─── Style maps ───────────────────────────────────────────────────────────────
//
// Figma specs (node 2186:45055):
//   Container: circle, bg=tag-teal-100 for initials/icon fallback, none for image
//   Initials: font-semibold, uppercase below 32px, size scales with avatar size
//   Edit affordance: dark overlay (grey-1000/40) + ic-edit, shown on hover
//   Tooltip: grey-1000 bg, white text, 4px radius, small arrow, positioned above

const textSizeClasses: Record<AvatarSize, string> = {
  16: 'text-[8px] uppercase',
  20: 'text-[9px] uppercase',
  24: 'text-[10px] uppercase',
  32: 'text-[12px]',
  36: 'text-[12px]',
  40: 'text-[16px]',
  48: 'text-[18px]',
  56: 'text-[20px]',
  64: 'text-[24px]',
  80: 'text-[30px]',
  160: 'text-[60px]',
}

const fallbackIconSizes: Record<AvatarSize, number> = {
  16: 16,
  20: 13,
  24: 16,
  32: 20,
  36: 22,
  40: 24,
  48: 28,
  56: 32,
  64: 36,
  80: 44,
  160: 88,
}

const editIconSizes: Record<AvatarSize, number> = {
  16: 8,
  20: 10,
  24: 12,
  32: 14,
  36: 16,
  40: 16,
  48: 18,
  56: 20,
  64: 20,
  80: 24,
  160: 40,
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt = '', initials, size = 40, editable = false, tooltip, className }, ref) => {
    const showImage = Boolean(src)

    return (
      <div ref={ref} className={clsx('group relative inline-flex shrink-0', className)}>
        <div
          className={clsx('relative shrink-0 overflow-hidden rounded-full', !showImage && 'bg-tag-teal-100')}
          style={{ width: size, height: size }}
        >
          {showImage ? (
            <img src={src} alt={alt} className="size-full object-cover" />
          ) : initials ? (
            <span
              className={clsx(
                'absolute inset-0 flex items-center justify-center',
                'font-sans font-semibold text-grey-1000',
                textSizeClasses[size],
              )}
            >
              {initials}
            </span>
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-grey-1000">
              <PersonIcon size={fallbackIconSizes[size]} />
            </span>
          )}

          {editable && showImage && (
            <div
              className={clsx(
                'absolute inset-0 flex items-center justify-center rounded-full',
                'bg-grey-1000/40 opacity-0 transition-opacity duration-100',
                'group-hover:opacity-100',
              )}
              aria-hidden="true"
            >
              <Icon name="ic-edit" size={editIconSizes[size]} className="text-white" />
            </div>
          )}
        </div>

        {tooltip && (
          <div
            className={clsx(
              'absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2',
              'flex flex-col items-center',
              'pointer-events-none opacity-0 transition-opacity duration-100',
              'group-hover:opacity-100',
            )}
            role="tooltip"
          >
            <span className="whitespace-nowrap rounded-sm bg-grey-1000 px-2 py-1.5 text-body-s font-medium text-white">
              {tooltip}
            </span>
            <span className="-mt-[3px] size-1.5 rotate-45 bg-grey-1000" aria-hidden="true" />
          </div>
        )}
      </div>
    )
  },
)

Avatar.displayName = 'Avatar'
