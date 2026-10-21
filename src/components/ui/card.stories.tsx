import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from './button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';

const meta = { title: 'UI/Card', component: Card } satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className='w-96'>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
        <CardAction>
          <Button variant='link' size='sm'>
            Mark all read
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>Card content goes here.</CardContent>
      <CardFooter>
        <Button className='w-full'>Open inbox</Button>
      </CardFooter>
    </Card>
  ),
};
