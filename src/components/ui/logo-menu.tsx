import * as React from 'react'
import Image from 'next/image'
import { clsx } from 'clsx'
import { Icon } from './icons/Icon'
import logoMark from './logo-mark.png'

// ─── Types ────────────────────────────────────────────────────────────────────

export type LogoMenuProps = React.ButtonHTMLAttributes<HTMLButtonElement>

// ─── Component ────────────────────────────────────────────────────────────────
//
// Figma verified (node 324:12390):
//   Default  Worktrace logo mark, no background
//   Hover    bg=grey-200  radius=6px  logo swaps for the sidebar-collapse icon
//            (ic_close_layout_left in Figma — identical vector to our ic-close-layout)

export const LogoMenu = React.forwardRef<HTMLButtonElement, LogoMenuProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label="Toggle sidebar"
      className={clsx(
        'group inline-flex items-center justify-center shrink-0',
        'size-8 rounded-[6px] cursor-pointer outline-none',
        'hover:bg-grey-200',
        'focus-visible:ring-2 focus-visible:ring-orchid-1000 focus-visible:ring-offset-2',
        className,
      )}
      {...props}
    >
      <span className="relative size-7 group-hover:hidden">
        <Image src={logoMark} alt="Worktrace" fill className="object-contain" />
      </span>
      {/* Icon sets its own inline `display` style, which would beat a
          `hidden` class placed directly on it — toggle visibility on this
          wrapper span instead so default/hover never show both at once. */}
      <span className="hidden group-hover:flex items-center justify-center">
        <Icon name="ic-close-layout" size={16} />
      </span>
    </button>
  ),
)

LogoMenu.displayName = 'LogoMenu'
