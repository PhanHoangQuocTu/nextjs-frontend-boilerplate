import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CalendarIcon, SmileIcon } from 'lucide-react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from './command';

const meta = { title: 'UI/Command', component: Command } satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Command className='w-80 rounded-lg border shadow-md'>
      <CommandInput placeholder='Type a command or search...' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading='Suggestions'>
          <CommandItem>
            <CalendarIcon /> Calendar
          </CommandItem>
          <CommandItem>
            <SmileIcon /> Search emoji
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='Settings'>
          <CommandItem>
            Profile <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};
