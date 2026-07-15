import * as React from 'react'
import Image from 'next/image'
import { clsx } from 'clsx'
import membersIllustration from './illustrations/empty-state-members.png'
import teamsIllustration from './illustrations/empty-state-teams.png'
import searchIllustration from './illustrations/empty-state-search.png'

// ─── Types ────────────────────────────────────────────────────────────────────

export type EmptyStateEntity = 'members' | 'teams' | 'search'

export interface EmptyStateIconProps {
  entity?: EmptyStateEntity
  /** Badge diameter in px — the illustration's own bleed renders proportionally larger */
  size?: number
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────
//
// Figma specs (node 3727:63167, "EmptyStateIcon"): an orchid-tinted circular
// badge with a *progressive* blur — crisp at the top, softening into a
// blurred glow toward the bottom. That falloff doesn't hold up as live CSS
// (a `filter: blur()` is uniform, and layered/masked approximations either
// clip the bleed or show visible seams) — so these are the exported PNGs,
// blur baked into the pixels. Each asset is a 290px canvas with the crisp
// badge sitting at ~55% of it (55.2% measured), so the rendered image is
// sized up from the requested badge `size` to keep the badge itself at the
// expected diameter with its bleed intact around it.

const illustrations: Record<EmptyStateEntity, typeof membersIllustration> = {
  members: membersIllustration,
  teams: teamsIllustration,
  search: searchIllustration,
}

const BADGE_FRACTION = 0.552

export const EmptyStateIcon = React.forwardRef<HTMLDivElement, EmptyStateIconProps>(
  ({ entity = 'members', size = 40, className }, ref) => {
    const imageSize = Math.round(size / BADGE_FRACTION)

    return (
      <div
        ref={ref}
        className={clsx('relative shrink-0 flex items-center justify-center', className)}
        style={{ width: imageSize, height: imageSize }}
      >
        <Image src={illustrations[entity]} alt="" width={imageSize} height={imageSize} />
      </div>
    )
  },
)

EmptyStateIcon.displayName = 'EmptyStateIcon'
