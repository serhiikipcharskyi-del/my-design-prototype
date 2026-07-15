import * as React from 'react'
import { clsx } from 'clsx'
import { Icon } from './icons/Icon'
import { Button } from './button'

// ─── Types ────────────────────────────────────────────────────────────────────

export type MapDetailsType = 'action' | 'question' | 'system'

export interface MapDetailsStat {
  label: string
  value: React.ReactNode
}

export interface MapDetailsProps {
  type?: MapDetailsType
  /** Node title/label */
  children: React.ReactNode
  /**
   * Selected — reveals the floating toolbar + details panel while the node
   * is hovered. Figma only defines this for 'action'/'system'; 'question'
   * has no active/hover variant, so it's ignored for that type.
   *
   * Clicking the node toggles this. Omit to let the node manage its own
   * selection (uncontrolled); pass it to control selection yourself — e.g.
   * a canvas that needs only one node selected at a time.
   */
  active?: boolean
  /** Initial selected state when uncontrolled (no `active` passed). */
  defaultActive?: boolean
  /** Fires on click with the next selected state, controlled or not. */
  onActiveChange?: (active: boolean) => void
  /** ROI badge shown in the details panel — e.g. <Tag variant="med">Medium</Tag> */
  roi?: React.ReactNode
  /** Extra stat rows (Variants, Steps, Repetitions, Time spent…) */
  stats?: MapDetailsStat[]
  onCopy?: () => void
  onAskAi?: () => void
  onViewDetails?: () => void
  className?: string
}

// ─── Connector dots ───────────────────────────────────────────────────────────
//
// Figma specs (node 1434:6213): small white handles at the N/E/S/W edges of
// the node, marking where connectors from other nodes attach.

const DOT_POSITION: Record<'top' | 'right' | 'bottom' | 'left', string> = {
  top: '-top-1.5 left-1/2 -translate-x-1/2',
  right: '-right-1.5 top-1/2 -translate-y-1/2',
  bottom: '-bottom-1.5 left-1/2 -translate-x-1/2',
  left: '-left-1.5 top-1/2 -translate-y-1/2',
}

const ConnectorDot = ({ position }: { position: keyof typeof DOT_POSITION }) => (
  <span
    aria-hidden="true"
    className={clsx(
      'absolute size-3 rounded-full border border-grey-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08)]',
      DOT_POSITION[position],
    )}
  />
)

const CONNECTOR_POSITIONS = ['top', 'right', 'bottom', 'left'] as const

// ─── Floating toolbar ─────────────────────────────────────────────────────────
//
// Copy/Ask-AI actions shown above an active node. Only mounted while active
// (see below), so visibility doesn't need to be re-gated behind `:hover` —
// selection is meant to stay visible after the cursor leaves. Figma renders
// these as plain flat icon buttons (no border) inside a bordered white
// capsule, so `Button` (which always carries its own border) isn't reused
// here — a bare button keeps the flush, seamless look Figma shows.

const Toolbar = ({ onCopy, onAskAi }: { onCopy?: () => void; onAskAi?: () => void }) => (
  <div
    onClick={e => e.stopPropagation()}
    className="absolute -top-12 right-2 z-10 flex items-center gap-1 rounded-lg border border-grey-200 bg-white p-1 drop-shadow-[2px_4px_8px_rgba(0,0,0,0.08)]"
  >
    <button
      type="button"
      onClick={onCopy}
      aria-label="Copy"
      className="flex size-8 items-center justify-center rounded-md text-grey-1000 hover:bg-grey-100"
    >
      <Icon name="ic-copy" size={16} />
    </button>
    <button
      type="button"
      onClick={onAskAi}
      aria-label="Ask AI"
      className="flex size-8 items-center justify-center rounded-md text-grey-1000 hover:bg-grey-100"
    >
      <Icon name="ic-chat" size={16} />
    </button>
  </div>
)

// ─── Details panel ────────────────────────────────────────────────────────────

