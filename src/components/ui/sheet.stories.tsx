import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from './button';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './sheet';

const meta = { title: 'UI/Sheet', component: Sheet } satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Right: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline'>Open sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Make changes to your profile here.</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline'>Open left</Button>
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Slides in from the left.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};
