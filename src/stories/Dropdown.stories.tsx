import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Dropdown } from '../components/ui/dropdown'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/Dropdown',
  component: Dropdown,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    label:    { control: 'text' },
    dotColor: { control: 'color' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Drafts reply manually, updates ticket status',
    dotColor: '#0000ff',
    disabled: false,
  },
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {}

// ─── States — Figma reference ─────────────────────────────────────────────────
// Matches the Figma component sheet (node 441:17257). Hover the second row.

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Dropdown label="Drafts reply manually, updates ticket status" />
      <Dropdown label="Drafts reply manually, updates ticket status" className="bg-grey-100" />
      <Dropdown label="Drafts reply manually, updates ticket status" disabled />
    </div>
  ),
}

// ─── Dot colors ────────────────────────────────────────────────────────────────
// The status dot is configurable — a few realistic examples.

export const DotColors: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Dropdown label="Active — responds automatically" dotColor="#2fbf71" />
      <Dropdown label="Paused — waiting for review" dotColor="#f3ad38" />
      <Dropdown label="Disabled — not currently running" dotColor="#a5a6ac" />
    </div>
  ),
}
