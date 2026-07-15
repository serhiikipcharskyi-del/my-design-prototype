import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { EmptyStateIcon, type EmptyStateEntity } from '../components/ui/empty-state-icon'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/EmptyStateIcon',
  component: EmptyStateIcon,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    entity: { control: { type: 'radio' }, options: ['members', 'teams', 'search'] },
    size:   { control: { type: 'range', min: 24, max: 96, step: 4 } },
  },
  args: {
    entity: 'members',
    size: 40,
  },
} satisfies Meta<typeof EmptyStateIcon>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {}

// ─── Entities — Figma reference ────────────────────────────────────────────────
// Matches the Figma component sheet (node 3727:63167).

const ENTITIES: EmptyStateEntity[] = ['members', 'teams', 'search']

export const Entities: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      {ENTITIES.map(entity => (
        <div key={entity} className="flex flex-col items-center gap-4">
          <EmptyStateIcon entity={entity} />
          <span className="text-body-s text-grey-900 capitalize">{entity}</span>
        </div>
      ))}
    </div>
  ),
}

// ─── In an empty state ─────────────────────────────────────────────────────────

export const InEmptyState: Story = {
  render: () => (
    <div className="flex w-72 flex-col items-center gap-3 rounded-xl border border-grey-200 p-8 text-center">
      <EmptyStateIcon entity="teams" size={48} />
      <div className="flex flex-col gap-1">
        <span className="text-body-l font-medium text-grey-1000">No teams yet</span>
        <span className="text-body-m text-grey-900">
          Create a team to start organizing your members.
        </span>
      </div>
    </div>
  ),
}

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-8 py-4">
      {[24, 32, 40, 56, 80].map(size => (
        <div key={size} className="flex flex-col items-center gap-6">
          <EmptyStateIcon entity="search" size={size} />
          <span className="text-body-s text-grey-900">{size}px</span>
        </div>
      ))}
    </div>
  ),
}
