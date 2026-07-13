import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import React, { useState } from 'react'
import { NavItem } from '../components/ui/nav-item'
import { Icon } from '../components/ui/icons/Icon'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/Nav Item',
  component: NavItem,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant:  { control: 'select', options: ['team', 'menu', 'profile', 'action'] },
    expand:   { control: 'boolean' },
    selected: { control: 'boolean' },
    label:    { control: 'text' },
  },
  args: {
    variant: 'menu',
    expand: true,
    selected: false,
    label: 'Overview',
  },
} satisfies Meta<typeof NavItem>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: args.expand ? 232 : 'auto' }}>
      <NavItem {...args} icon={<Icon name="ic-overview" size={20} />} />
    </div>
  ),
}

// ─── States — Figma reference ─────────────────────────────────────────────────
// Matches the Figma component sheet (node 719:26445).

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-body-s text-grey-900">Team — expanded / collapsed</span>
        <div className="flex items-start gap-3">
          <div className="w-[232px]">
            <NavItem variant="team" label="Organization" />
          </div>
          <NavItem variant="team" expand={false} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-body-s text-grey-900">Menu — default / selected / collapsed</span>
        <div className="flex items-start gap-3">
          <div className="w-[232px]">
            <NavItem variant="menu" icon={<Icon name="ic-overview" size={20} />} label="Overview" />
          </div>
          <div className="w-[232px]">
            <NavItem variant="menu" icon={<Icon name="ic-overview" size={20} />} label="Overview" selected />
          </div>
          <NavItem variant="menu" icon={<Icon name="ic-overview" size={20} />} expand={false} />
          <NavItem variant="menu" icon={<Icon name="ic-overview" size={20} />} expand={false} selected />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-body-s text-grey-900">Profile — expanded / collapsed</span>
        <div className="flex items-start gap-3">
          <div className="w-[232px]">
            <NavItem variant="profile" name="Mary Freund" email="m.g.freund@aol.com" />
          </div>
          <NavItem variant="profile" expand={false} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-body-s text-grey-900">Action — expanded / collapsed</span>
        <div className="flex items-start gap-3">
          <div className="w-[232px]">
            <NavItem variant="action" label="Download App" />
          </div>
          <NavItem variant="action" expand={false} />
        </div>
      </div>
    </div>
  ),
}

// ─── Sidebar demo — interactive ────────────────────────────────────────────────

const MENU_ITEMS = [
  { key: 'overview', label: 'Overview', icon: 'ic-overview' },
  { key: 'settings',  label: 'Settings', icon: 'ic-settings' },
  { key: 'sort',      label: 'Sort',     icon: 'ic-sort' },
]

function SidebarDemo() {
  const [expand, setExpand] = useState(true)
  const [active, setActive] = useState('overview')

  return (
    <div
      className="flex flex-col gap-4 rounded-lg border border-grey-200 bg-grey-50 p-3 transition-[width] duration-150"
      style={{ width: expand ? 264 : 72 }}
    >
      <NavItem variant="team" label="Organization" expand={expand} />

      <div className="flex flex-col gap-1">
        {MENU_ITEMS.map(item => (
          <NavItem
            key={item.key}
            variant="menu"
            expand={expand}
            selected={active === item.key}
            icon={<Icon name={item.icon} size={20} />}
            label={item.label}
            onClick={() => setActive(item.key)}
          />
        ))}
      </div>

      <NavItem variant="action" expand={expand} label="Download App" />

      <NavItem
        variant="profile"
        expand={expand}
        name="Mary Freund"
        email="m.g.freund@aol.com"
      />

      <button
        type="button"
        onClick={() => setExpand(e => !e)}
        className="self-start text-body-s font-medium text-orchid-1000 cursor-pointer outline-none hover:underline"
      >
        {expand ? 'Collapse' : 'Expand'}
      </button>
    </div>
  )
}

export const SidebarDemoStory: Story = {
  name: 'Sidebar demo',
  render: () => <SidebarDemo />,
}
