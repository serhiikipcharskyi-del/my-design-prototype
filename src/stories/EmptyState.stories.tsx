import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { EmptyState } from '../components/ui/empty-state'
import { EmptyStateIcon } from '../components/ui/empty-state-icon'
import { Icon } from '../components/ui/icons/Icon'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/EmptyState',
  component: EmptyState,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    title:       { control: 'text' },
    description: { control: 'text' },
  },
  args: {
    icon: <EmptyStateIcon entity="members" />,
    title: 'No members added yet',
    description:
      'Start building your teams and automating the processes by adding members from your organization.',
    actions: [
      { label: 'Add Member', icon: <Icon name="ic-add" size={20} /> },
      { label: 'Invite Members', icon: <Icon name="ic-people" size={20} /> },
      { label: 'Import Members', icon: <Icon name="ic-download" size={20} /> },
    ],
  },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground — Figma reference ─────────────────────────────────────────────
// Matches the Figma component sheet (node 3727:63143).

export const Playground: Story = {}

// ─── Use cases ─────────────────────────────────────────────────────────────────
// Icons, copy and action count all vary by use case — a few realistic examples.

export const NoTeams: Story = {
  args: {
    icon: <EmptyStateIcon entity="teams" />,
    title: 'No teams yet',
    description: 'Create a team to start organizing your members and assigning work.',
    actions: [{ label: 'Create Team', icon: <Icon name="ic-add" size={20} /> }],
  },
}

export const NoSearchResults: Story = {
  args: {
    icon: <EmptyStateIcon entity="search" />,
    title: 'No results found',
    description: 'Try adjusting your search or filters to find what you’re looking for.',
    actions: [],
  },
}

export const NoIcon: Story = {
  name: 'Without icon',
  args: {
    icon: undefined,
    title: 'Nothing here yet',
    description: undefined,
    actions: [{ label: 'Get started', icon: <Icon name="ic-add" size={20} /> }],
  },
}
