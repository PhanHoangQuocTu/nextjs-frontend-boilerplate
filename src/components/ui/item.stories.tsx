import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ShieldCheckIcon } from 'lucide-react';

import { Button } from './button';
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from './item';

const meta = { title: 'UI/Item', component: Item } satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Item variant='outline' className='w-96'>
      <ItemMedia variant='icon'>
        <ShieldCheckIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Security</ItemTitle>
        <ItemDescription>Two-factor authentication is on.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size='sm' variant='outline'>
          Manage
        </Button>
      </ItemActions>
    </Item>
  ),
};
