import type { Meta, StoryObj } from '@storybook/nextjs-vite'

// ─── Types ────────────────────────────────────────────────────────────────────

interface StyleSpec {
  token: string
  label: string
  family: string
  size: string
  lineHeight: string
  weight: string
  tracking?: string
  className: string
  sampleText?: string
}

// ─── Style catalogue (mirrors Figma text styles exactly) ─────────────────────

const INTER_HEADLINES: StyleSpec[] = [
  { token: '--text-h1',      label: 'Headlines / Inter / H1', family: 'Inter', size: '36px', lineHeight: '40px', weight: 'Bold (700)',      className: 'text-h1 font-bold' },
  { token: '--text-h2',      label: 'Headlines / Inter / H2', family: 'Inter', size: '24px', lineHeight: '40px', weight: 'Bold (700)',      className: 'text-h2 font-bold' },
  { token: '--text-h3',      label: 'Headlines / Inter / H3', family: 'Inter', size: '18px', lineHeight: '28px', weight: 'SemiBold (600)',  className: 'text-h3 font-semibold' },
  { token: '--text-h4',      label: 'Headlines / Inter / H4', family: 'Inter', size: '16px', lineHeight: '24px', weight: 'SemiBold (600)',  className: 'text-h4 font-semibold' },
  { token: '--text-h5',      label: 'Headlines / Inter / H5', family: 'Inter', size: '14px', lineHeight: '16px', weight: 'SemiBold (600)',  className: 'text-h5 font-semibold' },
  { token: '--text-h6',      label: 'Headlines / Inter / H6', family: 'Inter', size: '13px', lineHeight: '16px', weight: 'SemiBold (600)',  className: 'text-h6 font-semibold' },
]

const SERIF_HEADLINES: StyleSpec[] = [
  { token: '--text-serif-h1', label: 'Headlines / Hedvig Serif / H1', family: 'Hedvig Letters Serif', size: '20px', lineHeight: '32px', weight: 'Regular (400)', className: 'text-serif-h1 font-serif' },
  { token: '--text-serif-h2', label: 'Headlines / Hedvig Serif / H2', family: 'Hedvig Letters Serif', size: '16px', lineHeight: '24px', weight: 'Regular (400)', className: 'text-serif-h2 font-serif' },
]

const DISPLAY_HEADLINES: StyleSpec[] = [
  { token: '--text-display-h1',    label: 'Headlines / DM Sans / H1',      family: 'DM Sans', size: '36px', lineHeight: '130%',  weight: 'Medium (500)', tracking: '-0.02em', className: 'text-display-h1 font-display font-medium tracking-display' },
  { token: '--text-display-h1',    label: 'Headlines / DM Sans / H1 Bold', family: 'DM Sans', size: '36px', lineHeight: '130%',  weight: 'Bold (700)',   tracking: '-0.02em', className: 'text-display-h1 font-display font-bold tracking-display' },
  { token: '--text-onboarding-h1', label: 'Onboarding / H1',               family: 'DM Sans', size: '32px', lineHeight: '40px',  weight: 'Medium (500)', tracking: '-0.02em', className: 'text-onboarding-h1 font-display font-medium tracking-display' },
  { token: '--text-display-h2',    label: 'Onboarding / H2',               family: 'DM Sans', size: '28px', lineHeight: '40px',  weight: 'Medium (500)', tracking: '-0.02em', className: 'text-display-h2 font-display font-medium tracking-display' },
  { token: '--text-display-h3',    label: 'Onboarding / H3',               family: 'DM Sans', size: '20px', lineHeight: '128%',  weight: 'Bold (700)',   tracking: '-0.01em', className: 'text-display-h3 font-display font-bold tracking-display-sm' },
  { token: '--text-h3',            label: 'Onboarding / H4',               family: 'Inter',   size: '18px', lineHeight: 'auto',  weight: 'Bold (700)',                        className: 'text-h3 font-bold' },
  { token: '--text-h4',            label: 'Onboarding / H5',               family: 'Inter',   size: '16px', lineHeight: 'auto',  weight: 'Bold (700)',                        className: 'text-h4 font-bold' },
]

