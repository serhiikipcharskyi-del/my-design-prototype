import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { TableRow } from '../components/ui/table-row'
import { TableCell } from '../components/ui/table-cell'
import { Tag } from '../components/ui/tag'
import { Button } from '../components/ui/button'
import { Icon } from '../components/ui/icons/Icon'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/TableRow',
  component: TableRow,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof TableRow>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────
// A minimal row — the building blocks accept any number of columns and any
// content inside them.

export const Playground: Story = {
  render: () => (
    <div className="w-[640px] rounded-lg border border-grey-200">
      <TableRow variant="header">
        <TableCell width={240}>
          <span className="text-body-s font-medium text-grey-900">Name</span>
        </TableCell>
        <TableCell grow>
          <span className="text-body-s font-medium text-grey-900">Status</span>
        </TableCell>
        <TableCell width={120} align="right">
          <span className="text-body-s font-medium text-grey-900">Date</span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell width={240}>
          <span className="text-body-m font-medium text-grey-1000">Q3 Roadmap</span>
        </TableCell>
        <TableCell grow>
          <Tag variant="success">Active</Tag>
        </TableCell>
        <TableCell width={120} align="right">
          <span className="text-body-m font-medium text-grey-1000">Jul 12</span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell width={240}>
          <span className="text-body-m font-medium text-grey-1000">Design Review</span>
        </TableCell>
        <TableCell grow>
          <Tag variant="grey">Draft</Tag>
        </TableCell>
        <TableCell width={120} align="right">
          <span className="text-body-m font-medium text-grey-1000">Jul 9</span>
        </TableCell>
      </TableRow>
    </div>
  ),
}

// ─── Sub-components — Figma reference content ─────────────────────────────────
// Reusable bits for the demo rows below; not part of the design system itself.

const Dot = ({ color = 'var(--color-orchid-1000)' }: { color?: string }) => (
  <span className="size-1.5 shrink-0 rounded-full" style={{ background: color }} aria-hidden="true" />
)

const Separator = () => <span className="text-body-s text-grey-1000/16">•</span>

// ─── Process table — Figma reference ───────────────────────────────────────────
// Matches the "Process" variant of the Figma component sheet: header + hover-
// able data rows. Hover the rows below to see the real `:hover` state.

