import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BoldIcon } from 'lucide-react';

import { Toggle } from './toggle';

const meta = {
  title: 'UI/Toggle',
  component: Toggle,
  args: { 'aria-label': 'Toggle bold', children: <BoldIcon /> },
  argTypes: { variant: { control: 'select', options: ['default', 'outline'] } },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Outline: Story = { args: { variant: 'outline' } };
