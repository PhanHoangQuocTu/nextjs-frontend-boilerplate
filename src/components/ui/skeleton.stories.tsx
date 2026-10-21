import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Skeleton } from './skeleton';

const meta = { title: 'UI/Skeleton', component: Skeleton } satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Card: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Skeleton className='size-12 rounded-full' />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-64' />
        <Skeleton className='h-4 w-48' />
      </div>
    </div>
  ),
};
