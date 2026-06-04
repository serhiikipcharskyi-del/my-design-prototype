import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Button } from '../components/ui/button'
import { icons } from '../components/ui/icons/icons-data'

// ─── Inline icon helper (uses pre-processed SVG strings — no SVGR needed) ────

const svg = (name: string) => icons.find(i => i.name === name)?.svg ?? ''

const Icon = ({ name, size = 16 }: { name: string; size?: number }) => (
  <span
    style={{ width: size, height: size, display: 'inline-flex', flexShrink: 0 }}
    dangerouslySetInnerHTML={{ __html: svg(name) }}
    aria-hidden="true"
  />
)

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant:  { control: 'select', options: ['primary', 'secondary', 'ghost'] },
    size:     { control: 'select', options: ['lg', 'md', 'sm'] },
    iconOnly: { control: 'boolean' },
    loading:  { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    variant: 'primary',
    size: 'lg',
    iconOnly: false,
    loading: false,
    disabled: false,
    children: 'Button',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {}

// ─── All variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Button variant="primary"   size="lg">Primary</Button>
        <Button variant="primary"   size="md">Primary</Button>
        <Button variant="primary"   size="lg" disabled>Disabled</Button>
        <Button variant="primary"   size="lg" loading>Loading</Button>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="secondary" size="lg">Secondary</Button>
        <Button variant="secondary" size="md">Secondary</Button>
        <Button variant="secondary" size="lg" disabled>Disabled</Button>
        <Button variant="secondary" size="lg" loading>Loading</Button>
      </div>
      <div className="flex items-center gap-3 rounded-md bg-grey-1000 p-4">
        <Button variant="ghost" size="lg">Ghost</Button>
        <Button variant="ghost" size="md">Ghost</Button>
        <Button variant="ghost" size="lg" disabled>Disabled</Button>
        <Button variant="ghost" size="lg" loading>Loading</Button>
      </div>
    </div>
  ),
}

// ─── With icons ───────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  render: () => (
    <div className="flex items-center gap-3 flex-wrap">
      <Button variant="primary"   size="lg" leftIcon={<Icon name="ic-add" />}>Add item</Button>
      <Button variant="secondary" size="lg" leftIcon={<Icon name="ic-search" />}>Search</Button>
      <Button variant="secondary" size="lg" rightIcon={<Icon name="arrow-simple-right" />}>Continue</Button>
      <Button variant="secondary" size="md" leftIcon={<Icon name="ic-settings" size={14} />}>Settings</Button>
    </div>
  ),
}

// ─── Icon-only ────────────────────────────────────────────────────────────────

export const IconOnly: Story = {
  render: () => (
    <div className="flex items-center gap-3 flex-wrap">
      <Button variant="primary"   size="lg" iconOnly aria-label="Add"><Icon name="ic-add" /></Button>
      <Button variant="secondary" size="lg" iconOnly aria-label="Search"><Icon name="ic-search" /></Button>
      <Button variant="secondary" size="md" iconOnly aria-label="Settings"><Icon name="ic-settings" size={14} /></Button>
      <Button variant="secondary" size="sm" iconOnly aria-label="Add small"><Icon name="ic-add" size={12} /></Button>
      <div className="rounded-md bg-grey-1000 p-3 flex gap-3">
        <Button variant="ghost" size="lg" iconOnly aria-label="Settings"><Icon name="ic-settings" /></Button>
        <Button variant="ghost" size="md" iconOnly aria-label="Search"><Icon name="ic-search" size={14} /></Button>
      </div>
    </div>
  ),
}

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      <Button variant="primary"   size="lg">Large (40px)</Button>
      <Button variant="primary"   size="md">Medium (32px)</Button>
      <Button variant="secondary" size="sm" iconOnly aria-label="Small add"><Icon name="ic-add" size={12} /></Button>
    </div>
  ),
}

// ─── States ───────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(
        [
          ['Default',  false, false],
          ['Disabled', true,  false],
          ['Loading',  false, true ],
        ] as [string, boolean, boolean][]
      ).map(([label, disabled, loading]) => (
        <div key={label} className="flex items-center gap-4">
          <span className="w-20 text-body-s text-grey-900 shrink-0">{label}</span>
          <Button variant="primary"   size="lg" disabled={disabled} loading={loading}>Primary</Button>
          <Button variant="secondary" size="lg" disabled={disabled} loading={loading}>Secondary</Button>
        </div>
      ))}
    </div>
  ),
}
