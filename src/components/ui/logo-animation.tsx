import * as React from 'react'
import { clsx } from 'clsx'
import stateOne from './logo-animation/logo-animation-state-one.png'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LogoAnimationProps {
  size?: number
  className?: string
}

// ─── Asset ────────────────────────────────────────────────────────────────────
//
// Single real export from Figma (node 1129:31029, "LogoAnimation") — the
// full badge+glow+W-mark composite, spun continuously via `logo-spin`
// (globals.css) rather than reconstructing the layers or cycling frames.

const EXPORT_SCALE = 4
const BADGE_SIZE = 40
const FRAME_NATURAL = stateOne.width / EXPORT_SCALE

// ─── Component ────────────────────────────────────────────────────────────────

export const LogoAnimation = React.forwardRef<HTMLDivElement, LogoAnimationProps>(
  ({ size = 40, className }, ref) => {
    const scale = size / BADGE_SIZE
    const frameSize = FRAME_NATURAL * scale

    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={clsx('relative inline-flex shrink-0 items-center justify-center', className)}
        style={{ width: size, height: size }}
      >
        <img
          src={stateOne.src}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
          style={{
            width: frameSize,
            height: frameSize,
            animation: 'logo-spin 2.4s linear infinite',
          }}
        />
      </div>
    )
  },
)

LogoAnimation.displayName = 'LogoAnimation'
