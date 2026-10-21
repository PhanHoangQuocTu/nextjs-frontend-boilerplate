import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

const meta = { title: 'UI/Popover', component: Popover } satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline'>Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className='w-64 space-y-2'>
        <Label htmlFor='width'>Width</Label>
        <Input id='width' defaultValue='100%' />
      </PopoverContent>
    </Popover>
  ),
};
