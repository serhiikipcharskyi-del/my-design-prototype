import * as React from 'react'
import { clsx } from 'clsx'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean
  onChange?: (checked: boolean) => void
}

// ─── Component ────────────────────────────────────────────────────────────────
//
// Figma specs (node 3949:26464):
//   Track: 40×24 px, rounded-full
//   Thumb: 20×20 px, rounded-full, bg-white, 2 px gap from track edges
//
//   Off   → track #E8E9EB (Figma "Gray-100"),  hover #e0e0e2 (grey-400)
//   On    → track orchid-1000 + white gradient overlay (same as primary button),
//            hover brightness-110
//
//   Thumb positions:
//     Off → translate-x = 2 px  (left gap)
//     On  → translate-x = 18 px (40 − 20 − 2)
//
//   Thumb shadow matches Figma depth: multi-layer drop shadow

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ checked = false, onChange, disabled, className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={clsx(
        'relative inline-flex h-6 w-10 shrink-0 cursor-pointer rounded-full',
        'outline-none transition-[background,filter] duration-200',
        'disabled:opacity-50 disabled:pointer-events-none',
        'focus-visible:ring-2 focus-visible:ring-orchid-1000 focus-visible:ring-offset-2',
        checked
          // gradient matches primary button: white sheen over orchid base
          ? '[background:linear-gradient(265deg,rgba(255,255,255,0.30)_0.6%,rgba(255,255,255,0)_135%),var(--color-orchid-1000)] hover:brightness-110'
          : 'bg-[#E8E9EB] hover:bg-grey-400',
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={clsx(
          'absolute top-0.5 h-5 w-5 rounded-full bg-white',
          // two-layer shadow: soft ambient + tight definition
          'shadow-[0_2px_4px_rgba(0,0,0,0.18),0_0_0_0.5px_rgba(0,0,0,0.06)]',
          'transition-transform duration-200',
          checked ? 'translate-x-[18px]' : 'translate-x-0.5',
        )}
      />
    </button>
  ),
)

Toggle.displayName = 'Toggle'
