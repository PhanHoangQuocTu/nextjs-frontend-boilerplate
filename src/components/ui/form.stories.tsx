import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from './button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './form';
import { Input } from './input';

const schema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters.'),
});

const meta = { title: 'UI/Form', component: Form } satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj;

export const WithValidation: Story = {
  render: () => {
    const form = useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
      defaultValues: { username: 'a' },
      mode: 'onChange',
    });

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => undefined)} className='w-72 space-y-4'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='shadcn' {...field} />
                </FormControl>
                <FormDescription>Your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    );
  },
};
