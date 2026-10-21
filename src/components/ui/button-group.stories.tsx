import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from './button';
import { ButtonGroup, ButtonGroupSeparator } from './button-group';

const meta = { title: 'UI/ButtonGroup', component: ButtonGroup } satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant='outline'>Archive</Button>
      <Button variant='outline'>Report</Button>
      <ButtonGroupSeparator />
      <Button variant='outline'>Snooze</Button>
    </ButtonGroup>
  ),
};
