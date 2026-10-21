import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from './context-menu';

const meta = { title: 'UI/ContextMenu', component: ContextMenu } satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className='flex h-36 w-72 items-center justify-center rounded-md border border-dashed text-sm'>
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className='w-52'>
        <ContextMenuItem>
          Back <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>Reload</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Inspect</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
