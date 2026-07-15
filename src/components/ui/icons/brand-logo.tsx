import * as React from 'react'
import { clsx } from 'clsx'
import amplitude from './brands/amplitude.svg'
import asana from './brands/asana.svg'
import chatgpt from './brands/chatgpt.svg'
import claude from './brands/claude.svg'
import figma from './brands/figma.svg'
import gemini from './brands/gemini.svg'
import github from './brands/github.svg'
import gmail from './brands/gmail.svg'
import googleAnalytics from './brands/google-analytics.svg'
import googleMeet from './brands/google-meet.svg'
import googleMeetSquare from './brands/google-meet-square.svg'
import granola from './brands/granola.svg'
import hubspot from './brands/hubspot.svg'
import mixpanel from './brands/mixpanel.svg'
import outlook from './brands/outlook.svg'
import salesforce from './brands/salesforce.svg'
import shopify from './brands/shopify.svg'
import slack from './brands/slack.svg'
import zendesk from './brands/zendesk.svg'

// ─── Types ────────────────────────────────────────────────────────────────────

export type BrandName =
  | 'amplitude'
  | 'asana'
  | 'chatgpt'
  | 'claude'
  | 'figma'
  | 'gemini'
  | 'github'
  | 'gmail'
  | 'google-analytics'
  | 'google-meet'
  | 'google-meet-square'
  | 'granola'
  | 'hubspot'
  | 'mixpanel'
  | 'outlook'
  | 'salesforce'
  | 'shopify'
  | 'slack'
  | 'zendesk'

export interface BrandLogoProps {
  name: BrandName
  size?: number
  className?: string
}

// ─── Sources ──────────────────────────────────────────────────────────────────
//
// Brand marks exported at a uniform 24×24 viewBox — unlike the file-type
// icons, none of these need aspect-ratio-aware fitting.

const sources: Record<BrandName, { src: string }> = {
  amplitude,
  asana,
  chatgpt,
  claude,
  figma,
  gemini,
  github,
  gmail,
  'google-analytics': googleAnalytics,
  'google-meet': googleMeet,
  'google-meet-square': googleMeetSquare,
  granola,
  hubspot,
  mixpanel,
  outlook,
  salesforce,
  shopify,
  slack,
  zendesk,
}

// ─── Component ────────────────────────────────────────────────────────────────

export const BrandLogo = React.forwardRef<HTMLSpanElement, BrandLogoProps>(
  ({ name, size = 24, className }, ref) => (
    <span
      ref={ref}
      className={clsx('inline-flex shrink-0 items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      <img
        src={sources[name].src}
        style={{ width: '100%', height: '100%' }}
        alt=""
        aria-hidden="true"
      />
    </span>
  ),
)

BrandLogo.displayName = 'BrandLogo'
