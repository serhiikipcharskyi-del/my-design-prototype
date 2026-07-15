import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { WarningNote } from '../components/ui/warning-note'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/WarningNote',
  component: WarningNote,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    type: { control: { type: 'radio' }, options: ['attention', 'warning'] },
  },
  args: {
    type: 'attention',
    children: 'To create member profiles, you must map at least the Name and Email fields.',
  },
} satisfies Meta<typeof WarningNote>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: args => (
    <div className="w-[584px]">
      <WarningNote {...args} />
    </div>
  ),
}

// ─── States — Figma reference ─────────────────────────────────────────────────
// Matches the Figma component sheet (node 4328:53631).

export const States: Story = {
  render: () => (
    <div className="flex w-[584px] flex-col gap-3">
      <WarningNote type="attention">
        To create member profiles, you must map at least the Name and Email fields.
      </WarningNote>
      <WarningNote type="warning">
        To create member profiles, you must map at least the Name and Email fields.
      </WarningNote>
    </div>
  ),
}

// ─── Wrapping text ──────────────────────────────────────────────────────────
// Unlike Figma's fixed 584px frame, the note wraps naturally at any width.

export const WrappingText: Story = {
  name: 'Wrapping text',
  render: () => (
    <div className="w-[280px]">
      <WarningNote type="warning">
        To create member profiles, you must map at least the Name and Email fields from your
        uploaded file before continuing.
      </WarningNote>
    </div>
  ),
}
