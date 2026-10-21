import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Label } from './label';
import { Switch } from './switch';

const meta = { title: 'UI/Switch', component: Switch } satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className='flex items-center gap-2'>
      <Switch id='airplane' {...args} />
      <Label htmlFor='airplane'>Airplane mode</Label>
    </div>
  ),
};

export const Disabled: Story = { args: { disabled: true } };
