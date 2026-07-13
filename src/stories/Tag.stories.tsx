import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import React, { useState } from 'react'
import { Tag, type TagProps, type TagVariant } from '../components/ui/tag'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/Tag',
  component: Tag,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['high', 'med', 'low', 'na', 'alert', 'success', 'grey', 'team', 'member'] satisfies TagVariant[],
    },
    dotColor: { control: 'color' },
    // onRemove is a function — control it via showClose below
    onRemove: { table: { disable: true } },
  },
  args: {
    variant: 'team',
    children: 'Design',
    dotColor: '#c95bc1',
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────
// showClose is a story-level boolean control that wires up onRemove.
// The close button only renders for 'team' and 'member' variants (per Figma).

export const Playground: Story = {
  argTypes: {
    showClose: {
      control: 'boolean',
      name: 'Show close button',
      description: 'Passes onRemove to the tag — button appears on team / member variants',
      table: { category: 'Close button' },
    },
  } as Record<string, unknown>,
  args: { showClose: false } as Record<string, unknown>,
  render: (rawArgs) => {
    const { showClose, ...tagProps } = rawArgs as TagProps & { showClose: boolean }
    return (
      <Tag
        {...tagProps}
        onRemove={showClose ? () => {} : undefined}
      />
    )
  },
}

// ─── All variants — Figma reference ──────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 items-start">
      <Tag variant="high">High</Tag>
      <Tag variant="med">Med</Tag>
      <Tag variant="low">Low</Tag>
      <Tag variant="na">Skip</Tag>
      <Tag variant="alert">Alert</Tag>
      <Tag variant="success">Success</Tag>
      <Tag variant="grey">Label</Tag>
      <Tag variant="team"   dotColor="#c95bc1">Success</Tag>
      <Tag variant="team"   dotColor="#c95bc1" onRemove={() => {}}>Success</Tag>
      <Tag variant="member" avatar="https://i.pravatar.cc/40?img=47">Mary Freund</Tag>
      <Tag variant="member" avatar="https://i.pravatar.cc/40?img=47" onRemove={() => {}}>Mary Freund</Tag>
    </div>
  ),
}

// ─── Status tags ──────────────────────────────────────────────────────────────

export const Status: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag variant="high">High</Tag>
      <Tag variant="med">Med</Tag>
      <Tag variant="low">Low</Tag>
      <Tag variant="na">Skip</Tag>
      <Tag variant="alert">Alert</Tag>
      <Tag variant="success">Success</Tag>
      <Tag variant="grey">Pending</Tag>
    </div>
  ),
}

// ─── Team tags ────────────────────────────────────────────────────────────────

export const Team: Story = {
  render: () => (
    <div className="flex flex-col gap-3 items-start">
      <div className="flex flex-wrap gap-2">
        <Tag variant="team" dotColor="#c95bc1">Design</Tag>
        <Tag variant="team" dotColor="#06a192">Engineering</Tag>
        <Tag variant="team" dotColor="#f74980">Marketing</Tag>
        <Tag variant="team" dotColor="#ffa02e">Product</Tag>
      </div>
      <span className="text-body-s text-grey-800">With close button</span>
      <div className="flex flex-wrap gap-2">
        <Tag variant="team" dotColor="#c95bc1" onRemove={() => {}}>Design</Tag>
        <Tag variant="team" dotColor="#06a192" onRemove={() => {}}>Engineering</Tag>
        <Tag variant="team" dotColor="#f74980" onRemove={() => {}}>Marketing</Tag>
        <Tag variant="team" dotColor="#ffa02e" onRemove={() => {}}>Product</Tag>
      </div>
    </div>
  ),
}

// ─── Member tags ──────────────────────────────────────────────────────────────

export const Member: Story = {
  render: () => (
    <div className="flex flex-col gap-3 items-start">
      <div className="flex flex-wrap gap-2">
        <Tag variant="member" avatar="https://i.pravatar.cc/40?img=47">Mary Freund</Tag>
        <Tag variant="member" avatar="https://i.pravatar.cc/40?img=11">John Smith</Tag>
        <Tag variant="member">No avatar</Tag>
      </div>
      <span className="text-body-s text-grey-800">With close button</span>
      <div className="flex flex-wrap gap-2">
        <Tag variant="member" avatar="https://i.pravatar.cc/40?img=47" onRemove={() => {}}>Mary Freund</Tag>
        <Tag variant="member" avatar="https://i.pravatar.cc/40?img=11" onRemove={() => {}}>John Smith</Tag>
        <Tag variant="member" onRemove={() => {}}>No avatar</Tag>
      </div>
    </div>
  ),
}

// ─── With remove — interactive ────────────────────────────────────────────────

function RemovableTagsDemo() {
  const initial = [
    { id: 1, variant: 'team'   as TagVariant, label: 'Design',      dot: '#c95bc1', avatar: undefined },
    { id: 2, variant: 'team'   as TagVariant, label: 'Engineering', dot: '#06a192', avatar: undefined },
    { id: 3, variant: 'member' as TagVariant, label: 'Mary Freund', dot: undefined, avatar: 'https://i.pravatar.cc/40?img=47' },
    { id: 4, variant: 'member' as TagVariant, label: 'John Smith',  dot: undefined, avatar: 'https://i.pravatar.cc/40?img=11' },
  ]
  const [tags, setTags] = useState(initial)
  return (
    <div className="flex flex-wrap gap-2 min-w-[280px]">
      {tags.length === 0 && (
        <span className="text-body-s text-grey-800">All tags removed</span>
      )}
      {tags.map(t => (
        <Tag
          key={t.id}
          variant={t.variant}
          dotColor={t.dot}
          avatar={t.avatar}
          onRemove={() => setTags(prev => prev.filter(x => x.id !== t.id))}
        >
          {t.label}
        </Tag>
      ))}
    </div>
  )
}

export const WithRemove: Story = {
  name: 'With Remove (interactive)',
  render: () => <RemovableTagsDemo />,
}
