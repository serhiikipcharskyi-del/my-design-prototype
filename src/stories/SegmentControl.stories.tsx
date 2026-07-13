import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import React, { useState } from 'react'
import {
  SegmentControl,
  SegmentControlItem,
  type SegmentControlProps,
} from '../components/ui/segment-control'
import { Icon } from '../components/ui/icons/Icon'

// ─── Controlled wrapper for interactive stories ────────────────────────────────

type ControlledProps<T extends string> = Omit<SegmentControlProps<T>, 'onChange'>

function Controlled<T extends string>(props: ControlledProps<T>) {
  const [val, setVal] = useState(props.value)
  return <SegmentControl {...props} value={val} onChange={setVal} />
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/SegmentControl',
  component: SegmentControl,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    value: 'a',
    onChange: () => {},
    options: [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
    ],
  },
} satisfies Meta<typeof SegmentControl>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────
// Live interactive control — click to switch segments.

export const Playground: Story = {
  render: () => (
    <Controlled
      value="week"
      options={[
        { value: 'day',   label: 'Day'   },
        { value: 'week',  label: 'Week'  },
        { value: 'month', label: 'Month' },
      ]}
    />
  ),
}

// ─── Figma reference — node 203:4329 ─────────────────────────────────────────
// Matches the Figma screenshot exactly: two text tabs + two icon-only tabs.

export const FigmaReference: Story = {
  name: 'Figma Reference',
  render: () => (
    <Controlled
      value="label1"
      options={[
        { value: 'label1', label: 'Label' },
        { value: 'label2', label: 'Label' },
        { value: 'icon1',  label: 'Arrow right', icon: <Icon name="arrow-simple-right" size={20} />, iconOnly: true },
        { value: 'icon2',  label: 'Arrow right', icon: <Icon name="arrow-simple-right" size={20} />, iconOnly: true },
      ]}
    />
  ),
}

// ─── Text labels ──────────────────────────────────────────────────────────────

export const TextLabels: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Controlled
        value="day"
        options={[
          { value: 'day',   label: 'Day'   },
          { value: 'week',  label: 'Week'  },
          { value: 'month', label: 'Month' },
        ]}
      />
      <Controlled
        value="list"
        options={[
          { value: 'list',  label: 'List'  },
          { value: 'board', label: 'Board' },
        ]}
      />
    </div>
  ),
}

// ─── Icon only ────────────────────────────────────────────────────────────────

export const IconOnly: Story = {
  render: () => (
    <Controlled
      value="vertical"
      options={[
        { value: 'vertical',   label: 'List view',       icon: <Icon name="ic-vertical"   size={20} />, iconOnly: true },
        { value: 'horizontal', label: 'Horizontal view', icon: <Icon name="ic-horizontal" size={20} />, iconOnly: true },
        { value: 'overview',   label: 'Grid view',       icon: <Icon name="ic-overview"   size={20} />, iconOnly: true },
      ]}
    />
  ),
}

// ─── Mixed — text + icon-only ─────────────────────────────────────────────────

export const Mixed: Story = {
  render: () => (
    <Controlled
      value="overview"
      options={[
        { value: 'overview', label: 'Overview' },
        { value: 'details',  label: 'Details'  },
        { value: 'settings', label: 'Settings', icon: <Icon name="ic-settings" size={20} />, iconOnly: true },
      ]}
    />
  ),
}

// ─── Item states — individual SegmentControlItem ──────────────────────────────
// Shows each state isolated inside a grey-100 container for correct context.

export const ItemStates: Story = {
  name: 'Item States',
  render: () => (
    <div className="flex flex-col gap-6">
      {/* Text items */}
      <div className="flex flex-col gap-2">
        <span className="text-body-s text-grey-900">Text item</span>
        <div className="inline-flex items-center gap-3">
          <div className="inline-flex items-center h-10 p-0.5 rounded-md bg-grey-100">
            <SegmentControlItem active>Active</SegmentControlItem>
          </div>
          <div className="inline-flex items-center h-10 p-0.5 rounded-md bg-grey-100">
            <SegmentControlItem>Inactive</SegmentControlItem>
          </div>
          <div className="inline-flex items-center h-10 p-0.5 rounded-md bg-grey-100">
            <SegmentControlItem disabled>Disabled</SegmentControlItem>
          </div>
        </div>
      </div>

      {/* Icon-only items */}
      <div className="flex flex-col gap-2">
        <span className="text-body-s text-grey-900">Icon-only item</span>
        <div className="inline-flex items-center gap-3">
          <div className="inline-flex items-center h-10 p-0.5 rounded-md bg-grey-100">
            <SegmentControlItem active iconOnly icon={<Icon name="ic-settings" size={20} />} aria-label="Active" />
          </div>
          <div className="inline-flex items-center h-10 p-0.5 rounded-md bg-grey-100">
            <SegmentControlItem iconOnly icon={<Icon name="ic-settings" size={20} />} aria-label="Inactive" />
          </div>
          <div className="inline-flex items-center h-10 p-0.5 rounded-md bg-grey-100">
            <SegmentControlItem disabled iconOnly icon={<Icon name="ic-settings" size={20} />} aria-label="Disabled" />
          </div>
        </div>
      </div>
    </div>
  ),
}
