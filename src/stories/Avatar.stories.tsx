import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Avatar, type AvatarSize } from '../components/ui/avatar'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    src:      { control: 'text' },
    initials: { control: 'text' },
    size:     { control: { type: 'select' }, options: [16, 20, 24, 32, 36, 40, 48, 56, 64, 80, 160] },
    editable: { control: 'boolean' },
    tooltip:  { control: 'text' },
  },
  args: {
    src: 'https://i.pravatar.cc/160?img=47',
    initials: undefined,
    size: 40,
    editable: false,
    tooltip: undefined,
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {}

// ─── Sizes — Figma reference ──────────────────────────────────────────────────
// Matches the Figma component sheet (node 2186:45055).

const SIZES: AvatarSize[] = [16, 20, 24, 32, 36, 40, 48, 56, 64, 80, 160]

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-6">
      {SIZES.map(size => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Avatar src="https://i.pravatar.cc/160?img=47" size={size} />
          <span className="text-body-s text-grey-900">{size}px</span>
        </div>
      ))}
    </div>
  ),
}

// ─── Fallbacks ────────────────────────────────────────────────────────────────
// Image → initials → generic icon, in priority order.

export const Fallbacks: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Avatar src="https://i.pravatar.cc/80?img=47" size={64} />
        <span className="text-body-s text-grey-900">Image</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar initials="AB" size={64} />
        <span className="text-body-s text-grey-900">Initials</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar size={64} />
        <span className="text-body-s text-grey-900">Icon</span>
      </div>
    </div>
  ),
}

// ─── Editable ─────────────────────────────────────────────────────────────────
// Hover to reveal the dark overlay + edit affordance.

export const Editable: Story = {
  args: {
    src: 'https://i.pravatar.cc/160?img=47',
    size: 64,
    editable: true,
  },
}

// ─── With tooltip ─────────────────────────────────────────────────────────────
// Hover to reveal the name tooltip.

export const WithTooltip: Story = {
  args: {
    src: 'https://i.pravatar.cc/64?img=47',
    size: 32,
    tooltip: 'Mary Freund',
  },
}

// ─── Group ────────────────────────────────────────────────────────────────────
// Overlapping avatar stack, e.g. for assignees on a task.

export const Group: Story = {
  render: () => (
    <div className="flex items-center -space-x-2">
      <Avatar src="https://i.pravatar.cc/64?img=47" size={32} tooltip="Mary Freund" className="ring-2 ring-white" />
      <Avatar src="https://i.pravatar.cc/64?img=11" size={32} tooltip="John Smith" className="ring-2 ring-white" />
      <Avatar initials="TK" size={32} tooltip="Tom King" className="ring-2 ring-white" />
      <Avatar initials="+3" size={32} className="ring-2 ring-white" />
    </div>
  ),
}
