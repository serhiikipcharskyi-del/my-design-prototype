import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { Toast, type ToastType } from '../components/ui/toast'
import { Button } from '../components/ui/button'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/Toast',
  component: Toast,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    type: { control: { type: 'radio' }, options: ['success', 'information', 'warning', 'error'] },
  },
  args: {
    type: 'success',
  },
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: { message: 'Your changes have been saved.' },
}

// ─── States — Figma reference ─────────────────────────────────────────────────
// Matches the Figma component sheet (node 2986:54115).

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Toast type="success" />
      <Toast type="information" />
      <Toast type="warning" />
      <Toast type="error" />
    </div>
  ),
}

// ─── Toast stack — dismissible ─────────────────────────────────────────────────
// A realistic stack: trigger toasts, dismiss them individually.

let nextId = 0

function ToastStackDemo() {
  const [toasts, setToasts] = useState<{ id: number; type: ToastType; message: string }[]>([])

  const push = (type: ToastType, message: string) => {
    const id = nextId++
    setToasts(t => [...t, { id, type, message }])
  }

  const dismiss = (id: number) => setToasts(t => t.filter(toast => toast.id !== id))

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={() => push('success', 'Automation published successfully.')}>
          Trigger success
        </Button>
        <Button size="sm" onClick={() => push('information', 'A new version is available.')}>
          Trigger info
        </Button>
        <Button size="sm" onClick={() => push('warning', 'This action can’t be undone.')}>
          Trigger warning
        </Button>
        <Button size="sm" onClick={() => push('error', 'Something went wrong. Try again.')}>
          Trigger error
        </Button>
      </div>
      <div className="flex w-[480px] flex-col gap-2">
        {toasts.map(t => (
          <Toast key={t.id} type={t.type} message={t.message} onClose={() => dismiss(t.id)} />
        ))}
      </div>
    </div>
  )
}

export const ToastStack: Story = {
  name: 'Toast stack',
  render: () => <ToastStackDemo />,
}
