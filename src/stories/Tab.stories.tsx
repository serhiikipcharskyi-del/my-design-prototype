import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import React, { useState } from 'react'
import { Tab, TabList } from '../components/ui/tab'
import { Icon } from '../components/ui/icons/Icon'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/Tab',
  component: Tab,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    active:   { control: 'boolean' },
    disabled: { control: 'boolean' },
    badge:    { control: 'text', description: 'Badge content (e.g. "3")' },
  },
  args: {
    active: true,
    disabled: false,
    children: 'Label',
  },
} satisfies Meta<typeof Tab>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {}

// ─── States — Figma reference ─────────────────────────────────────────────────
// Matches Figma node 319:6610: active + inactive × with badge / without badge.

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 items-start">
        <span className="text-body-s text-grey-800 mb-1">Active</span>
        <div className="flex items-end gap-1">
          <Tab active>Label</Tab>
          <Tab active badge={1}>Label</Tab>
          <Tab active leftIcon={<Icon name="ic-decide" size={16} />}>Label</Tab>
          <Tab active badge={3} leftIcon={<Icon name="ic-decide" size={16} />}>Label</Tab>
        </div>
      </div>

      <div className="flex flex-col gap-1 items-start">
        <span className="text-body-s text-grey-800 mb-1">Inactive</span>
        <div className="flex items-end gap-1">
          <Tab>Label</Tab>
          <Tab badge={1}>Label</Tab>
          <Tab leftIcon={<Icon name="ic-decide" size={16} />}>Label</Tab>
          <Tab badge={3} leftIcon={<Icon name="ic-decide" size={16} />}>Label</Tab>
        </div>
      </div>

      <div className="flex flex-col gap-1 items-start">
        <span className="text-body-s text-grey-800 mb-1">Disabled</span>
        <div className="flex items-end gap-1">
          <Tab active disabled>Label</Tab>
          <Tab disabled badge={1}>Label</Tab>
        </div>
      </div>
    </div>
  ),
}

// ─── Tab bar — interactive ────────────────────────────────────────────────────

const TABS = [
  { id: 'overview',  label: 'Overview'  },
  { id: 'details',   label: 'Details',  badge: 3 },
  { id: 'activity',  label: 'Activity', badge: 12 },
  { id: 'settings',  label: 'Settings' },
]

function TabBarDemo() {
  const [active, setActive] = useState('overview')
  return (
    <div className="flex flex-col gap-0 w-[420px]">
      <TabList>
        {TABS.map(t => (
          <Tab
            key={t.id}
            active={active === t.id}
            badge={t.badge}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </Tab>
        ))}
      </TabList>
      <div className="p-4 text-body-m text-grey-900 border border-t-0 border-grey-200 rounded-b-md">
        Content for <strong className="text-grey-1000">{TABS.find(t => t.id === active)?.label}</strong>
      </div>
    </div>
  )
}

export const TabBar: Story = {
  name: 'Tab bar (interactive)',
  render: () => <TabBarDemo />,
}

// ─── With icons ───────────────────────────────────────────────────────────────

function WithIconsDemo() {
  const [active, setActive] = useState('process')
  const tabs = [
    { id: 'process',  label: 'Process',  icon: 'ic-process'  },
    { id: 'agent',    label: 'Agent',    icon: 'ic-agent'    },
    { id: 'settings', label: 'Settings', icon: 'ic-settings' },
  ]
  return (
    <TabList>
      {tabs.map(t => (
        <Tab
          key={t.id}
          active={active === t.id}
          leftIcon={<Icon name={t.icon} size={16} />}
          onClick={() => setActive(t.id)}
        >
          {t.label}
        </Tab>
      ))}
    </TabList>
  )
}

export const WithIcons: Story = {
  name: 'With icons',
  render: () => <WithIconsDemo />,
}
