import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { Paginator } from '../components/ui/paginator'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/Paginator',
  component: Paginator,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    currentPage: 1,
    totalPages: 9,
    rowsPerPage: 10,
  },
} satisfies Meta<typeof Paginator>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground — Figma reference ─────────────────────────────────────────────
// Matches the Figma component sheet (node 719:31300): page 1 of 9 → "1 2 …9".

export const Playground: Story = {
  render: args => {
    function PlaygroundPaginator() {
      const [page, setPage] = useState(args.currentPage)
      const [rows, setRows] = useState(args.rowsPerPage)
      return (
        <Paginator
          {...args}
          currentPage={page}
          onPageChange={setPage}
          rowsPerPage={rows}
          onRowsPerPageChange={setRows}
        />
      )
    }
    return <PlaygroundPaginator />
  },
}

// ─── Page ranges ──────────────────────────────────────────────────────────────
// The truncation logic across a few realistic positions.

function StaticPaginator(props: React.ComponentProps<typeof Paginator>) {
  return <Paginator {...props} onPageChange={() => {}} onRowsPerPageChange={() => {}} />
}

export const NearStart: Story = {
  args: { currentPage: 1, totalPages: 9 },
  render: args => <StaticPaginator {...args} />,
}

export const Middle: Story = {
  args: { currentPage: 5, totalPages: 9 },
  render: args => <StaticPaginator {...args} />,
}

export const NearEnd: Story = {
  args: { currentPage: 9, totalPages: 9 },
  render: args => <StaticPaginator {...args} />,
}

export const FewPages: Story = {
  args: { currentPage: 2, totalPages: 3 },
  render: args => <StaticPaginator {...args} />,
}

export const SinglePage: Story = {
  args: { currentPage: 1, totalPages: 1 },
  render: args => <StaticPaginator {...args} />,
}

export const ManyPages: Story = {
  args: { currentPage: 42, totalPages: 100 },
  render: args => <StaticPaginator {...args} />,
}