export const ProcessTable: Story = {
  name: 'Process table',
  render: () => (
    <div className="w-[1128px] rounded-lg border border-grey-200">
      <TableRow variant="header">
        <TableCell grow minWidth={160}>
          <span className="text-body-s font-medium text-grey-900">Process</span>
        </TableCell>
        <TableCell width={200} maxWidth={280}>
          <span className="text-body-s font-medium text-grey-900">Team</span>
        </TableCell>
        <TableCell width={104}>
          <span className="text-body-s font-medium text-grey-900">ROI</span>
        </TableCell>
        <TableCell width={104} align="right">
          <span className="text-body-s font-medium text-grey-900">Total Time</span>
        </TableCell>
        <TableCell width={104} align="right">
          <span className="text-body-s font-medium text-grey-900">Workflows</span>
        </TableCell>
        <TableCell width={120} align="right">
          <span className="text-body-s font-medium text-grey-900">Repetitions</span>
        </TableCell>
        <TableCell width={104} align="right">
          <span className="text-body-s font-medium text-grey-900">Time Spent</span>
        </TableCell>
        <TableCell width={44} />
      </TableRow>

      {[
        { name: 'Employee Onboarding', team: 'HR', roi: 'high' as const, total: '86 hrs', workflows: 12, reps: 214, spent: '21 hrs' },
        { name: 'Invoice Approval', team: 'Finance', roi: 'med' as const, total: '54 hrs', workflows: 8, reps: 132, spent: '15 hrs' },
      ].map(row => (
        <TableRow key={row.name}>
          <TableCell grow minWidth={160}>
            <span className="text-body-m font-medium text-grey-1000">{row.name}</span>
          </TableCell>
          <TableCell width={200} maxWidth={280}>
            <Tag variant="team">{row.team}</Tag>
          </TableCell>
          <TableCell width={104}>
            <Tag variant={row.roi}>{row.roi === 'high' ? 'High' : 'Medium'}</Tag>
          </TableCell>
          <TableCell width={104} align="right">
            <span className="text-body-m font-medium text-grey-1000">{row.total}</span>
          </TableCell>
          <TableCell width={104} align="right">
            <span className="text-body-m font-medium text-grey-1000">{row.workflows}</span>
          </TableCell>
          <TableCell width={120} align="right">
            <span className="text-body-m font-medium text-grey-1000">{row.reps}</span>
          </TableCell>
          <TableCell width={104} align="right">
            <span className="text-body-m font-medium text-grey-1000">{row.spent}</span>
          </TableCell>
          <TableCell width={44} align="right">
            <Button variant="secondary" darkBg size="md" iconOnly aria-label="View process">
              <Icon name="arrow-simple-right" />
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </div>
  ),
}

// ─── Opportunity table — Figma reference ───────────────────────────────────────

export const OpportunityTable: Story = {
  name: 'Opportunity table',
  render: () => (
    <div className="w-[1120px] rounded-lg border border-grey-200">
      <TableRow variant="header">
        <TableCell width={360} minWidth={160}>
          <span className="text-body-s font-medium text-grey-900">Opportunity</span>
        </TableCell>
        <TableCell width={168}>
          <span className="text-body-s font-medium text-grey-900">Optimizing For</span>
        </TableCell>
        <TableCell width={104} align="right">
          <span className="text-body-s font-medium text-grey-900">Est. Savings</span>
        </TableCell>
        <TableCell grow minWidth={104} align="right">
          <span className="text-body-s font-medium text-grey-900">% Team Time</span>
        </TableCell>
        <TableCell width={104}>
          <span className="text-body-s font-medium text-grey-900">Effort</span>
        </TableCell>
        <TableCell width={120}>
          <span className="text-body-s font-medium text-grey-900">Goal Match</span>
        </TableCell>
        <TableCell grow maxWidth={160} />
      </TableRow>

      <TableRow>
        <TableCell width={360} minWidth={160} className="flex-col items-start justify-center gap-1">
          <div className="flex items-center gap-1.5">
            <Icon name="ic-chat" size={16} className="text-orchid-1000" />
            <span className="text-body-m font-medium text-grey-1000">Auto-provision accounts on hire date</span>
          </div>
          <div className="flex items-center gap-1.5 pl-[22px]">
            <span className="text-body-s text-grey-800">3 workflows</span>
            <Separator />
            <span className="text-body-s text-grey-800">214 sessions</span>
          </div>
        </TableCell>
        <TableCell width={168}>
          <Dot />
          <span className="text-body-m font-medium text-grey-1000">Faster velocity</span>
        </TableCell>
        <TableCell width={104} align="right">
          <span className="text-body-m font-medium text-grey-1000">+180 hrs/yr</span>
        </TableCell>
        <TableCell grow minWidth={104} align="right">
          <span className="text-body-m font-medium text-grey-1000">12.4%</span>
        </TableCell>
        <TableCell width={104}>
          <span className="text-body-m font-medium text-grey-1000">3 weeks</span>
        </TableCell>
        <TableCell width={120}>
          <Tag variant="high">High</Tag>
        </TableCell>
        <TableCell grow maxWidth={160} align="right">
          <Button variant="secondary" darkBg size="md" rightIcon={<Icon name="arrow-simple-right" />}>
            View Blueprint
          </Button>
        </TableCell>
      </TableRow>
    </div>
  ),
}

// ─── Group summary row — Figma reference ───────────────────────────────────────
// A section-header style row used to introduce a group of rows below it —
// e.g. rolling up a team's stats above its individual processes.

export const GroupSummaryRow: Story = {
  name: 'Group summary row',
  render: () => (
    <div className="w-[1128px] rounded-lg border border-grey-200">
      <TableRow variant="group">
        <TableCell className="gap-3">
          <Button variant="secondary" darkBg size="md" iconOnly aria-label="Collapse group">
            <Icon name="arrow-simple-down" />
          </Button>
          <span className="text-h6 font-semibold text-grey-1000">HR Team</span>
          <Tag variant="high">High</Tag>
        </TableCell>
        <TableCell grow align="right" className="gap-3">
          <span className="text-body-s text-grey-1000">
            Total Automatable: <span className="font-medium text-orchid-1000">304 hrs</span>
          </span>
          <Separator />
          <span className="text-body-s text-grey-1000">
            High ROI: <span className="font-medium text-orchid-1000">143 hrs</span>
          </span>
          <Separator />
          <span className="text-body-s text-grey-1000">
            Medium ROI: <span className="font-medium text-orchid-1000">143 hrs</span>
          </span>
          <Separator />
          <span className="text-body-s text-grey-1000">
            Workflows: <span className="font-semibold text-orchid-1000">43</span>
          </span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell grow>
          <span className="text-body-m font-medium text-grey-1000">Employee Onboarding</span>
        </TableCell>
        <TableCell width={104} align="right">
          <span className="text-body-m font-medium text-grey-1000">86 hrs</span>
        </TableCell>
      </TableRow>
    </div>
  ),
}

// ─── Different column counts ────────────────────────────────────────────────
// Rows are independent of each other — nothing requires matching column
// counts row to row.

export const DifferentColumnCounts: Story = {
  name: 'Different column counts',
  render: () => (
    <div className="w-[480px] rounded-lg border border-grey-200">
      <TableRow>
        <TableCell grow>
          <span className="text-body-m font-medium text-grey-1000">Single column</span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell grow>
          <span className="text-body-m font-medium text-grey-1000">Two</span>
        </TableCell>
        <TableCell width={120} align="right">
          <Tag variant="success">Synced</Tag>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell grow>
          <span className="text-body-m font-medium text-grey-1000">Four</span>
        </TableCell>
        <TableCell width={80} align="right">
          <span className="text-body-m text-grey-1000">12</span>
        </TableCell>
        <TableCell width={80} align="right">
          <span className="text-body-m text-grey-1000">86 hrs</span>
        </TableCell>
        <TableCell width={44} align="right">
          <Icon name="arrow-simple-right" className="text-grey-800" />
        </TableCell>
      </TableRow>
    </div>
  ),
}
