import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Separator } from './separator';

const meta = { title: 'UI/Separator', component: Separator } satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className='w-64 space-y-3 text-sm'>
      <p>Above</p>
      <Separator />
      <p>Below</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className='flex h-5 items-center gap-3 text-sm'>
      <span>Blog</span>
      <Separator orientation='vertical' />
      <span>Docs</span>
    </div>
  ),
};
