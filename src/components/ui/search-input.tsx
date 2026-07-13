import * as React from 'react'
import { clsx } from 'clsx'
import { Icon } from './icons/Icon'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'defaultValue'> {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  /** Shows a "/" keyboard-shortcut hint when idle and empty */
  showShortcut?: boolean
  wrapperClassName?: string
}

// ─── Component ────────────────────────────────────────────────────────────────
//
// Figma specs (node 770:36659 — "Search" type):
//   Field: h-36px, px-12px py-10px, rounded-md, border grey-200, gap-6px
//   Default/Hover → bg white, border grey-200 / grey-600 on hover
//   Focused/Active → border orchid-1000 + shadow ring, bg white
//   Active (has value + focused) shows a clear (×) button
//   Idle + showShortcut → "/" keycap hint on the right

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      showShortcut = false,
      placeholder = 'Search',
      disabled,
      className,
      wrapperClassName,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = React.useState(false)
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? '')
    const isControlled = value !== undefined
    const currentValue = isControlled ? value : internalValue

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalValue(e.target.value)
      onChange?.(e.target.value)
    }

    const handleClear = () => {
      if (!isControlled) setInternalValue('')
      onChange?.('')
    }

    return (
      <div
        className={clsx(
          'flex h-9 w-full items-center gap-1.5 rounded-md border px-3 py-2.5',
          'transition-colors duration-100',
          disabled
            ? 'border-grey-200 bg-grey-100'
            : focused
              ? 'border-orchid-1000 bg-white shadow-[0px_4px_8px_-4px_rgba(31,32,48,0.04),0px_1px_2px_0px_rgba(31,32,48,0.08),0px_0px_0px_1px_var(--color-grey-200)]'
              : 'border-grey-200 bg-white hover:border-grey-600',
          wrapperClassName,
        )}
      >
        <Icon name="ic-search" size={20} className="shrink-0 text-grey-800" />
        <input
          ref={ref}
          type="text"
          value={currentValue}
          onChange={handleChange}
          onFocus={(e) => {
            setFocused(true)
            onFocus?.(e)
          }}
          onBlur={(e) => {
            setFocused(false)
            onBlur?.(e)
          }}
          placeholder={placeholder}
          disabled={disabled}
          className={clsx(
            'min-w-0 flex-1 bg-transparent text-body-m font-medium text-grey-1000 outline-none placeholder:text-grey-800',
            className,
          )}
          {...props}
        />
        {currentValue ? (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="inline-flex shrink-0 items-center justify-center text-grey-800 outline-none transition-colors duration-100 hover:text-grey-1000"
          >
            <Icon name="ic-close" size={16} />
          </button>
        ) : (
          showShortcut &&
          !focused && (
            <span className="flex h-6 w-[22px] shrink-0 items-center justify-center rounded-sm bg-grey-100 text-body-m font-medium text-grey-800">
              /
            </span>
          )
        )}
      </div>
    )
  },
)

SearchInput.displayName = 'SearchInput'
