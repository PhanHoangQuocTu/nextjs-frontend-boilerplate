import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Textarea } from './textarea';

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  args: { placeholder: 'Type your message here.', className: 'w-72' },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
