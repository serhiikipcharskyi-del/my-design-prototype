import * as React from 'react'
import { clsx } from 'clsx'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  /** true = error border only, string = error border + message (replaces hint) */
  error?: boolean | string
  /** Rendered top-right of the label row, e.g. a "Forgot password?" link */
  labelAction?: React.ReactNode
  /** Chips rendered inline before the field value, e.g. <Tag variant="team"> */
  tags?: React.ReactNode
  wrapperClassName?: string
}

// ─── Component ────────────────────────────────────────────────────────────────
//
// Figma specs (node 770:36659 — "Input" type):
//   Field: h-40px, px-12px py-8px, rounded-md, border grey-200
//   Hover    → border grey-600
//   Focused  → border orchid-1000 + shadow ring, bg white
//   Error    → border tag-red-900
//   Disabled → bg grey-100, border grey-200, text grey-900
//   Label: 12px Medium grey-1000  |  Hint: 12px Medium grey-900 (red on error)

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      error,
      labelAction,
      tags,
      disabled,
      className,
      wrapperClassName,
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId()
    const inputId = id ?? generatedId
    const hasError = !!error
    const message = (typeof error === 'string' ? error : undefined) ?? hint

    return (
      <div className={clsx('flex w-full flex-col gap-1', wrapperClassName)}>
        {(label || labelAction) && (
          <div className="flex items-start gap-1 text-body-s">
            {label && (
              <label htmlFor={inputId} className="flex-1 font-medium text-grey-1000">
                {label}
              </label>
            )}
            {labelAction && (
              <span className="shrink-0 font-semibold text-orchid-1000">{labelAction}</span>
            )}
          </div>
        )}

        <div
          className={clsx(
            'flex h-10 w-full items-center gap-1.5 rounded-md border px-3 py-2',
            'transition-colors duration-100',
            disabled
              ? 'border-grey-200 bg-grey-100'
              : hasError
                ? 'border-tag-red-900 bg-white'
                : clsx(
                    'border-grey-200 bg-white hover:border-grey-600',
                    'focus-within:border-orchid-1000 focus-within:shadow-[0px_4px_8px_-4px_rgba(31,32,48,0.04),0px_1px_2px_0px_rgba(31,32,48,0.08),0px_0px_0px_1px_var(--color-grey-200)]',
                  ),
          )}
        >
          {tags}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={clsx(
              'min-w-0 flex-1 bg-transparent text-body-m font-medium outline-none placeholder:text-grey-800',
              disabled ? 'text-grey-900' : 'text-grey-1000',
              className,
            )}
            {...props}
          />
        </div>

        {message && (
          <span className={clsx('text-body-s font-medium', hasError ? 'text-tag-red-900' : 'text-grey-900')}>
            {message}
          </span>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
