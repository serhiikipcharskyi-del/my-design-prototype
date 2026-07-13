import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import React, { useState } from 'react'
import { ListItem } from '../components/ui/list-item'
import { Icon } from '../components/ui/icons/Icon'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/ListItem',
  component: ListItem,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant:      { control: 'select', options: ['simple', 'team', 'member'] },
    selected:     { control: 'boolean' },
    showCheckbox: { control: 'boolean' },
    checked:      { control: 'boolean' },
  },
  args: {
    variant: 'simple',
    label: 'Most Common',
    selected: false,
    showCheckbox: false,
    checked: false,
  },
} satisfies Meta<typeof ListItem>

export default meta
type Story = StoryObj<typeof meta>

// ─── Shared list wrapper ──────────────────────────────────────────────────────

const List = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col w-[240px] rounded-md border border-grey-200 bg-white overflow-hidden shadow-s">
    {children}
  </div>
)

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {}

// ─── Figma reference — all variants ──────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <List>
      {/* Simple */}
      <ListItem variant="simple" label="Most Common"   selected />
      <ListItem variant="simple" label="Most Common" />

      {/* Team */}
      <ListItem
        variant="team"
        label="Organization"
        subtitle="ORG · 20 members"
        initials="O"
        selected
      />
      <ListItem
        variant="team"
        label="Organization"
        subtitle="ORG · 20 members"
        initials="O"
      />

      {/* Member */}
      <ListItem
        variant="member"
        label="Mary Freund"
        subtitle="m.g.freund@aol.com"
        avatar="https://i.pravatar.cc/40?img=47"
        selected
      />
      <ListItem
        variant="member"
        label="Mary Freund"
        subtitle="m.g.freund@aol.com"
        avatar="https://i.pravatar.cc/40?img=47"
      />
    </List>
  ),
}

// ─── Simple — interactive single-select ───────────────────────────────────────

const TIME_FILTERS = ['Any time', 'Today', 'This week', 'This month', 'This year']

function SimpleSelectDemo() {
  const [selected, setSelected] = useState('Any time')
  return (
    <List>
      {TIME_FILTERS.map(opt => (
        <ListItem
          key={opt}
          variant="simple"
          label={opt}
          selected={selected === opt}
          onClick={() => setSelected(opt)}
        />
      ))}
    </List>
  )
}

export const SimpleSelect: Story = {
  name: 'Simple — single-select',
  render: () => <SimpleSelectDemo />,
}

// ─── Simple with icon ─────────────────────────────────────────────────────────

function SimpleWithIconDemo() {
  const [selected, setSelected] = useState('Edit')
  const items = [
    { label: 'Edit',   icon: 'ic-edit'     },
    { label: 'Copy',   icon: 'ic-copy'     },
    { label: 'Export', icon: 'ic-export'   },
  ]
  return (
    <List>
      {items.map(({ label, icon }) => (
        <ListItem
          key={label}
          variant="simple"
          label={label}
          leftIcon={<Icon name={icon} size={16} />}
          selected={selected === label}
          onClick={() => setSelected(label)}
        />
      ))}
    </List>
  )
}

export const SimpleWithIcon: Story = {
  name: 'Simple — with icon',
  render: () => <SimpleWithIconDemo />,
}

// ─── With checkbox — multi-select ─────────────────────────────────────────────

const MEMBERS = [
  { id: '1', label: 'Mary Freund',   subtitle: 'm.g.freund@aol.com',    avatar: 'https://i.pravatar.cc/40?img=47' },
  { id: '2', label: 'John Smith',    subtitle: 'j.smith@example.com',   avatar: 'https://i.pravatar.cc/40?img=11' },
  { id: '3', label: 'Anna Johnson',  subtitle: 'a.johnson@example.com', avatar: 'https://i.pravatar.cc/40?img=32' },
]

function MultiSelectDemo() {
  const [checked, setChecked] = useState<Set<string>>(new Set(['1']))

  const toggle = (id: string) =>
    setChecked(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  return (
    <List>
      {MEMBERS.map(m => (
        <ListItem
          key={m.id}
          variant="member"
          label={m.label}
          subtitle={m.subtitle}
          avatar={m.avatar}
          showCheckbox
          checked={checked.has(m.id)}
          onCheckedChange={() => toggle(m.id)}
          onClick={() => toggle(m.id)}
        />
      ))}
    </List>
  )
}

export const WithCheckbox: Story = {
  name: 'Member — with checkbox',
  render: () => <MultiSelectDemo />,
}

// ─── Team — single-select ─────────────────────────────────────────────────────

const TEAMS = [
  { id: '1', label: 'Design',       subtitle: 'DES · 8 members',  initials: 'D' },
  { id: '2', label: 'Engineering',  subtitle: 'ENG · 24 members', initials: 'E' },
  { id: '3', label: 'Product',      subtitle: 'PRD · 6 members',  initials: 'P' },
]

function TeamSelectDemo() {
  const [selected, setSelected] = useState('1')
  return (
    <List>
      {TEAMS.map(t => (
        <ListItem
          key={t.id}
          variant="team"
          label={t.label}
          subtitle={t.subtitle}
          initials={t.initials}
          selected={selected === t.id}
          onClick={() => setSelected(t.id)}
        />
      ))}
    </List>
  )
}

export const TeamSelect: Story = {
  name: 'Team — single-select',
  render: () => <TeamSelectDemo />,
}
