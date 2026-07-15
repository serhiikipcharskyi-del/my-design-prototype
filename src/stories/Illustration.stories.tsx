import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Illustration, type IllustrationName } from '../components/ui/illustration'
import { EmptyState } from '../components/ui/empty-state'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/Illustration',
  component: Illustration,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'select' },
      options: [
        'upload-file',
        'upload-image',
        'image',
        'process',
        'form',
        'form-done',
        'team',
        'member',
      ],
    },
  },
  args: {
    name: 'form',
  },
} satisfies Meta<typeof Illustration>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {}

// ─── All illustrations — Figma reference ──────────────────────────────────────
// Matches the Figma component sheet (node 5599:7368).

const NAMES: IllustrationName[] = [
  'upload-file',
  'upload-image',
  'image',
  'process',
  'form',
  'form-done',
  'team',
  'member',
]

export const AllIllustrations: Story = {
  name: 'All illustrations',
  render: () => (
    <div className="flex flex-wrap items-end gap-8">
      {NAMES.map(name => (
        <div key={name} className="flex flex-col items-center gap-2">
          <Illustration name={name} />
          <span className="font-mono text-body-s text-grey-900">{name}</span>
        </div>
      ))}
    </div>
  ),
}

// ─── In an empty state ─────────────────────────────────────────────────────────
// Same illustrations, used as the EmptyState icon slot.

export const InEmptyState: Story = {
  name: 'In an empty state',
  render: () => (
    <div className="flex flex-wrap gap-6">
      <EmptyState
        icon={<Illustration name="team" />}
        title="No teams yet"
        description="Create a team to start organizing your members."
        actions={[{ label: 'Create Team' }]}
      />
      <EmptyState
        icon={<Illustration name="process" />}
        title="No processes yet"
        description="Automations you create will show up here."
        actions={[{ label: 'Create Process' }]}
      />
    </div>
  ),
}
