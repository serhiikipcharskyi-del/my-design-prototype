import * as React from 'react'
import { clsx } from 'clsx'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  checked?: boolean
  onChange?: (checked: boolean) => void
  /** Value used when this Radio lives inside a RadioGroup */
  value?: string
}

export interface RadioGroupOption<T extends string = string> {
  value: T
  label: React.ReactNode
  disabled?: boolean
}

export interface RadioGroupProps<T extends string = string> {
  value: T
  onChange: (value: T) => void
  options: RadioGroupOption<T>[]
  name?: string
  disabled?: boolean
  className?: string
  /** Layout direction — defaults to 'vertical' */
  direction?: 'vertical' | 'horizontal'
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface GroupCtx {
  groupValue: string
  onChange: (value: string) => void
  name: string
  disabled: boolean
}

const RadioGroupContext = React.createContext<GroupCtx | null>(null)

// ─── SVG visual ──────────────────────────────────────────────────────────────
//
// Figma specs (node 4295:67273, extracted from SVG assets):
//   Outer circle: cx=10 cy=10 r=7.5, stroke="currentColor", strokeWidth=1
//   Inner dot:    cx=10 cy=10 r=5,   fill="currentColor" (shown when selected)
//   All colours delivered via CSS currentColor on the parent label.
//
//   Off default → text-grey-800   (#A5A6AC)
//   Off hover   → text-grey-600   (#D2D3D5) — lighter, matches Figma
//   On default  → text-orchid-1000 (#C95BC1)
//   On hover    → text-orchid-900  (#DC93D7)
//   Disabled    → text-grey-600   (#D2D3D5), no hover change

const RadioMark = ({ selected }: { selected: boolean }) => (
  <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
    <circle cx="10" cy="10" r="7.5" stroke="currentColor" />
    {selected && <circle cx="10" cy="10" r="5" fill="currentColor" />}
  </svg>
)

// ─── Radio ────────────────────────────────────────────────────────────────────

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ checked, onChange, value, disabled, className, ...props }, forwardedRef) => {
    const ctx = React.useContext(RadioGroupContext)

    const isChecked = ctx ? ctx.groupValue === value : (checked ?? false)
    const isDisabled = ctx?.disabled || disabled
    const name = ctx?.name ?? props.name

    const handleChange = () => {
      if (isDisabled) return
      if (ctx && value !== undefined) ctx.onChange(value)
      else onChange?.(true)
    }

    const inputRef = React.useRef<HTMLInputElement>(null)
    React.useImperativeHandle(forwardedRef, () => inputRef.current!, [])

    return (
      <label
        className={clsx(
          'group relative inline-flex h-5 w-5 shrink-0 cursor-pointer',
          'focus-within:ring-2 focus-within:ring-orchid-1000 focus-within:ring-offset-1 rounded-full',
          'transition-colors duration-100',
          isDisabled
            ? 'cursor-not-allowed pointer-events-none text-grey-600'
            : isChecked
              ? 'text-orchid-1000 hover:text-orchid-900'
              : 'text-grey-800 hover:text-grey-600',
          className,
        )}
      >
        <input
          ref={inputRef}
          type="radio"
          name={name}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          onChange={handleChange}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          style={{ margin: 0 }}
        />
        <span className="flex h-5 w-5 items-center justify-center">
          <RadioMark selected={isChecked} />
        </span>
      </label>
    )
  },
)

Radio.displayName = 'Radio'

// ─── RadioGroup ───────────────────────────────────────────────────────────────

export function RadioGroup<T extends string = string>({
  value,
  onChange,
  options,
  name,
  disabled = false,
  className,
  direction = 'vertical',
}: RadioGroupProps<T>) {
  const groupName = React.useId()

  return (
    <RadioGroupContext.Provider
      value={{
        groupValue: value,
        onChange: onChange as (v: string) => void,
        name: name ?? groupName,
        disabled,
      }}
    >
      <div
        role="radiogroup"
        className={clsx(
          'flex',
          direction === 'vertical' ? 'flex-col gap-3' : 'flex-row flex-wrap gap-4',
          className,
        )}
      >
        {options.map(opt => (
          <label
            key={String(opt.value)}
            className={clsx(
              'inline-flex items-center gap-2 cursor-pointer select-none',
              (disabled || opt.disabled) && 'cursor-not-allowed opacity-50',
            )}
          >
            <Radio value={String(opt.value)} disabled={opt.disabled} />
            <span className="text-body-m text-grey-1000">{opt.label}</span>
          </label>
        ))}
      </div>
    </RadioGroupContext.Provider>
  )
}
