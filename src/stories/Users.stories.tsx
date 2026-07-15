import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Users, type UsersPerson } from '../components/ui/users'

// ─── Mock data ────────────────────────────────────────────────────────────────

const PEOPLE: UsersPerson[] = [
  { src: 'https://i.pravatar.cc/64?img=47' },
  { src: 'https://i.pravatar.cc/64?img=11' },
  { src: 'https://i.pravatar.cc/64?img=32' },
  { src: 'https://i.pravatar.cc/64?img=15' },
  { src: 'https://i.pravatar.cc/64?img=8' },
  { src: 'https://i.pravatar.cc/64?img=22' },
  { src: 'https://i.pravatar.cc/64?img=5' },
  { src: 'https://i.pravatar.cc/64?img=9' },
]

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Design System/Users',
  component: Users,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    type:       { control: { type: 'radio' }, options: ['group', 'single'] },
    big:        { control: 'boolean' },
    showLabel:  { control: 'boolean' },
    maxVisible: { control: { type: 'number', min: 1, max: 8 } },
    name:       { control: 'text' },
    label:      { control: 'text' },
  },
  args: {
    type: 'group',
    big: true,
    people: PEOPLE,
    maxVisible: 3,
    showLabel: false,
    name: 'Mary Freund',
  },
} satisfies Meta<typeof Users>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {}

// ─── States — Figma reference ─────────────────────────────────────────────────
// Matches the Figma component sheet (node 2186:45175).

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex items-center gap-4">
        <span className="w-40 text-body-s text-grey-900 shrink-0">Group — big</span>
        <Users type="group" big people={PEOPLE} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-40 text-body-s text-grey-900 shrink-0">Group — compact</span>
        <Users type="group" big={false} people={PEOPLE} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-40 text-body-s text-grey-900 shrink-0">Group — with label</span>
        <Users type="group" big people={PEOPLE} showLabel />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-40 text-body-s text-grey-900 shrink-0">Single — big</span>
        <Users type="single" big people={PEOPLE} name="Mary Freund" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-40 text-body-s text-grey-900 shrink-0">Single — compact</span>
        <Users type="single" big={false} people={PEOPLE} name="Mary Freund" />
      </div>
    </div>
  ),
}

// ─── No overflow ──────────────────────────────────────────────────────────────
// Fewer people than maxVisible — no "+N" badge.

export const NoOverflow: Story = {
  args: { people: PEOPLE.slice(0, 2), maxVisible: 3 },
}

// ─── With guests label ────────────────────────────────────────────────────────

export const WithLabel: Story = {
  args: { showLabel: true },
}

// ─── Single user ──────────────────────────────────────────────────────────────

export const SingleUser: Story = {
  args: { type: 'single', name: 'Mary Freund' },
}
