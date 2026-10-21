import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MailIcon } from 'lucide-react';

import { Button } from './button';

const meta = {
  title: 'UI/Button',
  component: Button,
  args: { children: 'Button' },
  render: ({ asChild, children, ...args }) => (
    <Button {...args} asChild={asChild}>
      {asChild ? <a href='#button-example'>{children}</a> : children}
    </Button>
  ),
  argTypes: {
    variant: { control: 'select', options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] },
    size: { control: 'select', options: ['default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'] },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AsChild: Story = { args: { asChild: true } };

export const Variants: Story = {
  render: () => (
    <div className='flex flex-wrap items-center gap-2'>
      {(['default', 'secondary', 'outline', 'ghost', 'link', 'destructive'] as const).map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='flex flex-wrap items-center gap-2'>
      <Button size='xs'>xs</Button>
      <Button size='sm'>sm</Button>
      <Button size='default'>default</Button>
      <Button size='lg'>lg</Button>
      <Button size='icon' aria-label='Mail'>
        <MailIcon />
      </Button>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Button>
      <MailIcon /> Login with email
    </Button>
  ),
};

export const Disabled: Story = { args: { disabled: true } };
