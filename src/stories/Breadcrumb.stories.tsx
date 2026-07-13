import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Breadcrumb } from '../components/ui/breadcrumb'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/Breadcrumb',
  component: Breadcrumb,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    active:    { control: 'boolean' },
    leftIcon:  { control: 'boolean' },
    rightIcon: { control: 'boolean' },
  },
  args: {
    active: false,
    leftIcon: true,
    rightIcon: true,
    children: 'Workflow',
  },
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {}

// ─── States ───────────────────────────────────────────────────────────────────
// Matches the Figma component sheet: Not active / Not active + hover / Active / Active + hover
// (hover is a real :hover state here, so it's shown via a label instead of a prop)

export const States: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      {(
        [
          ['Not active', false],
          ['Active', true],
        ] as [string, boolean][]
      ).map(([label, active]) => (
        <div key={label} className="flex flex-col items-center gap-2">
          <span className="text-body-s text-grey-900">{label} (hover to preview)</span>
          <Breadcrumb active={active}>Workflow</Breadcrumb>
        </div>
      ))}
    </div>
  ),
}
