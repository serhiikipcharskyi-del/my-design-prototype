import * as React from 'react'
import { clsx } from 'clsx'
import { Icon } from './icons/Icon'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ChatActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Whether the action can be taken (e.g. the message has content) — false renders a disabled grey state */
  active?: boolean
  /** Icon name from the shared set — defaults to the send arrow; pass 'ic-stop' while a response is streaming */
  icon?: string
}

// ─── Gradients ────────────────────────────────────────────────────────────────
//
// Figma specs (node 454:15596, "ChatAction"):
//   40px circle, border-white, drop shadow that strengthens on hover
//   Active   default → radial gradient fading to orchid-1000 (rich/saturated)
//            hover   → same gradient but lighter, fading to orchid-900 only
//   Inactive default → bg-grey-400   hover → bg-grey-600
//   Both states use the same upper-left light-source position (37.5%, 14%).

const ACTIVE_GRADIENT =
  'radial-gradient(circle at 37.5% 14%, #f5e1f4 0%, #df9edb 50%, #d47dce 75%, #c95bc1 100%)'
const ACTIVE_HOVER_GRADIENT =
  'radial-gradient(circle at 37.5% 14%, #f5e1f4 0%, #e8bae5 50%, #dc93d7 100%)'

// ─── Component ────────────────────────────────────────────────────────────────

export const ChatAction = React.forwardRef<HTMLButtonElement, ChatActionProps>(
  ({ active = true, icon = 'arrow-line-up', className, onClick, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label="Send"
      aria-disabled={!active}
      // Not the native `disabled` attribute — Chromium never fires `:hover` on a
      // disabled button, but Figma shows a distinct hover state for the inactive
      // case too, so it needs to stay real for `:hover` while still blocking clicks.
      onClick={active ? onClick : undefined}
      className={clsx(
        'group relative inline-flex size-10 shrink-0 items-center justify-center overflow-hidden',
        'rounded-full border border-white outline-none transition-shadow duration-150',
        'focus-visible:ring-2 focus-visible:ring-orchid-1000 focus-visible:ring-offset-2',
        active
          ? [
              'cursor-pointer shadow-[0px_2px_6px_0px_rgba(0,0,0,0.12)]',
              'hover:shadow-[0px_2px_6px_0px_rgba(0,0,0,0.16)]',
            ]
          : [
              'cursor-not-allowed bg-grey-400 shadow-[0px_2px_6px_0px_rgba(0,0,0,0.08)]',
              'hover:bg-grey-600 hover:shadow-[0px_2px_6px_0px_rgba(0,0,0,0.12)]',
            ],
        className,
      )}
      {...props}
    >
      {active && (
        <>
          <span
            aria-hidden="true"
            className="absolute inset-0"
            style={{ backgroundImage: ACTIVE_GRADIENT }}
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
            style={{ backgroundImage: ACTIVE_HOVER_GRADIENT }}
          />
        </>
      )}
      <Icon
        name={icon}
        size={20}
        className={clsx('relative', active ? 'text-white' : 'text-grey-1000')}
      />
    </button>
  ),
)

ChatAction.displayName = 'ChatAction'
