import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { AspectRatio } from './aspect-ratio';

const meta = { title: 'UI/AspectRatio', component: AspectRatio } satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Widescreen: Story = {
  render: () => (
    <div className='w-72'>
      <AspectRatio
        ratio={16 / 9}
        className='flex items-center justify-center rounded-lg bg-muted text-muted-foreground text-sm'
      >
        16 / 9
      </AspectRatio>
    </div>
  ),
};
