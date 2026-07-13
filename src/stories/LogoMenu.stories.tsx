import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { LogoMenu } from '../components/ui/logo-menu'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/LogoMenu',
  component: LogoMenu,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof LogoMenu>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────
// Hover the mark to reveal the sidebar-collapse affordance.

export const Playground: Story = {}

// ─── In a sidebar header ────────────────────────────────────────────────────────

export const InSidebarHeader: Story = {
  render: () => (
    <div className="flex items-center gap-2 rounded-md bg-white p-2 w-56 border border-grey-200">
      <LogoMenu />
      <span className="text-body-l font-medium text-grey-950">Worktrace AI</span>
    </div>
  ),
}
