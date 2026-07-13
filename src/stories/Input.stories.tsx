import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import React, { useState } from 'react'
import { Input } from '../components/ui/input'
import { Tag } from '../components/ui/tag'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/Input',
  component: Input,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    label:       { control: 'text' },
    hint:        { control: 'text' },
    error:       { control: 'text' },
    placeholder: { control: 'text' },
    disabled:    { control: 'boolean' },
  },
  args: {
    label: 'Label',
    placeholder: 'Text',
    hint: '',
    error: '',
    disabled: false,
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────

function PlaygroundInput(args: React.ComponentProps<typeof Input>) {
  const [value, setValue] = useState('')
  return (
    <div className="w-[280px]">
      <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  )
}

export const Playground: Story = {
  render: (args) => <PlaygroundInput {...args} />,
}

// ─── States — Figma reference ─────────────────────────────────────────────────
// Matches the Figma component sheet (node 770:36659, type=Input).
// Hover/Focus are real pseudo-states — try them directly in the field below.

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-5 w-[280px]">
      <Input label="Label" placeholder="Text" />
      <Input label="Label" defaultValue="Text" />
      <Input label="Label" defaultValue="Text" hint="Helper text" />
      <Input label="Label" defaultValue="Text" error="This field is required" />
      <Input label="Label" placeholder="Text" disabled />
      <Input label="Label" defaultValue="Text" disabled />
    </div>
  ),
}

// ─── With label action ────────────────────────────────────────────────────────

export const WithLabelAction: Story = {
  name: 'With label action',
  render: () => (
    <div className="w-[280px]">
      <Input
        type="password"
        label="Password"
        placeholder="Enter your password"
        labelAction={
          <button type="button" className="cursor-pointer outline-none hover:underline">
            Forgot password?
          </button>
        }
      />
    </div>
  ),
}

// ─── With tags ────────────────────────────────────────────────────────────────

export const WithTags: Story = {
  name: 'With tags',
  render: () => (
    <div className="w-[320px]">
      <Input
        label="Team members"
        placeholder="Add another..."
        tags={
          <>
            <Tag variant="team" dotColor="#c95bc1">Success</Tag>
            <Tag variant="team" dotColor="#3da5fa">Success</Tag>
          </>
        }
      />
    </div>
  ),
}

// ─── Form example ─────────────────────────────────────────────────────────────

function LoginFormDemo() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="flex flex-col gap-4 w-[280px] p-5 rounded-lg border border-grey-200 bg-white">
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        labelAction={
          <button type="button" className="cursor-pointer outline-none hover:underline">
            Forgot password?
          </button>
        }
      />
    </div>
  )
}

export const FormExample: Story = {
  name: 'Form example',
  render: () => <LoginFormDemo />,
}
