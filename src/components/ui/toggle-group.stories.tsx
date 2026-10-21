import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react';

import { ToggleGroup, ToggleGroupItem } from './toggle-group';

const meta = { title: 'UI/ToggleGroup', component: ToggleGroup } satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj;

export const Multiple: Story = {
  render: () => (
    <ToggleGroup type='multiple' variant='outline'>
      <ToggleGroupItem value='bold' aria-label='Bold'>
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value='italic' aria-label='Italic'>
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value='underline' aria-label='Underline'>
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Single: Story = {
  render: () => (
    <ToggleGroup type='single' defaultValue='left'>
      {['left', 'center', 'right'].map((value) => (
        <ToggleGroupItem key={value} value={value}>
          {value}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  ),
};
