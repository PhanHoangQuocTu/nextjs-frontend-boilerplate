import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from './button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible';

const meta = { title: 'UI/Collapsible', component: Collapsible } satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Collapsible className='w-72 space-y-2'>
      <CollapsibleTrigger asChild>
        <Button variant='outline'>Toggle details</Button>
      </CollapsibleTrigger>
      <CollapsibleContent className='rounded-md border p-3 text-sm'>Hidden content revealed.</CollapsibleContent>
    </Collapsible>
  ),
};
