import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { BrandLogo, type BrandName } from '../components/ui/icons/brand-logo'

const BRAND_NAMES: BrandName[] = [
  'amplitude',
  'asana',
  'chatgpt',
  'claude',
  'figma',
  'gemini',
  'github',
  'gmail',
  'google-analytics',
  'google-meet',
  'google-meet-square',
  'granola',
  'hubspot',
  'mixpanel',
  'outlook',
  'salesforce',
  'shopify',
  'slack',
  'zendesk',
]

// ─── Sub-components ───────────────────────────────────────────────────────────

interface GridProps {
  size: number
  showNames: boolean
}

const BrandLogoGrid = ({ size, showNames }: GridProps) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fill, minmax(${size + 48}px, 1fr))`,
      gap: '8px',
      padding: 16,
    }}
  >
    {BRAND_NAMES.map(name => (
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
        }}
      >
        <BrandLogo name={name} size={size} />
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

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/BrandLogo',
  component: BrandLogoGrid,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'range', min: 16, max: 64, step: 4 } },
    showNames: { control: 'boolean' },
  },
  args: {
    size: 24,
    showNames: true,
  },
} satisfies Meta<typeof BrandLogoGrid>

export default meta
type Story = StoryObj<typeof meta>

// ─── Stories ──────────────────────────────────────────────────────────────────

export const AllBrands: Story = { name: 'All brands' }

export const Large: Story = { args: { size: 40 } }

export const NoLabels: Story = { name: 'No labels', args: { showNames: false, size: 32 } }

// ─── Single logo ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => <BrandLogo name="slack" size={32} />,
}
