import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { StatusBadge } from './StatusBadge';

const meta = {
  title: 'Modules/Health/StatusBadge',
  component: StatusBadge,
  args: { label: 'Operational', ok: true },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Healthy: Story = {};
export const Unhealthy: Story = { args: { label: 'Down', ok: false } };
