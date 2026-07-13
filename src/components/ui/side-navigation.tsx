import * as React from 'react'
import Image from 'next/image'
import { clsx } from 'clsx'
import { Icon } from './icons/Icon'
import { NavItem } from './nav-item'
import { LogoMenu } from './logo-menu'
import logoMark from './logo-mark.png'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SideNavLink {
  key: string
  label: string
  /** Icon name from the design system (e.g. "ic-overview") */
  icon?: string
}

export interface SideNavigationProps {
  /** false = collapsed rail — icons only, no labels */
  expand?: boolean
  onExpandChange?: (expand: boolean) => void
  /** "main" — top-level app nav. "process" — drilled-into single-process view */
  variant?: 'main' | 'process'
  className?: string

  // ── Main variant ──
  mainLinks?: SideNavLink[]
  manageLinks?: SideNavLink[]
  manageSectionLabel?: string
  selectedKey?: string
  onSelect?: (key: string) => void
  /** Search is a trigger button, not a text field — wire this up to open a search/command popup */
  onSearch?: () => void

  // ── Process variant ──
  processName?: string
  processBadge?: string
  processBadgeColor?: string
  processSectionLabel?: string
  processLinks?: SideNavLink[]
  onBack?: () => void

  // ── Footer (both variants) ──
  onDownloadApp?: () => void
  profileName?: string
  profileEmail?: string
  profileAvatar?: string
  onProfileClick?: () => void
}

// ─── Defaults — match the Figma reference content ──────────────────────────────

const DEFAULT_MAIN_LINKS: SideNavLink[] = [
  { key: 'overview',  label: 'Overview',  icon: 'ic-overview' },
  { key: 'workflows', label: 'Workflows',  icon: 'ic-agent' },
  { key: 'processes', label: 'Processes', icon: 'ic-processes' },
  { key: 'missions',  label: 'Missions',  icon: 'ic-target' },
  { key: 'favorites', label: 'Favorites', icon: 'ic-win' },
]

const DEFAULT_MANAGE_LINKS: SideNavLink[] = [
  { key: 'teams',   label: 'Teams',   icon: 'ic-people' },
  { key: 'members', label: 'Members', icon: 'ic-member' },
]

const DEFAULT_PROCESS_LINKS: SideNavLink[] = [
  { key: 'onboarding', label: 'Employee Onboarding',        icon: 'ic-process' },
  { key: 'benefits',   label: 'Benefits Enrollment',         icon: 'ic-process' },
  { key: 'leave',      label: 'Leave Requests',              icon: 'ic-process' },
  { key: 'policy',     label: 'Policy Acknowledgements',     icon: 'ic-process' },
  { key: 'payroll',    label: 'Payroll Change Requests',     icon: 'ic-process' },
  { key: 'offboarding', label: 'Employee Offboarding',       icon: 'ic-process' },
]

// ─── Component ────────────────────────────────────────────────────────────────
//
// Figma specs (node 758:25006):
//   Rail: border-r grey-200, bg grey-50/80, w-264 expanded / auto collapsed
//   Header: logo + "Worktrace AI" + collapse toggle (expanded)
//           LogoMenu hover-swap trigger (collapsed)
//   Search: menu NavItem, "/" shortcut badge (expanded only)
//   Main links / Manage section reuse the menu NavItem
//   Process variant: "Back to Processes" link + team NavItem (custom badge)
//                    + Processes section + sub-nav links (icon hidden when expanded)
//   Footer: action NavItem (Download App) + profile NavItem

