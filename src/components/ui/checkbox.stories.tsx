import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Checkbox } from './checkbox';

const meta = { title: 'UI/Checkbox', component: Checkbox } satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
