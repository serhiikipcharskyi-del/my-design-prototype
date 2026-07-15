import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { LogoEditing } from '../components/ui/logo-editing'
import logoMark from '../components/ui/logo-mark.png'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/LogoEditing',
  component: LogoEditing,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
  },
  args: {
    src: undefined,
  },
} satisfies Meta<typeof LogoEditing>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────
// Hover to reveal the upload/change affordance.

export const Playground: Story = {}

// ─── States — Figma reference ─────────────────────────────────────────────────
// Matches the Figma component sheet (node 3949:59242). Hover each to see the
// dark overlay + edit icon affordance.

export const States: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <LogoEditing />
        <span className="text-body-s text-grey-900">Empty</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <LogoEditing src={logoMark.src} />
        <span className="text-body-s text-grey-900">Filled</span>
      </div>
    </div>
  ),
}

// ─── In a settings row ─────────────────────────────────────────────────────────

export const InSettingsRow: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <LogoEditing src={logoMark.src} onClick={() => {}} />
      <div className="flex flex-col gap-0.5">
        <span className="text-body-m font-medium text-grey-1000">Organization logo</span>
        <span className="text-body-s text-grey-900">PNG or SVG, at least 256×256px</span>
      </div>
    </div>
  ),
}
