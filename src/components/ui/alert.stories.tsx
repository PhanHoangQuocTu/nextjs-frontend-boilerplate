import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AlertCircleIcon, InfoIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from './alert';

const meta = {
  title: 'UI/Alert',
  component: Alert,
  decorators: [
    (Story) => (
      <div className='w-[28rem]'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Alert>
      <InfoIcon />
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>You can add components to your app with the shadcn CLI.</AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Alert variant='destructive'>
      <AlertCircleIcon />
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription>Your session has expired. Please sign in again.</AlertDescription>
    </Alert>
  ),
};
