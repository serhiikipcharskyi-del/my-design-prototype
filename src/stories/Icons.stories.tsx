import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { icons } from '../components/ui/icons/icons-data'
import { Icon } from '../components/ui/icons/Icon'

const arrows  = icons.filter(i => i.name.startsWith('arrow-'))
const navIcons = icons.filter(i => !i.name.startsWith('arrow-'))

// ─── Sub-components ───────────────────────────────────────────────────────────

interface GridProps {
  items: typeof icons
  size: number
  color: string
  showNames: boolean
}

const IconTileGrid = ({ items, size, color, showNames }: GridProps) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fill, minmax(${size + 48}px, 1fr))`,
      gap: '8px',
    }}
  >
    {items.map(({ name }) => (
      <div
        key={name}
        title={name}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          padding: '16px 8px',
          borderRadius: '8px',
          border: '1px solid #ebebee',
          cursor: 'default',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#f5f5f7')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        <Icon name={name} size={size} style={{ color }} />
        {showNames && (
          <span
            style={{
              fontSize: '10px',
              fontFamily: 'monospace',
              color: '#a5a6ac',
              textAlign: 'center',
              wordBreak: 'break-all',
              lineHeight: 1.3,
            }}
          >
            {name}
          </span>
        )}
      </div>
    ))}
  </div>
)

// ─── Main component ───────────────────────────────────────────────────────────

interface IconGridProps {
  size: number
  color: string
  showNames: boolean
}

const sectionLabel = (text: string, count: number) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '24px 0 12px' }}>
    <span style={{ fontSize: 13, fontWeight: 600, color: '#1f2030' }}>{text}</span>
    <span style={{ fontSize: 11, color: '#a5a6ac' }}>{count}</span>
  </div>
)

const IconGrid = ({ size, color, showNames }: IconGridProps) => (
  <div style={{ padding: 16 }}>
    {sectionLabel('Arrows', arrows.length)}
    <IconTileGrid items={arrows}   size={size} color={color} showNames={showNames} />
    {sectionLabel('Navigation Icons', navIcons.length)}
    <IconTileGrid items={navIcons} size={size} color={color} showNames={showNames} />
  </div>
)

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/Icons',
  component: IconGrid,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    size:      { control: { type: 'range', min: 12, max: 48, step: 4 } },
    color:     { control: 'color' },
    showNames: { control: 'boolean' },
  },
  args: {
    size: 24,
    color: '#1f2030',
    showNames: true,
  },
} satisfies Meta<typeof IconGrid>

export default meta
type Story = StoryObj<typeof meta>

// ─── Stories ──────────────────────────────────────────────────────────────────

/** Default 24 px — stroke 1.6 px */
export const Default: Story = {}

/** 20 px — stroke 1.4 px */
export const Medium: Story = { args: { size: 20 } }

/** 16 px — stroke 1.2 px */
export const Small: Story = { args: { size: 16 } }

/** 40 px — stroke 1.6 px */
export const Large: Story = { args: { size: 40 } }

/** Brand orchid colour */
export const Brand: Story = { args: { color: '#c95bc1' } }

/** Grid without labels */
export const NoLabels: Story = { args: { showNames: false, size: 32 } }
