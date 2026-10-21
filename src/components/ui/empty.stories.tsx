import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { InboxIcon } from 'lucide-react';

import { Button } from './button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from './empty';

const meta = { title: 'UI/Empty', component: Empty } satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <InboxIcon />
        </EmptyMedia>
        <EmptyTitle>No messages</EmptyTitle>
        <EmptyDescription>New messages will show up here.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size='sm'>Compose</Button>
      </EmptyContent>
    </Empty>
  ),
};
