import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Card } from './Card';

const meta = {
  title: 'Design System/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tagVariant: {
      control: 'select',
      options: ['teal', 'yellow', 'green', 'pink', 'red'],
    },
    avatarColor: { control: 'color' },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Redesign onboarding flow',
    description: 'Update the user onboarding experience to match the new brand guidelines.',
    tag: 'Design',
    tagVariant: 'teal',
    assignee: 'AK',
    avatarColor: '#c95bc1',
  },
};

export const YellowTag: Story = {
  args: {
    title: 'Fix auth token expiry bug',
    description: 'Users are being logged out unexpectedly after 30 minutes of inactivity.',
    tag: 'Bug',
    tagVariant: 'yellow',
    assignee: 'SK',
    avatarColor: '#06a192',
  },
};

export const GreenTag: Story = {
  args: {
    title: 'Write unit tests for API layer',
    description: 'Cover all endpoints in the new REST API with integration tests.',
    tag: 'Done',
    tagVariant: 'green',
    assignee: 'MR',
    avatarColor: '#176ada',
  },
};

export const NoTag: Story = {
  args: {
    title: 'Sync with design team',
    description: 'Weekly alignment on component library progress and token updates.',
    assignee: 'JP',
    avatarColor: '#ffa02e',
  },
};
