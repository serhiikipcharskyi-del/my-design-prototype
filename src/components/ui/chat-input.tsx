import * as React from 'react'
import { clsx } from 'clsx'
import { Icon } from './icons/Icon'
import { ChatAction } from './chat-action'
import { SegmentControl, type SegmentControlOption } from './segment-control'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ChatInputProps<T extends string = string> {
  value: string
  onChange: (value: string) => void
  onSubmit?: (value: string) => void
  placeholder?: string
  /** Shown in place of `placeholder` while `loading` is true (e.g. "Responding...") */
  loadingText?: string
  /** Swaps the send action for a stop action — e.g. while an AI response is streaming */
  loading?: boolean
  onStop?: () => void
  /** Mode segments shown before the send button (e.g. Decide/Ask). Omit for a plain comment/instruction input. */
  modes?: SegmentControlOption<T>[]
  mode?: T
  onModeChange?: (mode: T) => void
  /** Expand/fullscreen affordance in the bottom-left corner */
  showExpand?: boolean
  onExpand?: () => void
  disabled?: boolean
  autoFocus?: boolean
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────
//
// Figma specs (node 455:16021, "ChatInput"):
//   448px card, rounded-lg (12px), pt-4 px-3 pb-3, gap-6 between text and actions
//   Border   default/hover → grey-100/grey-400   focused → orchid-400 + subtle
//            orchid-tinted drop shadow (via :focus-within, not a static prop)
//   Actions  expand icon button (left) · optional mode SegmentControl (right)
//            · ChatAction send/stop button, driven by real value/loading state
//            rather than separate Default/Hover/Active/Filled/Working props —
//            those were just static snapshots of the same interactive states.
//
//   Built generic on purpose: modes/placeholder/loading are all optional so the
//   same input works for the AI chat box, comments, and plain instructions.

export function ChatInput<T extends string = string>({
  value,
  onChange,
  onSubmit,
  placeholder = 'Ask Worktrace...',
  loadingText = 'Responding...',
  loading = false,
  onStop,
  modes,
  mode,
  onModeChange,
  showExpand = true,
  onExpand,
  disabled = false,
  autoFocus = false,
  className,
}: ChatInputProps<T>) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const isDisabled = disabled || loading
  const canSend = value.trim().length > 0

  React.useLayoutEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [value])

  const handleSubmit = () => {
    if (!canSend || isDisabled) return
    onSubmit?.(value)
  }

  return (
    <div
      className={clsx(
        'group flex w-full flex-col gap-6 rounded-lg border bg-white px-3 pb-3 pt-4',
        'border-grey-100 transition-colors duration-100',
        'hover:border-grey-400',
        'focus-within:border-orchid-400 focus-within:shadow-[0px_1px_1px_0px_rgba(220,147,215,0.6)]',
        'focus-within:hover:border-orchid-400',
        className,
      )}
    >
      <textarea
        ref={textareaRef}
        rows={2}
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
          }
        }}
        placeholder={loading ? loadingText : placeholder}
        disabled={isDisabled}
        autoFocus={autoFocus}
        className={clsx(
          'w-full resize-none bg-transparent px-0.5 font-sans text-body-m font-medium text-grey-1000 outline-none',
          'placeholder:text-grey-800',
          'disabled:cursor-not-allowed',
        )}
      />

      <div className="flex w-full items-center justify-between">
        {showExpand ? (
          <button
            type="button"
            aria-label="Expand"
            onClick={onExpand}
            className={clsx(
              'inline-flex items-center justify-center rounded-md p-2 text-grey-1000 outline-none',
              'cursor-pointer hover:bg-grey-100',
              'focus-visible:ring-2 focus-visible:ring-orchid-1000 focus-visible:ring-offset-1',
            )}
          >
            <Icon name="ic-focus" size={16} />
          </button>
        ) : (
          <span />
        )}

        <div className="flex items-center gap-2">
          {modes && mode && (
            <SegmentControl value={mode} onChange={onModeChange ?? (() => {})} options={modes} />
          )}
          <ChatAction
            active={loading || canSend}
            icon={loading ? 'ic-stop' : 'arrow-line-up'}
            aria-label={loading ? 'Stop' : 'Send'}
            onClick={loading ? onStop : handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}