const DetailsPanel = ({
  roi,
  stats,
  onViewDetails,
}: {
  roi?: React.ReactNode
  stats?: MapDetailsStat[]
  onViewDetails?: () => void
}) => (
  <div
    onClick={e => e.stopPropagation()}
    className="absolute left-[calc(100%+8px)] top-0 z-10 w-64 rounded-xl border border-grey-200 bg-white shadow-[2px_4px_16px_rgba(0,0,0,0.08)]"
  >
    <div className="flex h-11 items-center justify-between gap-3 border-b border-grey-200 px-4 py-3">
      <span className="text-body-m font-medium text-grey-1000">Workflow Details</span>
      <Button variant="secondary" darkBg size="md" rightIcon={<Icon name="arrow-simple-right" />} onClick={onViewDetails}>
        View
      </Button>
    </div>
    {(roi || (stats && stats.length > 0)) && (
      <div className="flex flex-col gap-2 p-4">
        <span className="text-body-m text-grey-800">Stats</span>
        <div className="flex flex-col gap-1">
          {roi && (
            <div className="flex items-center justify-between">
              <span className="text-body-s text-grey-1000">ROI</span>
              {roi}
            </div>
          )}
          {stats?.map(stat => (
            <div key={stat.label} className="flex h-[21px] items-center justify-between">
              <span className="text-body-s text-grey-1000">{stat.label}</span>
              <span className="text-body-s font-semibold text-grey-1000">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
)

// ─── Component ────────────────────────────────────────────────────────────────

const gradientByType: Record<'action' | 'system', string> = {
  action: 'bg-gradient-to-b from-green to-white',
  system: 'bg-gradient-to-b from-lavender to-white',
}

export const MapDetails = React.forwardRef<HTMLDivElement, MapDetailsProps>(
  (
    {
      type = 'action',
      children,
      active,
      defaultActive = false,
      onActiveChange,
      roi,
      stats,
      onCopy,
      onAskAi,
      onViewDetails,
      className,
    },
    ref,
  ) => {
    const [internalActive, setInternalActive] = React.useState(defaultActive)
    const isActive = active ?? internalActive

    const setActive = (next: boolean) => {
      if (active === undefined) setInternalActive(next)
      onActiveChange?.(next)
    }

    const toggleActive = () => setActive(!isActive)

    // Selection only clears on a second click or a click elsewhere — not on
    // losing hover — so it needs its own DOM node (merged with the
    // forwarded ref) to test click targets against.
    const cardRef = React.useRef<HTMLDivElement | null>(null)
    const setRefs = (node: HTMLDivElement | null) => {
      cardRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) (ref as React.RefObject<HTMLDivElement | null>).current = node
    }

    React.useEffect(() => {
      if (!isActive) return
      const handlePointerDown = (event: PointerEvent) => {
        if (!cardRef.current?.contains(event.target as Node)) setActive(false)
      }
      document.addEventListener('pointerdown', handlePointerDown)
      return () => document.removeEventListener('pointerdown', handlePointerDown)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive])

    if (type === 'question') {
      return (
        <div
          ref={ref}
          className={clsx(
            'relative flex size-[122px] shrink-0 items-center justify-center drop-shadow-[2px_4px_8px_rgba(0,0,0,0.08)]',
            className,
          )}
        >
          <div className="size-[85px] rotate-45 rounded-lg border border-grey-400 bg-tag-yellow-100" />
          <p className="absolute max-w-[72px] text-center font-sans text-body-s font-medium text-grey-1000">
            {children}
          </p>
          {CONNECTOR_POSITIONS.map(position => (
            <ConnectorDot key={position} position={position} />
          ))}
        </div>
      )
    }

    return (
      <div
        ref={setRefs}
        role="button"
        tabIndex={0}
        onClick={toggleActive}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            toggleActive()
          }
        }}
        className={clsx(
          'group relative w-52 shrink-0 cursor-pointer rounded-xl border p-1 drop-shadow-[2px_4px_8px_rgba(0,0,0,0.08)] outline-none',
          'focus-visible:ring-2 focus-visible:ring-orchid-1000 focus-visible:ring-offset-2',
          // The highlighted-selection ring uses `ring` (box-shadow), not a
          // wider `border` — changing border width shifts layout since row
          // height is auto. It's driven by `isActive` alone (not `:hover`
          // too) so selection stays visibly indicated after the cursor
          // leaves, matching the toolbar/details panel below.
          isActive
            ? 'border-orchid-400 ring-2 ring-inset ring-orchid-400'
            : 'border-grey-400 hover:border-orchid-900 hover:bg-white',
          className,
        )}
      >
        <div className={clsx('flex flex-col gap-3 rounded-lg p-3', gradientByType[type])}>
          <p className="font-sans text-body-m font-medium text-grey-1000">{children}</p>
        </div>

        {!isActive && (
          <span className="absolute -top-0.5 -right-0.5 hidden size-4 items-center justify-center rounded-sm bg-white text-grey-1000 group-hover:flex">
            <Icon name="ic-expand" size={12} />
          </span>
        )}

        {CONNECTOR_POSITIONS.map(position => (
          <ConnectorDot key={position} position={position} />
        ))}

        {isActive && (
          <>
            <Toolbar onCopy={onCopy} onAskAi={onAskAi} />
            <DetailsPanel roi={roi} stats={stats} onViewDetails={onViewDetails} />
          </>
        )}
      </div>
    )
  },
)

MapDetails.displayName = 'MapDetails'
