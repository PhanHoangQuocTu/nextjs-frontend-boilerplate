import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { toast } from 'sonner';

import { Button } from './button';
import { Toaster } from './sonner';

const meta = { title: 'UI/Sonner', component: Toaster } satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Toasts: Story = {
  render: () => (
    <>
      <Toaster richColors />
      <div className='flex gap-2'>
        <Button variant='outline' onClick={() => toast('Event has been created')}>
          Default
        </Button>
        <Button variant='outline' onClick={() => toast.success('Saved successfully')}>
          Success
        </Button>
        <Button variant='outline' onClick={() => toast.error('Something went wrong')}>
          Error
        </Button>
      </div>
    </>
  ),
};