const BODY: StyleSpec[] = [
  { token: '--text-body-xl',         label: 'Body / XL',         family: 'Inter', size: '20px', lineHeight: '28px', weight: 'Regular (400)',    className: 'text-body-xl' },
  { token: '--text-body-l',          label: 'Body / L',          family: 'Inter', size: '14px', lineHeight: '24px', weight: 'Regular (400)',    className: 'text-body-l' },
  { token: '--text-body-l',          label: 'Body / L Semibold', family: 'Inter', size: '14px', lineHeight: '24px', weight: 'SemiBold (600)',   className: 'text-body-l font-semibold' },
  { token: '--text-body-m',          label: 'Body / M',          family: 'Inter', size: '13px', lineHeight: '18px', weight: 'Medium (500)',     className: 'text-body-m font-medium' },
  { token: '--text-body-s',          label: 'Body / S',          family: 'Inter', size: '12px', lineHeight: '16px', weight: 'SemiBold (600)',   className: 'text-body-s font-semibold' },
  { token: '--text-body-xs',         label: 'Body / XS',         family: 'Inter', size: '12px', lineHeight: '16px', weight: 'Medium (500)',     className: 'text-body-xs font-medium' },
  { token: '--text-onboarding-body-l', label: 'Onboarding / Body L', family: 'Inter', size: '18px', lineHeight: '28px', weight: 'Medium (500)', className: 'text-onboarding-body-l font-medium' },
  { token: '--text-onboarding-body-m', label: 'Onboarding / Body M', family: 'Inter', size: '14px', lineHeight: '18px', weight: 'Regular (400)',className: 'text-onboarding-body-m' },
]

// ─── Row component ────────────────────────────────────────────────────────────

const StyleRow = ({ spec }: { spec: StyleSpec }) => (
  <div className="flex items-baseline gap-6 border-b border-grey-200 py-4 last:border-0">
    {/* Sample text */}
    <div className={`${spec.className} text-grey-1000 w-72 shrink-0`}>
      {spec.sampleText ?? 'The quick brown fox'}
    </div>
    {/* Spec */}
    <div className="flex flex-wrap gap-x-6 gap-y-1 text-body-xs font-medium text-grey-800">
      <span className="text-grey-900 font-semibold">{spec.label}</span>
      <span>{spec.family}</span>
      <span>{spec.size} / {spec.lineHeight}</span>
      <span>{spec.weight}</span>
      {spec.tracking && <span>ls {spec.tracking}</span>}
      <code className="text-orchid-1000 bg-orchid-50 px-1 rounded-xs">{spec.token}</code>
    </div>
  </div>
)

const Section = ({ title, items }: { title: string; items: StyleSpec[] }) => (
  <div className="mb-10">
    <h3 className="text-h6 font-semibold text-grey-800 uppercase tracking-wide mb-2 pb-2 border-b-2 border-grey-200">
      {title}
    </h3>
    {items.map((spec, i) => <StyleRow key={i} spec={spec} />)}
  </div>
)

// ─── Story component ──────────────────────────────────────────────────────────

const TypographyScale = () => (
  <div className="p-8 max-w-4xl font-sans">
    <Section title="Headlines — Inter"             items={INTER_HEADLINES} />
    <Section title="Headlines — Hedvig Letters Serif" items={SERIF_HEADLINES} />
    <Section title="Headlines — DM Sans / Onboarding" items={DISPLAY_HEADLINES} />
    <Section title="Body"                          items={BODY} />
  </div>
)

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/Typography',
  component: TypographyScale,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof TypographyScale>

export default meta
type Story = StoryObj<typeof meta>

export const Scale: Story = {}
