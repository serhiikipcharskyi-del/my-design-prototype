import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { ChatInput } from '../components/ui/chat-input'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/ChatInput',
  component: ChatInput,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    value: '',
    onChange: () => {},
  },
} satisfies Meta<typeof ChatInput>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground — AI chat, Figma reference ────────────────────────────────────
// Matches the Figma component sheet (node 455:16021): type to enable send,
// hover/focus the border, submit with Enter.

function AiChatDemo() {
  const [value, setValue] = useState('')
  const [mode, setMode] = useState<'decide' | 'ask'>('decide')
  const [messages, setMessages] = useState<string[]>([])

  return (
    <div className="flex w-[448px] flex-col gap-3">
      {messages.length > 0 && (
        <div className="flex flex-col gap-1 rounded-lg bg-grey-50 p-3 text-body-s text-grey-900">
          {messages.map((m, i) => (
            <div key={i}>→ {m}</div>
          ))}
        </div>
      )}
      <ChatInput
        value={value}
        onChange={setValue}
        onSubmit={v => {
          setMessages(m => [...m, v])
          setValue('')
        }}
        mode={mode}
        onModeChange={setMode}
        modes={[
          { value: 'decide', label: 'Decide' },
          { value: 'ask', label: 'Ask' },
        ]}
      />
    </div>
  )
}

export const Playground: Story = {
  render: () => <AiChatDemo />,
}

// ─── Working — streaming a response ───────────────────────────────────────────

function WorkingDemo() {
  const [loading, setLoading] = useState(true)
  return (
    <div className="w-[448px]">
      <ChatInput
        value=""
        onChange={() => {}}
        loading={loading}
        onStop={() => setLoading(false)}
        modes={[
          { value: 'decide', label: 'Decide' },
          { value: 'ask', label: 'Ask' },
        ]}
        mode="decide"
        onModeChange={() => {}}
      />
    </div>
  )
}

export const Working: Story = {
  render: () => <WorkingDemo />,
}

// ─── Comment input ─────────────────────────────────────────────────────────────
// No modes, no expand button — a plain comment box on e.g. a task or ticket.

function CommentDemo() {
  const [value, setValue] = useState('')
  return (
    <div className="w-[448px]">
      <ChatInput
        value={value}
        onChange={setValue}
        onSubmit={() => setValue('')}
        placeholder="Add a comment..."
        showExpand={false}
      />
    </div>
  )
}

export const CommentInput: Story = {
  name: 'Comment input',
  render: () => <CommentDemo />,
}

// ─── Instruction input ─────────────────────────────────────────────────────────
// Same component, different copy — e.g. custom automation instructions.

function InstructionDemo() {
  const [value, setValue] = useState(
    'When a customer asks for a refund, check order status before replying.',
  )
  return (
    <div className="w-[448px]">
      <ChatInput
        value={value}
        onChange={setValue}
        onSubmit={() => {}}
        placeholder="Add an instruction for the agent..."
        showExpand={false}
      />
    </div>
  )
}

export const InstructionInput: Story = {
  name: 'Instruction input',
  render: () => <InstructionDemo />,
}
