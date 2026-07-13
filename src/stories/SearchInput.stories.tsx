import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import React, { useState } from 'react'
import { SearchInput } from '../components/ui/search-input'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/Search Input',
  component: SearchInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    placeholder:   { control: 'text' },
    showShortcut:  { control: 'boolean' },
    disabled:      { control: 'boolean' },
  },
  args: {
    placeholder: 'Search',
    showShortcut: false,
    disabled: false,
  },
} satisfies Meta<typeof SearchInput>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────

function PlaygroundSearchInput(args: React.ComponentProps<typeof SearchInput>) {
  const [value, setValue] = useState('')
  return (
    <div className="w-[240px]">
      <SearchInput {...args} value={value} onChange={setValue} />
    </div>
  )
}

export const Playground: Story = {
  render: (args) => <PlaygroundSearchInput {...args} />,
}

// ─── States — Figma reference ─────────────────────────────────────────────────
// Matches the Figma component sheet (node 770:36659, type=Search).
// Hover/Focus are real pseudo-states — try them directly in the field below.

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[240px]">
      <SearchInput placeholder="Search" />
      <SearchInput defaultValue="Results" />
      <SearchInput placeholder="Search" showShortcut />
      <SearchInput placeholder="Search" disabled />
    </div>
  ),
}

// ─── Filterable list demo ──────────────────────────────────────────────────────

const ITEMS = ['Design system', 'Component library', 'Storybook setup', 'Dark mode', 'Search input', 'Dashboard layout']

function FilterableListDemo() {
  const [query, setQuery] = useState('')
  const filtered = ITEMS.filter(item => item.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="flex flex-col gap-3 w-[280px]">
      <SearchInput value={query} onChange={setQuery} placeholder="Search components..." />
      <div className="flex flex-col gap-1">
        {filtered.length > 0 ? (
          filtered.map(item => (
            <div key={item} className="px-3 py-2 rounded-md text-body-m text-grey-1000 hover:bg-grey-100">
              {item}
            </div>
          ))
        ) : (
          <div className="px-3 py-2 text-body-m text-grey-800">No results</div>
        )}
      </div>
    </div>
  )
}

export const FilterableList: Story = {
  name: 'Filterable list',
  render: () => <FilterableListDemo />,
}
