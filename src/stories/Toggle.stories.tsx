import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import React, { useState } from 'react'
import { Toggle } from '../components/ui/toggle'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/Toggle',
  component: Toggle,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    checked:  { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    checked: false,
    disabled: false,
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────

function PlaygroundToggle(args: React.ComponentProps<typeof Toggle>) {
  const [checked, setChecked] = useState(args.checked ?? false)
  return <Toggle {...args} checked={checked} onChange={setChecked} />
}

export const Playground: Story = {
  render: (args) => <PlaygroundToggle {...args} />,
}

// ─── States — Figma reference ─────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="w-28 text-body-s text-grey-900 shrink-0">Off</span>
        <Toggle checked={false} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-28 text-body-s text-grey-900 shrink-0">On</span>
        <Toggle checked />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-28 text-body-s text-grey-900 shrink-0">Disabled off</span>
        <Toggle checked={false} disabled />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-28 text-body-s text-grey-900 shrink-0">Disabled on</span>
        <Toggle checked disabled />
      </div>
    </div>
  ),
}

// ─── Interactive ──────────────────────────────────────────────────────────────

function ToggleRow({ label, initial = false }: { label: string; initial?: boolean }) {
  const [checked, setChecked] = useState(initial)
  return (
    <div className="flex items-center justify-between gap-8 min-w-[240px]">
      <span className="text-body-m text-grey-1000">{label}</span>
      <Toggle checked={checked} onChange={setChecked} />
    </div>
  )
}

export const Interactive: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-4 rounded-lg border border-grey-200 bg-white">
      <ToggleRow label="Email notifications"   initial={true}  />
      <ToggleRow label="Push notifications"    initial={false} />
      <ToggleRow label="Weekly digest"         initial={true}  />
      <ToggleRow label="Marketing emails"      initial={false} />
    </div>
  ),
}
