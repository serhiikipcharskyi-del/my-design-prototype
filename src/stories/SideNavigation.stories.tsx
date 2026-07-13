import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import React, { useState } from 'react'
import { SideNavigation } from '../components/ui/side-navigation'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/Side Navigation',
  component: SideNavigation,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['main', 'process'] },
    expand:  { control: 'boolean' },
  },
  args: {
    variant: 'main',
    expand: true,
    selectedKey: 'overview',
  },
} satisfies Meta<typeof SideNavigation>

export default meta
type Story = StoryObj<typeof meta>

// ─── Search popup placeholder ───────────────────────────────────────────────────
// Stand-in overlay — the Search item is a plain trigger button (see NavItem
// "menu" variant), not a text field. This just proves out onSearch wiring
// until the real search/command popup exists.

function SearchPopupPlaceholder({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/20 pt-32"
      onClick={onClose}
    >
      <div
        className="w-[480px] rounded-lg border border-grey-200 bg-white p-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-body-m font-medium text-grey-1000">Search popup — coming soon</p>
        <p className="mt-1 text-body-s text-grey-800">Triggered via the Search button&apos;s onSearch callback.</p>
      </div>
    </div>
  )
}

// ─── Playground — fully interactive ────────────────────────────────────────────

function PlaygroundNav(args: React.ComponentProps<typeof SideNavigation>) {
  const [expand, setExpand] = useState(args.expand ?? true)
  const [selectedKey, setSelectedKey] = useState(args.selectedKey ?? 'overview')
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div style={{ height: 640 }}>
      <SideNavigation
        {...args}
        expand={expand}
        onExpandChange={setExpand}
        selectedKey={selectedKey}
        onSelect={setSelectedKey}
        onSearch={() => setSearchOpen(true)}
      />
      {searchOpen && <SearchPopupPlaceholder onClose={() => setSearchOpen(false)} />}
    </div>
  )
}

export const Playground: Story = {
  // key forces a remount when a Controls value changes, so the story's
  // internal state (expand/selectedKey) picks up the new args on every edit.
  render: (args) => <PlaygroundNav key={JSON.stringify(args)} {...args} />,
}

// ─── States — Figma reference ─────────────────────────────────────────────────
// Matches the Figma component sheet (node 758:25006): main/process × expand/collapse.

export const States: Story = {
  render: () => (
    <div className="flex" style={{ height: 900 }}>
      <SideNavigation variant="main" expand selectedKey="overview" />
      <SideNavigation variant="main" expand={false} selectedKey="overview" />
      <SideNavigation variant="process" expand selectedKey="onboarding" />
      <SideNavigation variant="process" expand={false} selectedKey="onboarding" />
    </div>
  ),
}

// ─── Drill-down demo — main ↔ process ───────────────────────────────────────────

function DrillDownDemo() {
  const [expand, setExpand] = useState(true)
  const [inProcess, setInProcess] = useState(false)
  const [selectedKey, setSelectedKey] = useState('overview')
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div style={{ height: 640 }}>
      {inProcess ? (
        <SideNavigation
          variant="process"
          expand={expand}
          onExpandChange={setExpand}
          selectedKey={selectedKey}
          onSelect={setSelectedKey}
          onBack={() => { setInProcess(false); setSelectedKey('processes') }}
        />
      ) : (
        <SideNavigation
          variant="main"
          expand={expand}
          onExpandChange={setExpand}
          selectedKey={selectedKey}
          onSelect={(key) => {
            setSelectedKey(key)
            if (key === 'processes') setInProcess(true)
          }}
          onSearch={() => setSearchOpen(true)}
        />
      )}
      {searchOpen && <SearchPopupPlaceholder onClose={() => setSearchOpen(false)} />}
    </div>
  )
}

export const DrillDown: Story = {
  name: 'Drill-down demo',
  render: () => <DrillDownDemo />,
}