export function SideNavigation({
  expand = true,
  onExpandChange,
  variant = 'main',
  className,
  mainLinks = DEFAULT_MAIN_LINKS,
  manageLinks = DEFAULT_MANAGE_LINKS,
  manageSectionLabel = 'Manage',
  selectedKey,
  onSelect,
  onSearch,
  processName = 'HR Team',
  processBadge = 'HR',
  processBadgeColor = '#f74980',
  processSectionLabel = 'Processes',
  processLinks = DEFAULT_PROCESS_LINKS,
  onBack,
  onDownloadApp,
  profileName = 'Mary Freund',
  profileEmail = 'm.g.freund@aol.com',
  profileAvatar,
  onProfileClick,
}: SideNavigationProps) {
  const isProcess = variant === 'process'

  return (
    <div
      className={clsx(
        'flex h-full flex-col items-center border-r border-grey-200 bg-grey-50/80 py-4',
        expand ? 'w-[264px]' : 'w-auto',
        className,
      )}
    >
      <div
        className={clsx(
          'flex min-h-0 flex-1 flex-col gap-4 px-4',
          expand ? 'w-full items-start pb-6' : 'w-[68px] items-center justify-center pb-[30px]',
        )}
      >
        {/* ── Logo row ── */}
        <div className={clsx('flex shrink-0 items-center', expand ? 'w-full gap-2 pl-0.5' : 'gap-0')}>
          {expand ? (
            <>
              <span className="relative size-7 shrink-0">
                <Image src={logoMark} alt="Worktrace" fill className="object-contain" />
              </span>
              <span className="min-w-0 flex-1 truncate text-h4 font-semibold text-grey-1000">
                Worktrace AI
              </span>
              <button
                type="button"
                onClick={() => onExpandChange?.(false)}
                aria-label="Collapse sidebar"
                className={clsx(
                  'inline-flex size-8 shrink-0 items-center justify-center rounded-md outline-none',
                  'cursor-pointer hover:bg-grey-100',
                  'focus-visible:ring-2 focus-visible:ring-orchid-1000 focus-visible:ring-offset-2',
                )}
              >
                <Icon name="ic-close-layout" size={16} />
              </button>
            </>
          ) : (
            <LogoMenu onClick={() => onExpandChange?.(true)} />
          )}
        </div>

        {/* ── Scrollable nav body ── */}
        <div className={clsx('flex min-h-0 flex-1 flex-col items-center', expand ? 'w-full gap-6' : 'gap-6')}>
          <div className={clsx('flex flex-col shrink-0', expand ? 'w-full items-start gap-0' : 'items-center gap-0')}>
            {!isProcess && (
              <div className={clsx('flex flex-col gap-1', expand ? 'w-full items-start' : 'items-center')}>
                <NavItem
                  variant="menu"
                  expand={expand}
                  icon={<Icon name="ic-search" size={20} />}
                  label="Search"
                  shortcut="/"
                  onClick={onSearch}
                />
                {mainLinks.map(link => (
                  <NavItem
                    key={link.key}
                    variant="menu"
                    expand={expand}
                    selected={selectedKey === link.key}
                    icon={link.icon ? <Icon name={link.icon} size={20} /> : undefined}
                    label={link.label}
                    onClick={() => onSelect?.(link.key)}
                  />
                ))}
              </div>
            )}

            {isProcess && (
              <div className={clsx('flex flex-col gap-1', expand ? 'w-full items-start' : 'items-center')}>
                <button
                  type="button"
                  onClick={onBack}
                  aria-label="Back to Processes"
                  className={clsx(
                    'inline-flex shrink-0 items-center gap-2 rounded-lg outline-none',
                    'cursor-pointer hover:bg-grey-100',
                    'focus-visible:ring-2 focus-visible:ring-orchid-1000 focus-visible:ring-offset-2',
                    expand ? 'w-full px-2 py-1' : 'size-6 justify-center',
                  )}
                >
                  <Icon name="arrow-simple-left" size={16} className="shrink-0 text-grey-1000" />
                  {expand && (
                    <span className="min-w-0 flex-1 truncate text-left text-body-s font-medium text-grey-1000">
                      Back to Processes
                    </span>
                  )}
                </button>
                <NavItem
                  variant="team"
                  expand={expand}
                  label={processName}
                  badge={processBadge}
                  badgeColor={processBadgeColor}
                />
              </div>
            )}
          </div>

          {!isProcess && (
            <div className={clsx('flex flex-col shrink-0 gap-1', expand ? 'w-full items-start' : 'items-center')}>
              {expand && (
                <span className="px-2 py-1 text-body-s font-medium text-grey-800">{manageSectionLabel}</span>
              )}
              {manageLinks.map(link => (
                <NavItem
                  key={link.key}
                  variant="menu"
                  expand={expand}
                  selected={selectedKey === link.key}
                  icon={link.icon ? <Icon name={link.icon} size={20} /> : undefined}
                  label={link.label}
                  onClick={() => onSelect?.(link.key)}
                />
              ))}
            </div>
          )}

          {isProcess && (
            <div className={clsx('flex flex-col shrink-0 gap-1', expand ? 'w-full items-start' : 'items-center')}>
              {expand && (
                <span className="px-2 py-1 text-body-s font-medium text-grey-800">{processSectionLabel}</span>
              )}
              {processLinks.map(link => (
                <NavItem
                  key={link.key}
                  variant="menu"
                  expand={expand}
                  selected={selectedKey === link.key}
                  icon={!expand && link.icon ? <Icon name={link.icon} size={20} /> : undefined}
                  label={link.label}
                  onClick={() => onSelect?.(link.key)}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <NavItem
          variant="action"
          expand={expand}
          label="Download App"
          onClick={onDownloadApp}
        />
      </div>

      <NavItem
        variant="profile"
        expand={expand}
        name={profileName}
        email={profileEmail}
        avatar={profileAvatar}
        onClick={onProfileClick}
        className={expand ? 'w-full px-4' : undefined}
      />
    </div>
  )
}
