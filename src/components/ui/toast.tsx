import * as React from 'react'
import { clsx } from 'clsx'
import { Icon } from './icons/Icon'
import { InfoCircleIcon, WarningCircleIcon, ErrorTriangleIcon } from './icons/pictograms'

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastType = 'success' | 'information' | 'warning' | 'error'

export interface ToastProps {
  type?: ToastType
  /** Message text — defaults to the type label ("Success", "Warning", ...) when omitted */
  message?: React.ReactNode
  onClose?: () => void
  className?: string
}

// ─── Style map ────────────────────────────────────────────────────────────────
//
// Figma specs (node 2986:54115, "Toast"):
//   bg-grey-1000, h-14 (56px), rounded-md, pl-4 pr-3, text 14px/Regular/24px white
//   icon 24px, colored per type   close button 16px, p-2, rounded-md

const typeConfig: Record<ToastType, { icon: React.ReactNode; label: string; color: string }> = {
  success: {
    icon: <Icon name="ic-check-circle" size={24} />,
    label: 'Success',
    color: 'text-variant-jungle-green',
  },
  information: {
    icon: <InfoCircleIcon size={24} />,
    label: 'Information',
    color: 'text-variant-cool-sky',
  },
  warning: {
    icon: <WarningCircleIcon size={24} />,
    label: 'Warning',
    color: 'text-variant-amber-glow',
  },
  error: {
    icon: <ErrorTriangleIcon size={24} />,
    label: 'Error',
    color: 'text-variant-vibrant-coral',
  },
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ type = 'success', message, onClose, className }, ref) => {
    const { icon, label, color } = typeConfig[type]

    return (
      <div
        ref={ref}
        role="status"
        className={clsx(
          'flex h-14 w-full max-w-[480px] items-center justify-between rounded-md bg-grey-1000 pl-4 pr-3',
          'shadow-[4px_8px_16px_0px_rgba(90,102,118,0.06)]',
          className,
        )}
      >
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={clsx('inline-flex shrink-0 items-center justify-center', color)}
            aria-hidden="true"
          >
            {icon}
          </span>
          <span className="truncate font-sans text-body-l font-normal text-white">
            {message ?? label}
          </span>
        </div>

        <button
          type="button"
          aria-label="Dismiss"
          onClick={onClose}
          className={clsx(
            'flex shrink-0 cursor-pointer items-center justify-center rounded-md p-2 text-white outline-none',
            'hover:bg-white/10',
            'focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-grey-1000',
          )}
        >
          <Icon name="ic-close" size={16} />
        </button>
      </div>
    )
  },
)

Toast.displayName = 'Toast'
