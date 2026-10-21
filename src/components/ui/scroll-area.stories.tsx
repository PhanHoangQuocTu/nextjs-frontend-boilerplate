import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ScrollArea } from './scroll-area';
import { Separator } from './separator';

const meta = { title: 'UI/ScrollArea', component: ScrollArea } satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScrollArea className='h-60 w-56 rounded-md border'>
      <div className='p-4 text-sm'>
        {Array.from({ length: 30 }, (_, i) => (
          <div key={i}>
            <div>Item {i + 1}</div>
            <Separator className='my-2' />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
