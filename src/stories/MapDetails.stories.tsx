import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { MapDetails } from '../components/ui/map-details'
import { Tag } from '../components/ui/tag'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/MapDetails',
  component: MapDetails,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    type: { control: { type: 'radio' }, options: ['action', 'system', 'question'] },
    active: { control: 'boolean' },
  },
  args: {
    type: 'action',
    children: 'New Hire Information Collection',
  },
} satisfies Meta<typeof MapDetails>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────
// Click the node to select it — real click-to-toggle, not a simulated prop
// (leave the `active` control unset to try it; setting it takes over as a
// controlled selection instead). Once selected, hover to reveal the toolbar
// + details panel.

export const Playground: Story = {
  render: args => (
    <div className="p-16">
      <MapDetails
        {...args}
        roi={<Tag variant="med">Medium</Tag>}
        stats={[
          { label: 'Variants', value: 4 },
          { label: 'Steps', value: 6 },
          { label: 'Repetitions', value: 128 },
          { label: 'Time spent', value: '21 hrs' },
        ]}
      />
    </div>
  ),
}

// ─── States — Figma reference ─────────────────────────────────────────────────
// Matches the Figma component sheet (node 1434:6213). Click a node to select
// it, then hover to see the toolbar + details panel — both are real
// interactions (click-to-select, `:hover` to reveal), not simulated props.

export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-24 p-16">
      <div className="flex flex-col items-center gap-3">
        <MapDetails type="action">New Hire Information Collection</MapDetails>
        <span className="text-body-s text-grey-900">Action — resting</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <MapDetails type="system">New Hire Information Collection</MapDetails>
        <span className="text-body-s text-grey-900">System — resting</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <MapDetails type="question">Documents Complete?</MapDetails>
        <span className="text-body-s text-grey-900">Question</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <MapDetails
          type="action"
          roi={<Tag variant="med">Medium</Tag>}
          stats={[
            { label: 'Variants', value: 4 },
            { label: 'Steps', value: 6 },
            { label: 'Repetitions', value: 128 },
            { label: 'Time spent', value: '21 hrs' },
          ]}
        >
          New Hire Information Collection
        </MapDetails>
        <span className="text-body-s text-grey-900">Action — click to select</span>
      </div>
    </div>
  ),
}

// ─── In a map ─────────────────────────────────────────────────────────────────
// A few nodes laid out together, as they'd appear on a process map canvas.

export const InAMap: Story = {
  name: 'In a map',
  render: () => (
    <div className="relative flex flex-wrap items-start gap-16 p-16">
      <MapDetails type="action">Collect new hire documents</MapDetails>
      <MapDetails type="question">Documents Complete?</MapDetails>
      <MapDetails type="system">Auto-provision accounts</MapDetails>
    </div>
  ),
}
