import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Button } from '../components/ui/button'
import { Icon } from '../components/ui/icons/Icon'

// ─── Icon name options for the Playground demo picker ─────────────────────────

const DEMO_ICONS = [
  'none',
  'ic-add',
  'ic-search',
  'ic-settings',
  'ic-close',
  'ic-edit',
  'ic-download',
  'arrow-simple-right',
  'arrow-simple-left',
  'arrow-filled-right',
] as const

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant:  { control: 'select',        options: ['primary', 'secondary', 'ghost', 'dangerous'] },
    size:     { control: 'select',        options: ['lg', 'md', 'sm'] },
    iconOnly: { control: 'boolean' },
    loading:  { control: 'boolean' },
    disabled: { control: 'boolean' },
    darkBg:   { control: 'boolean' },
  },
  args: {
    variant: 'primary',
    size: 'lg',
    iconOnly: false,
    loading: false,
    disabled: false,
    darkBg: false,
    children: 'Button',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────
// Extra demo controls (icon picker + position) are added at story level so they
// don't pollute autodocs for other stories.

export const Playground: Story = {
  argTypes: {
    // These are not Button props — they drive the render function below.
    iconDemo: {
      control: 'select',
      options: DEMO_ICONS,
      name: 'Icon',
      description: 'Pick an icon to show (demo helper — not a real Button prop)',
      table: { category: 'Icon demo' },
    },
    iconPosition: {
      control: 'inline-radio',
      options: ['none', 'left', 'right'],
      name: 'Icon position',
      description: 'Where to place the chosen icon (ignored when iconOnly is on)',
      table: { category: 'Icon demo' },
    },
  } as Record<string, unknown>,
  args: {
    iconDemo: 'none',
    iconPosition: 'left',
  } as Record<string, unknown>,
  render: (rawArgs) => {
    // Pull out demo-only controls so they never reach the <button> DOM node.
    const {
      iconDemo = 'none',
      iconPosition = 'left',
      iconOnly,
      size: rawSize,
      children,
      ...buttonProps
    } = rawArgs as Record<string, unknown> & typeof meta.args

    const size = (rawSize ?? 'lg') as import('../components/ui/button').ButtonSize
    const iconSize = size === 'sm' ? 12 : size === 'md' ? 14 : 16
    const iconEl =
      typeof iconDemo === 'string' && iconDemo !== 'none'
        ? <Icon name={iconDemo} size={iconSize} />
        : undefined

    if (iconOnly) {
      // Fallback to ic-add when no icon selected so the button doesn't look empty.
      const content = iconEl ?? <Icon name="ic-add" size={iconSize} />
      return (
        <Button
          size={size}
          iconOnly
          aria-label={typeof children === 'string' ? children : 'icon button'}
          {...buttonProps}
        >
          {content}
        </Button>
      )
    }

    return (
      <Button
        size={size}
        leftIcon={iconPosition === 'left' ? iconEl : undefined}
        rightIcon={iconPosition === 'right' ? iconEl : undefined}
        {...buttonProps}
      >
        {children}
      </Button>
    )
  },
}

// ─── All variants ─────────────────────────────────────────────────────────────
// Matches the Figma component sheet: Primary / Secondary / Dangerous / Ghost
// Each row: lg default · md default · lg disabled · lg loading

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
      <div className="flex items-center gap-3">
        <Button variant="dangerous" size="lg">Dangerous</Button>
        <Button variant="dangerous" size="md">Dangerous</Button>
        <Button variant="dangerous" size="lg" disabled>Disabled</Button>
        <Button variant="dangerous" size="lg" loading>Loading</Button>
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

// ─── Dark background (secondary + darkBg) ─────────────────────────────────────
// Secondary buttons placed on dark/brand surfaces.
// lg/md: transparent with grey hover tint.
// sm: orchid-tinted text with orchid hover tint (tag style from Figma sidebar).

export const DarkBackground: Story = {
  render: () => (
    <div className="rounded-md bg-grey-1000 p-6 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Button variant="secondary" size="lg" darkBg>Secondary lg</Button>
        <Button variant="secondary" size="md" darkBg>Secondary md</Button>
        <Button variant="secondary" size="sm" darkBg>Tag sm</Button>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="secondary" size="lg" darkBg iconOnly aria-label="Add">
          <Icon name="ic-add" />
        </Button>
        <Button variant="secondary" size="md" darkBg iconOnly aria-label="Settings">
          <Icon name="ic-settings" size={14} />
        </Button>
        <Button variant="secondary" size="sm" darkBg iconOnly aria-label="Add small">
          <Icon name="ic-add" size={12} />
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="secondary" size="lg" darkBg disabled>Disabled lg</Button>
        <Button variant="secondary" size="sm" darkBg disabled>Disabled sm</Button>
      </div>
    </div>
  ),
}

// ─── With icons ───────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  render: () => (
    <div className="flex items-center gap-3 flex-wrap">
      <Button variant="primary"    size="lg" leftIcon={<Icon name="ic-add" />}>Add item</Button>
      <Button variant="secondary"  size="lg" leftIcon={<Icon name="ic-search" />}>Search</Button>
      <Button variant="secondary"  size="lg" rightIcon={<Icon name="arrow-simple-right" />}>Continue</Button>
      <Button variant="secondary"  size="md" leftIcon={<Icon name="ic-settings" size={14} />}>Settings</Button>
      <Button variant="dangerous"  size="lg" leftIcon={<Icon name="ic-add" />}>Delete item</Button>
    </div>
  ),
}

