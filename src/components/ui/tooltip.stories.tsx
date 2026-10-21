import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from './button';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

const meta = { title: 'UI/Tooltip', component: Tooltip } satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant='outline'>Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>Add to library</TooltipContent>
    </Tooltip>
  ),
};
