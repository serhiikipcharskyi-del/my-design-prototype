import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import React from 'react'
import { ChatSuggestion } from '../components/ui/chat-suggestion'
import { Icon } from '../components/ui/icons/Icon'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/Chat Suggestion',
  component: ChatSuggestion,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
  },
  args: {
    label: 'Summarize workflow',
  },
} satisfies Meta<typeof ChatSuggestion>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => (
    <div className="w-[368px]">
      <ChatSuggestion {...args} />
    </div>
  ),
}

// ─── States — Figma reference ─────────────────────────────────────────────────
// Matches the Figma component sheet (node 319:6767). Hover is a real
// pseudo-state — try it directly on the row below.

export const States: Story = {
  render: () => (
    <div className="flex w-[368px] flex-col gap-1">
      <ChatSuggestion label="Summarize workflow" />
      <ChatSuggestion label="Summarize workflow" className="bg-grey-200" />
    </div>
  ),
}

// ─── Suggestion list ────────────────────────────────────────────────────────

const SUGGESTIONS = [
  { label: 'Summarize workflow', icon: 'ic-decide' },
  { label: 'Find related tasks', icon: 'ic-search' },
  { label: 'Sort by priority',   icon: 'ic-sort' },
]

export const SuggestionList: Story = {
  name: 'Suggestion list',
  render: () => (
    <div className="flex w-[368px] flex-col gap-1 rounded-lg border border-grey-200 bg-white p-2">
      {SUGGESTIONS.map(s => (
        <ChatSuggestion
          key={s.label}
          label={s.label}
          icon={<Icon name={s.icon} size={16} />}
          onClick={() => {}}
        />
      ))}
    </div>
  ),
}
