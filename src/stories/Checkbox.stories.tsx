import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import React, { useState } from 'react'
import { Checkbox } from '../components/ui/checkbox'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    checked:       { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled:      { control: 'boolean' },
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────

function PlaygroundCheckbox(args: React.ComponentProps<typeof Checkbox>) {
  const [checked, setChecked] = useState(args.checked ?? false)
  return <Checkbox {...args} checked={checked} onChange={setChecked} />
}

export const Playground: Story = {
  render: (args) => <PlaygroundCheckbox {...args} />,
}

// ─── States — Figma reference ─────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {([
        { label: 'Unchecked',              checked: false, indeterminate: false, disabled: false },
        { label: 'Checked',                checked: true,  indeterminate: false, disabled: false },
        { label: 'Indeterminate',          checked: true,  indeterminate: true,  disabled: false },
        { label: 'Unchecked disabled',     checked: false, indeterminate: false, disabled: true  },
        { label: 'Checked disabled',       checked: true,  indeterminate: false, disabled: true  },
        { label: 'Indeterminate disabled', checked: true,  indeterminate: true,  disabled: true  },
      ] as const).map(({ label, ...props }) => (
        <div key={label} className="flex items-center gap-3">
          <Checkbox {...props} />
          <span className="text-body-m text-grey-900">{label}</span>
        </div>
      ))}
    </div>
  ),
}

// ─── List — interactive with select-all ───────────────────────────────────────

const ITEMS = ['Design system', 'Component library', 'Storybook setup', 'Dark mode'] as const

function CheckboxListDemo() {
  const [selected, setSelected] = useState<Set<string>>(new Set(['Design system']))

  const toggle = (id: string) =>
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const allChecked   = selected.size === ITEMS.length
  const someSelected = selected.size > 0 && !allChecked

  return (
    <div className="flex flex-col gap-3 min-w-[220px]">
      <div className="flex items-center gap-3 pb-2 border-b border-grey-200">
        <Checkbox
          checked={allChecked}
          indeterminate={someSelected}
          onChange={checked => setSelected(checked ? new Set(ITEMS) : new Set())}
        />
        <span className="text-body-m font-medium text-grey-1000">Select all</span>
      </div>
      {ITEMS.map(item => (
        <div key={item} className="flex items-center gap-3">
          <Checkbox
            checked={selected.has(item)}
            onChange={() => toggle(item)}
          />
          <span className="text-body-m text-grey-900">{item}</span>
        </div>
      ))}
    </div>
  )
}

export const List: Story = {
  name: 'List (interactive)',
  render: () => <CheckboxListDemo />,
}
