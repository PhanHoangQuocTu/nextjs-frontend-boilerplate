import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from './button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card';

const meta = { title: 'UI/HoverCard', component: HoverCard } satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant='link'>@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className='w-64 text-sm'>The React framework for the web.</HoverCardContent>
    </HoverCard>
  ),
};
