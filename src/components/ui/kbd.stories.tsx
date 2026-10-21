import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Kbd, KbdGroup } from './kbd';

const meta = { title: 'UI/Kbd', component: Kbd } satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'Esc' } };

export const Combination: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>Ctrl</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
};
