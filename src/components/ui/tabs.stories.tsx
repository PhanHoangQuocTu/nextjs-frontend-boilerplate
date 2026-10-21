import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

const meta = { title: 'UI/Tabs', component: Tabs } satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue='account' className='w-96'>
      <TabsList>
        <TabsTrigger value='account'>Account</TabsTrigger>
        <TabsTrigger value='password'>Password</TabsTrigger>
      </TabsList>
      <TabsContent value='account'>Make changes to your account here.</TabsContent>
      <TabsContent value='password'>Change your password here.</TabsContent>
    </Tabs>
  ),
};