// ─── Icon-only ────────────────────────────────────────────────────────────────

export const IconOnly: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 flex-wrap">
        <Button variant="primary"   size="lg" iconOnly aria-label="Add"><Icon name="ic-add" /></Button>
        <Button variant="secondary" size="lg" iconOnly aria-label="Search"><Icon name="ic-search" /></Button>
        <Button variant="secondary" size="md" iconOnly aria-label="Settings"><Icon name="ic-settings" size={14} /></Button>
        <Button variant="secondary" size="sm" iconOnly aria-label="Add small"><Icon name="ic-add" size={12} /></Button>
        <Button variant="dangerous" size="lg" iconOnly aria-label="Delete"><Icon name="ic-add" /></Button>
      </div>
      <div className="rounded-md bg-grey-1000 p-3 flex gap-3">
        <Button variant="ghost"     size="lg" iconOnly aria-label="Settings"><Icon name="ic-settings" /></Button>
        <Button variant="ghost"     size="md" iconOnly aria-label="Search"><Icon name="ic-search" size={14} /></Button>
        <Button variant="secondary" size="lg" darkBg iconOnly aria-label="Add dark"><Icon name="ic-add" /></Button>
        <Button variant="secondary" size="md" darkBg iconOnly aria-label="Settings dark"><Icon name="ic-settings" size={14} /></Button>
      </div>
    </div>
  ),
}

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-3 flex-wrap">
      <Button variant="primary"   size="lg">Large (40px)</Button>
      <Button variant="primary"   size="md">Medium (32px)</Button>
      <Button variant="secondary" size="sm" iconOnly aria-label="Small"><Icon name="ic-add" size={12} /></Button>
    </div>
  ),
}

// ─── States ───────────────────────────────────────────────────────────────────
// Default / Disabled / Loading across all interactive variants.

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
        <div key={label} className="flex items-center gap-4 flex-wrap">
          <span className="w-20 text-body-s text-grey-900 shrink-0">{label}</span>
          <Button variant="primary"   size="lg" disabled={disabled} loading={loading}>Primary</Button>
          <Button variant="secondary" size="lg" disabled={disabled} loading={loading}>Secondary</Button>
          <Button variant="dangerous" size="lg" disabled={disabled} loading={loading}>Dangerous</Button>
        </div>
      ))}
    </div>
  ),
}
