import * as React from 'react'
import { clsx } from 'clsx'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CheckboxProps {
  checked?: boolean
  /** Partial-selection / indeterminate state */
  indeterminate?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

// ─── SVG paths — taken directly from Figma asset SVGs ─────────────────────────
//
// All paths are in a 20×20 viewBox.
// Box shape uses rounded-corner bezier (≈3px radius), matching Figma exactly.
// Stroke widths: box unchecked = 1px, box checked/filled = 2px, marks = 1.4px

const BOX =   'M15 2C16.6569 2 18 3.34315 18 5V15.0001C18 16.6569 16.6569 18.0001 15 18.0001H5C3.34315 18.0001 2 16.6569 2 15.0001L2 5C2 3.34315 3.34315 2 5 2L15 2Z'
const CHECK = 'M13.3333 7.5L8.36145 12.5L6.66667 10.7956'
const DASH  = 'M6 10H14'

// ─── Per-state visual ─────────────────────────────────────────────────────────

interface VisualProps {
  checked: boolean
  indeterminate: boolean
  disabled: boolean
}

function CheckboxVisual({ checked, indeterminate, disabled }: VisualProps) {
  const isFilled = checked || indeterminate

  // disabled + filled → grey box + dark checkmark/dash
  if (disabled && isFilled) {
    return (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d={BOX}   fill="#E0E0E2" stroke="#E0E0E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d={indeterminate ? DASH : CHECK} stroke="#1F2030" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  // disabled + empty → light grey outline only
  if (disabled) {
    return (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d={BOX} stroke="#E0E0E2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  // checked / indeterminate → orchid fill (currentColor) + white mark
  // hover swaps the exact Figma color via the parent's text-color class
  if (isFilled) {
    return (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d={BOX}   fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d={indeterminate ? DASH : CHECK} stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  // unchecked → uses currentColor for stroke so hover can change it via CSS
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d={BOX} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────
//
// Figma specs (node 335:7189 — extracted from Figma SVG assets):
//   Off default  → box stroke #A5A6AC (grey-800), 1 px
//   Off hover    → box stroke #D2D3D5 (grey-600), 1 px (lighter — Figma design)
//   On           → box fill+stroke #C95BC1 (orchid-1000), 2 px | checkmark white 1.4 px
//   On hover     → box fill+stroke #DC93D7 (orchid-900)
//   On disabled  → box fill+stroke #E0E0E2 | checkmark #1F2030
//   Off disabled → box stroke #E0E0E2, 1 px
//   Indeterminate → same as On but with dash

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { checked = false, indeterminate = false, onChange, disabled, className },
    forwardedRef,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useImperativeHandle(forwardedRef, () => inputRef.current!, [])

    React.useEffect(() => {
      if (inputRef.current) inputRef.current.indeterminate = indeterminate
    }, [indeterminate])

    const isFilled = checked || indeterminate

    return (
      <label
        className={clsx(
          'relative inline-flex h-5 w-5 shrink-0 cursor-pointer',
          'focus-within:ring-2 focus-within:ring-orchid-1000 focus-within:ring-offset-1 rounded-[3px]',
          'transition-colors duration-100',
          // drive currentColor in the SVG via text color + hover
          !disabled && (isFilled ? 'text-orchid-1000 hover:text-orchid-900' : 'text-grey-800 hover:text-grey-600'),
          disabled && 'cursor-not-allowed pointer-events-none',
          className,
        )}
      >
        {/* Native input — invisible overlay covering the full click area */}
        <input
          ref={inputRef}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={e => onChange?.(e.target.checked)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          style={{ margin: 0 }}
        />

        {/* Custom visual — color driven by the label's currentColor (see above) */}
        <span className="flex h-5 w-5 items-center justify-center">
          <CheckboxVisual checked={checked} indeterminate={indeterminate} disabled={!!disabled} />
        </span>
      </label>
    )
  },
)

Checkbox.displayName = 'Checkbox'
