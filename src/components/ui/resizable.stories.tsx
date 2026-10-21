import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './resizable';

const meta = { title: 'UI/Resizable', component: ResizablePanelGroup } satisfies Meta<typeof ResizablePanelGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <ResizablePanelGroup orientation='horizontal' className='h-40 w-96 rounded-lg border'>
      <ResizablePanel defaultSize={50}>
        <div className='flex h-full items-center justify-center'>One</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className='flex h-full items-center justify-center'>Two</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};
