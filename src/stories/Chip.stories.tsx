import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import React, { useState } from 'react'
import { Chip } from '../components/ui/chip'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/Chip',
  component: Chip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    selected:  { control: 'boolean' },
    disabled:  { control: 'boolean' },
  },
  args: {
    selected: false,
    disabled: false,
    children: 'Any time',
  },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────
// Named component keeps useState stable across re-renders (rules of hooks).

function PlaygroundChip(args: React.ComponentProps<typeof Chip>) {
  const [selected, setSelected] = useState(args.selected ?? false)
  return (
    <Chip {...args} selected={selected} onClick={() => setSelected(s => !s)} />
  )
}

export const Playground: Story = {
  render: (args) => <PlaygroundChip {...args} />,
}

// ─── States — Figma reference ─────────────────────────────────────────────────
// Matches the Figma component sheet (node 3677:59317).

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-2 items-start">
      <div className="flex items-center gap-4">
        <span className="w-28 text-body-s text-grey-900 shrink-0">Default</span>
        <Chip>Any time</Chip>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-28 text-body-s text-grey-900 shrink-0">Selected</span>
        <Chip selected>Any time</Chip>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-28 text-body-s text-grey-900 shrink-0">Disabled</span>
        <Chip disabled>Any time</Chip>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-28 text-body-s text-grey-900 shrink-0">Disabled selected</span>
        <Chip disabled selected>Any time</Chip>
      </div>
    </div>
  ),
}

// ─── Single-select group ──────────────────────────────────────────────────────

const TIME_OPTIONS = ['Any time', 'Today', 'This week', 'This month', 'This year']

function SingleSelectDemo() {
  const [active, setActive] = useState('Any time')
  return (
    <div className="flex flex-wrap gap-2">
      {TIME_OPTIONS.map(opt => (
        <Chip
          key={opt}
          selected={active === opt}
          onClick={() => setActive(opt)}
        >
          {opt}
        </Chip>
      ))}
    </div>
  )
}

export const SingleSelect: Story = {
  name: 'Single select',
  render: () => <SingleSelectDemo />,
}

// ─── Multi-select group ───────────────────────────────────────────────────────

const STATUS_OPTIONS = ['Active', 'Pending', 'Completed', 'Cancelled', 'On hold']

function MultiSelectDemo() {
  const [selected, setSelected] = useState<Set<string>>(new Set(['Active']))
  const toggle = (opt: string) =>
    setSelected(prev => {
      const next = new Set(prev)
      next.has(opt) ? next.delete(opt) : next.add(opt)
      return next
    })
  return (
    <div className="flex flex-wrap gap-2">
      {STATUS_OPTIONS.map(opt => (
        <Chip key={opt} selected={selected.has(opt)} onClick={() => toggle(opt)}>
          {opt}
        </Chip>
      ))}
    </div>
  )
}

export const MultiSelect: Story = {
  name: 'Multi select',
  render: () => <MultiSelectDemo />,
}
