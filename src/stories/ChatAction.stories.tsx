import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ChatAction } from '../components/ui/chat-action'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/ChatAction',
  component: ChatAction,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    active: { control: 'boolean' },
  },
  args: {
    active: true,
  },
} satisfies Meta<typeof ChatAction>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────
// Hover to see the shadow/gradient shift.

export const Playground: Story = {}

// ─── States — Figma reference ─────────────────────────────────────────────────
// Matches the Figma component sheet (node 454:15596). Hover each to compare.

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <ChatAction active />
          <span className="text-body-s text-grey-900">Active</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <ChatAction active={false} />
          <span className="text-body-s text-grey-900">Inactive</span>
        </div>
      </div>
    </div>
  ),
}

// ─── In a chat input ───────────────────────────────────────────────────────────

export const InChatInput: Story = {
  render: () => (
    <div className="flex w-80 items-center gap-2 rounded-xl border border-grey-200 bg-white p-2">
      <span className="flex-1 px-2 text-body-m text-grey-800">Type a message…</span>
      <ChatAction active />
    </div>
  ),
}
