import * as React from 'react'
import { clsx } from 'clsx'

// ─── Types ────────────────────────────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'lg' | 'md' | 'sm'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Square icon-only button — hides children label, requires aria-label */
  iconOnly?: boolean
  /** Icon rendered before the label */
  leftIcon?: React.ReactNode
  /** Icon rendered after the label */
  rightIcon?: React.ReactNode
  /** Shows a spinner and blocks interaction */
  loading?: boolean
}

// ─── Spinner ─────────────────────────────────────────────────────────────────

const Spinner = ({ className }: { className?: string }) => (
  <svg
    className={clsx('animate-spin', className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
)

// ─── Style maps ───────────────────────────────────────────────────────────────
//
// Figma verified values:
//   Primary   bg=orchid-1000  icon=white(always)  label=green→white(hover)
//   Secondary bg=white        icon=grey-1000       label=grey-950
//   Ghost     bg=transparent  icon=white           label=white
//
// Icon and label carry different colors in Primary → use `group` + separate spans.

type VariantStyle = { button: string; label: string; icon: string }

const variantStyles: Record<ButtonVariant, VariantStyle> = {
  primary: {
    button: clsx(
      'bg-orchid-1000 border border-transparent',
      'hover:brightness-95 active:brightness-90',
      'focus-visible:ring-2 focus-visible:ring-orchid-1000 focus-visible:ring-offset-2',
    ),
    // Label: green by default, white on button hover via group
    label: 'text-green group-hover:text-white',
    // Icons always white
    icon: 'text-white',
  },

  secondary: {
    button: clsx(
      'bg-white border border-grey-200',
      'hover:bg-grey-100 active:bg-grey-200',
      'focus-visible:ring-2 focus-visible:ring-orchid-1000 focus-visible:ring-offset-2',
    ),
    label: 'text-grey-950',
    icon: 'text-grey-1000',
  },

  ghost: {
    button: clsx(
      'bg-transparent border border-transparent',
      'hover:bg-white/10 active:bg-white/20',
      'focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
    ),
    label: 'text-white',
    icon: 'text-white',
  },
}

// Figma icon-only sizes (icon fills button interior: size − 2×padding):
//   lg: 40px button − 2×10px padding = 20px icon  → h-5 w-5
//   md: 32px button − 2×8px  padding = 16px icon  → h-4 w-4
//   sm: 20px button − 2×4px  padding = 12px icon  → h-3 w-3
//
// Text button font: 13px / Medium 500 for all sizes (Figma body-m)

const sizeClasses: Record<ButtonSize, string> = {
  lg: 'h-10 px-4 py-2.5 text-body-m font-medium rounded-md',
  md: 'h-8  px-3 py-1.5 text-body-m font-medium rounded-md',
  sm: 'h-5  px-1 py-1   text-body-xs            rounded-sm',
}

const iconOnlySizeClasses: Record<ButtonSize, string> = {
  lg: 'h-10 w-10 p-2.5 rounded-md',
  md: 'h-8  w-8  p-2   rounded-md',
  sm: 'h-5  w-5  p-1   rounded-sm',
}

// Inline icon sizes for text buttons (slightly smaller than icon-only)
const inlineIconSizeClasses: Record<ButtonSize, string> = {
  lg: 'h-4 w-4',
  md: 'h-3.5 w-3.5',
  sm: 'h-3 w-3',
}

// Icon-only icon fills the full interior
const iconOnlyIconSizeClasses: Record<ButtonSize, string> = {
  lg: 'h-5 w-5',
  md: 'h-4 w-4',
  sm: 'h-3 w-3',
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'secondary',
      size = 'lg',
      iconOnly = false,
      leftIcon,
      rightIcon,
      loading = false,
      disabled,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading
    const styles = variantStyles[variant]

    return (
      <button
        ref={ref}
        type="button"
        disabled={isDisabled}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        className={clsx(
          // base
          'group inline-flex items-center justify-center gap-2',
          'font-sans select-none whitespace-nowrap',
          'transition-[background-color,filter,opacity] duration-150',
          'outline-none',
          // disabled
          'disabled:opacity-50 disabled:pointer-events-none',
          // variant + size
          styles.button,
          iconOnly ? iconOnlySizeClasses[size] : sizeClasses[size],
          className,
        )}
        {...props}
      >
        {iconOnly ? (
          /* ── Icon-only ── */
          loading ? (
            <Spinner className={clsx(iconOnlyIconSizeClasses[size], styles.icon)} />
          ) : (
            <span
              className={clsx(
                'inline-flex items-center justify-center shrink-0',
                iconOnlyIconSizeClasses[size],
                styles.icon,
              )}
              aria-hidden="true"
            >
              {children}
            </span>
          )
        ) : (
          /* ── Text button ── */
          <>
            {loading ? (
              <Spinner className={clsx(inlineIconSizeClasses[size], styles.icon)} />
            ) : leftIcon ? (
              <span
                className={clsx('shrink-0 inline-flex', inlineIconSizeClasses[size], styles.icon)}
                aria-hidden="true"
              >
                {leftIcon}
              </span>
            ) : null}

            {children && (
              <span className={styles.label}>{children}</span>
            )}

            {rightIcon && !loading && (
              <span
                className={clsx('shrink-0 inline-flex', inlineIconSizeClasses[size], styles.icon)}
                aria-hidden="true"
              >
                {rightIcon}
              </span>
            )}
          </>
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'
