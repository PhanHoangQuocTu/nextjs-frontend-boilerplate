import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Progress } from './progress';

const meta = {
  title: 'UI/Progress',
  component: Progress,
  args: { value: 60, className: 'w-72' },
  argTypes: { value: { control: { type: 'range', min: 0, max: 100 } } },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
