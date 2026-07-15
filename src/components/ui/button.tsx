import * as React from 'react'
import { clsx } from 'clsx'

// ─── Types ────────────────────────────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dangerous'
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
  /**
   * Secondary buttons placed on a dark/brand background.
   * - lg/md: transparent base, grey hover tint
   * - sm: orchid-tinted text and hover tint (tag style)
   */
  darkBg?: boolean
  /**
   * Ghost-variant only: tints the label/icon vibrant-coral instead of white —
   * for destructive actions on a dark toolbar (e.g. BulkActions) where a
   * solid red `dangerous` button would be too heavy.
   */
  destructive?: boolean
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
// Figma verified:
//   Primary    bg=orchid-1000  border=white/20  ring=orchid-1000  label=green→white(hover)  icon=white
//   Secondary  bg=white        border=grey-200                    label=grey-950            icon=grey-1000
//   Ghost      bg=transparent  border=none                        label=white               icon=white
//              + destructive → label/icon=vibrant-coral instead of white (still transparent/hover-white)
//   Dangerous  bg=danger       border=white/20  ring=orchid-1000  label=white               icon=white
//
//   Secondary + darkBg (lg/md): transparent base, grey hover tint, grey text
//   Secondary + darkBg (sm):    transparent base, orchid hover tint, orchid text (tag style)

type VariantStyle = { button: string; label: string; icon: string }

const variantStyles: Record<ButtonVariant, VariantStyle> = {
  primary: {
    button: clsx(
      'bg-orchid-1000 border border-white/20',
      'shadow-[0_0_0_0.75px_var(--color-orchid-1000)]',
      'hover:brightness-110 hover:shadow-[0_0_0_0.75px_var(--color-orchid-900)]',
      'active:brightness-95',
      'focus-visible:ring-2 focus-visible:ring-orchid-1000 focus-visible:ring-offset-2',
    ),
    label: 'text-green group-hover:text-white',
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

  dangerous: {
    button: clsx(
      'bg-danger border border-white/20',
      'shadow-[0_0_0_0.75px_var(--color-orchid-1000)]',
      'hover:brightness-110 hover:shadow-[0_0_0_0.75px_var(--color-orchid-900)]',
      'active:brightness-95',
      'focus-visible:ring-2 focus-visible:ring-danger focus-visible:ring-offset-2',
    ),
    label: 'text-white',
    icon: 'text-white',
  },
}

// Secondary on a dark/brand background — no border or fill, subtle hover tint.
// sm size uses orchid tint (used as inline tag buttons in sidebars).
const getSecondaryDarkBgStyle = (size: ButtonSize): VariantStyle => ({
  button: clsx(
    'bg-transparent border border-transparent cursor-pointer',
    size === 'sm'
      ? 'hover:bg-orchid-100 active:bg-orchid-200'
      : 'hover:bg-grey-100 active:bg-grey-200',
    'focus-visible:ring-2 focus-visible:ring-orchid-1000 focus-visible:ring-offset-2',
  ),
  label: size === 'sm' ? 'text-orchid-1000' : 'text-grey-950',
  icon:  size === 'sm' ? 'text-orchid-1000' : 'text-grey-1000',
})

// Figma icon-only button sizes (icon fills interior: button − 2×padding):
//   lg: 40px − 2×10px = 20px → h-5 w-5
//   md: 32px − 2×8px  = 16px → h-4 w-4
//   sm: 20px − 2×4px  = 12px → h-3 w-3
//
// Text button font: 13px / Medium 500 for all sizes (Figma Body/M)

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

const inlineIconSizeClasses: Record<ButtonSize, string> = {
  lg: 'h-4 w-4',
  md: 'h-3.5 w-3.5',
  sm: 'h-3 w-3',
}

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
      darkBg = false,
      destructive = false,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading

    const styles =
      variant === 'secondary' && darkBg
        ? getSecondaryDarkBgStyle(size)
        : variant === 'ghost' && destructive
          ? { ...variantStyles.ghost, label: 'text-variant-vibrant-coral', icon: 'text-variant-vibrant-coral' }
          : variantStyles[variant]

    return (
      <button
        ref={ref}
        type="button"
        disabled={isDisabled}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        className={clsx(
          'group inline-flex items-center justify-center gap-2',
          'font-sans select-none whitespace-nowrap cursor-pointer',
          'transition-[background-color,filter,opacity,box-shadow] duration-150',
          'outline-none',
          'disabled:opacity-50 disabled:pointer-events-none',
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
                className={clsx('shrink-0 inline-flex items-center justify-center', inlineIconSizeClasses[size], styles.icon)}
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
                className={clsx('shrink-0 inline-flex items-center justify-center', inlineIconSizeClasses[size], styles.icon)}
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
