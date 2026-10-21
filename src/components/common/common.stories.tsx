import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from '@/components/ui/button';
import { CopyButton, ErrorState, PageHeader } from '.';

const meta = { title: 'Common/Components', parameters: { layout: 'padded' } } satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Header: Story = {
  render: () => (
    <PageHeader
      title='System health'
      description='Live status of this application.'
      actions={<Button size='sm'>Refresh</Button>}
    />
  ),
};

export const ErrorStateExample: Story = {
  render: () => (
    <div className='max-w-lg'>
      <ErrorState
        title='Could not load data'
        description='The server returned an unexpected response.'
        action={
          <Button size='sm' variant='outline'>
            Retry
          </Button>
        }
      />
    </div>
  ),
};

export const Copy: Story = {
  render: () => (
    <div className='flex items-center gap-1 text-sm'>
      <code>pnpm dlx shadcn@latest add button</code>
      <CopyButton value='pnpm dlx shadcn@latest add button' />
    </div>
  ),
};
