import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import React, { useState } from 'react'
import { Radio, RadioGroup } from '../components/ui/radio'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/Radio',
  component: Radio,
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
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────

function PlaygroundRadio(args: React.ComponentProps<typeof Radio>) {
  const [checked, setChecked] = useState(args.checked ?? false)
  return <Radio {...args} checked={checked} onChange={setChecked} />
}

export const Playground: Story = {
  render: (args) => <PlaygroundRadio {...args} />,
}

// ─── States — Figma reference ─────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {([
        { label: 'Unselected',          checked: false, disabled: false },
        { label: 'Selected',            checked: true,  disabled: false },
        { label: 'Unselected disabled', checked: false, disabled: true  },
        { label: 'Selected disabled',   checked: true,  disabled: true  },
      ] as const).map(({ label, ...props }) => (
        <div key={label} className="flex items-center gap-3">
          <Radio {...props} />
          <span className="text-body-m text-grey-900">{label}</span>
        </div>
      ))}
    </div>
  ),
}

// ─── Group — vertical (interactive) ──────────────────────────────────────────

function VerticalGroupDemo() {
  const [value, setValue] = useState('week')
  return (
    <RadioGroup
      value={value}
      onChange={setValue}
      options={[
        { value: 'day',   label: 'Day'   },
        { value: 'week',  label: 'Week'  },
        { value: 'month', label: 'Month' },
        { value: 'year',  label: 'Year'  },
      ]}
    />
  )
}

export const GroupVertical: Story = {
  name: 'Group — vertical',
  render: () => <VerticalGroupDemo />,
}

// ─── Group — horizontal ───────────────────────────────────────────────────────

function HorizontalGroupDemo() {
  const [value, setValue] = useState('high')
  return (
    <RadioGroup
      value={value}
      onChange={setValue}
      direction="horizontal"
      options={[
        { value: 'high',   label: 'High'   },
        { value: 'medium', label: 'Medium' },
        { value: 'low',    label: 'Low'    },
      ]}
    />
  )
}

export const GroupHorizontal: Story = {
  name: 'Group — horizontal',
  render: () => <HorizontalGroupDemo />,
}

// ─── Group — with disabled options ────────────────────────────────────────────

function DisabledOptionsDemo() {
  const [value, setValue] = useState('standard')
  return (
    <RadioGroup
      value={value}
      onChange={setValue}
      options={[
        { value: 'standard',  label: 'Standard plan'  },
        { value: 'pro',       label: 'Pro plan'        },
        { value: 'enterprise', label: 'Enterprise (coming soon)', disabled: true },
      ]}
    />
  )
}

export const GroupWithDisabled: Story = {
  name: 'Group — with disabled option',
  render: () => <DisabledOptionsDemo />,
}

// ─── Group — all disabled ─────────────────────────────────────────────────────

export const GroupDisabled: Story = {
  name: 'Group — all disabled',
  render: () => (
    <RadioGroup
      value="week"
      onChange={() => {}}
      disabled
      options={[
        { value: 'day',   label: 'Day'   },
        { value: 'week',  label: 'Week'  },
        { value: 'month', label: 'Month' },
      ]}
    />
  ),
}
