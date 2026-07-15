import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { LogoAnimation } from '../components/ui/logo-animation'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/LogoAnimation',
  component: LogoAnimation,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'number', min: 16, max: 128, step: 4 } },
  },
  args: {
    size: 40,
  },
} satisfies Meta<typeof LogoAnimation>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {}

// ─── Sizes ────────────────────────────────────────────────────────────────────
// Figma shows this at a fixed 40px, but the badge/glow/mark scale together
// cleanly, so it's exposed here as a real size prop.

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      {[24, 40, 64, 96].map(size => (
        <div key={size} className="flex flex-col items-center gap-2">
          <LogoAnimation size={size} />
          <span className="text-body-s text-grey-900">{size}px</span>
        </div>
      ))}
    </div>
  ),
}

// ─── Spinning glow — Figma reference ───────────────────────────────────────────
// Figma's four "states" (node 1129:31029) are snapshots of the glow rotating
// behind a static W mark — here it's a real continuous CSS animation
// (`logo-glow-spin` in globals.css) rather than four discrete variants.

export const SpinningGlow: Story = {
  name: 'Spinning glow',
  render: () => <LogoAnimation size={64} />,
}

// ─── In context ───────────────────────────────────────────────────────────────
// As an inline "thinking" indicator, e.g. alongside AI-generated content.

export const InContext: Story = {
  name: 'In context',
  render: () => (
    <div className="flex items-center gap-2 rounded-lg bg-grey-100 px-3 py-2">
      <LogoAnimation size={24} />
      <span className="text-body-m text-grey-900">Thinking…</span>
    </div>
  ),
}
