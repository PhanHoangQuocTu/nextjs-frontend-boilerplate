import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Badge } from './badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  args: { children: 'Badge' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      {(['default', 'secondary', 'destructive', 'outline'] as const).map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
};
