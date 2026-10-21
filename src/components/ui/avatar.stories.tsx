import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from './avatar';

const meta = { title: 'UI/Avatar', component: Avatar } satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src='https://github.com/shadcn.png' alt='shadcn' />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src='/broken.png' alt='' />
      <AvatarFallback>FB</AvatarFallback>
    </Avatar>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      {['AB', 'CD', 'EF'].map((initials) => (
        <Avatar key={initials}>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      ))}
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  ),
};
