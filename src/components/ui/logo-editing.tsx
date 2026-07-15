import * as React from 'react'
import { clsx } from 'clsx'
import { Icon } from './icons/Icon'
import { Illustration } from './illustration'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LogoEditingProps {
  /** Uploaded logo URL. Omit to show the empty "no logo" placeholder. */
  src?: string
  alt?: string
  onClick?: () => void
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────
//
// Figma specs (node 3949:59242, "LogoEditing"):
//   64px square, rounded-md (8px)
//   Empty    border-grey-200 + bg-grey-50 + centered placeholder icon (40px)
//   Filled   uploaded logo image, object-cover, no border
//   Hover    dark overlay (grey-1000/20) + centered ic-edit (24px, white) —
//            same affordance whether empty or filled

export const LogoEditing = React.forwardRef<HTMLButtonElement, LogoEditingProps>(
  ({ src, alt = '', onClick, className }, ref) => {
    const hasLogo = Boolean(src)

    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        aria-label={hasLogo ? 'Change logo' : 'Upload logo'}
        className={clsx(
          'group relative size-16 shrink-0 cursor-pointer overflow-hidden rounded-md outline-none',
          !hasLogo && 'border border-grey-200 bg-grey-50',
          'focus-visible:ring-2 focus-visible:ring-orchid-1000 focus-visible:ring-offset-2',
          className,
        )}
      >
        {hasLogo ? (
          <img src={src} alt={alt} className="size-full object-cover" />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center">
            <Illustration name="image" size={40} />
          </span>
        )}

        <span
          className={clsx(
            'absolute inset-0 flex items-center justify-center rounded-md',
            'bg-grey-1000/20 opacity-0 transition-opacity duration-100',
            'group-hover:opacity-100',
          )}
          aria-hidden="true"
        >
          <Icon name="ic-edit" size={24} className="text-white" />
        </span>
      </button>
    )
  },
)

LogoEditing.displayName = 'LogoEditing'
