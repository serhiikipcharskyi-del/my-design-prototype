import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { BulkActions } from '../components/ui/bulk-actions'
import { Checkbox } from '../components/ui/checkbox'
import { RemoveFromTeamIcon, DeactivateUserIcon } from '../components/ui/icons/pictograms'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/BulkActions',
  component: BulkActions,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    selectedCount: 0,
    actions: [],
  },
} satisfies Meta<typeof BulkActions>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground — Figma reference ─────────────────────────────────────────────
// Matches the Figma component sheet (node 3182:29993).

export const Playground: Story = {
  args: {
    selectedCount: 2,
    itemLabel: 'Members',
    actions: [
      { label: 'Remove from the team', icon: <RemoveFromTeamIcon size={16} /> },
      { label: 'Deactivate Member', icon: <DeactivateUserIcon size={16} />, destructive: true },
    ],
  },
  render: args => <BulkActions {...args} className="w-[740px]" />,
}

// ─── In a member table ─────────────────────────────────────────────────────────
// A realistic, fully interactive use case: select rows, watch the bar update
// and disappear once nothing is selected. The same bar/pattern works for any
// selectable list — teams, tickets, automations — just swap itemLabel/actions.

const MEMBERS = [
  { id: 1, name: 'Mary Freund', email: 'm.g.freund@aol.com' },
  { id: 2, name: 'John Smith', email: 'j.smith@aol.com' },
  { id: 3, name: 'Priya Natarajan', email: 'priya.n@aol.com' },
  { id: 4, name: 'Tom King', email: 't.king@aol.com' },
]

function MemberTableDemo() {
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [removed, setRemoved] = useState<Set<number>>(new Set())

  const visible = MEMBERS.filter(m => !removed.has(m.id))
  const allSelected = visible.length > 0 && selected.size === visible.length

  const toggle = (id: number) =>
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <div className="flex w-[740px] flex-col gap-3">
      {selected.size > 0 && (
        <BulkActions
          selectedCount={selected.size}
          totalCount={visible.length}
          itemLabel="Members"
          onSelectAll={checked => setSelected(checked ? new Set(visible.map(m => m.id)) : new Set())}
          actions={[
            {
              label: 'Remove from the team',
              icon: <RemoveFromTeamIcon size={16} />,
              onClick: () => {
                setRemoved(prev => new Set([...prev, ...selected]))
                setSelected(new Set())
              },
            },
            {
              label: 'Deactivate Member',
              icon: <DeactivateUserIcon size={16} />,
              destructive: true,
              onClick: () => setSelected(new Set()),
            },
          ]}
        />
      )}

      <div className="overflow-hidden rounded-lg border border-grey-200">
        <div className="flex items-center gap-3 border-b border-grey-200 bg-grey-50 px-4 py-2.5">
          <Checkbox
            checked={allSelected}
            indeterminate={selected.size > 0 && !allSelected}
            onChange={checked => setSelected(checked ? new Set(visible.map(m => m.id)) : new Set())}
          />
          <span className="text-body-s font-medium text-grey-900">Name</span>
        </div>
        {visible.map(m => (
          <div
            key={m.id}
            className="flex items-center gap-3 border-b border-grey-200 px-4 py-2.5 last:border-b-0"
          >
            <Checkbox checked={selected.has(m.id)} onChange={() => toggle(m.id)} />
            <div className="flex flex-col">
              <span className="text-body-m font-medium text-grey-1000">{m.name}</span>
              <span className="text-body-s text-grey-900">{m.email}</span>
            </div>
          </div>
        ))}
        {visible.length === 0 && (
          <div className="px-4 py-6 text-center text-body-m text-grey-900">No members left.</div>
        )}
      </div>
    </div>
  )
}

export const InMemberTable: Story = {
  name: 'In a member table',
  render: () => <MemberTableDemo />,
}
