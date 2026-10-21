import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Input } from './input';

const meta = {
  title: 'UI/Input',
  component: Input,
  args: { placeholder: 'Email', className: 'w-72' },
  argTypes: { type: { control: 'select', options: ['text', 'email', 'password', 'number', 'file'] } },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const Invalid: Story = { args: { 'aria-invalid': true, defaultValue: 'not-an-email' } };
export const File: Story = { args: { type: 'file' } };
