import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { CheckboxField, SelectField, SwitchField, TextAreaField, TextField } from '.';

const schema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters.'),
  bio: z.string().max(120, 'Bio can not exceed 120 characters.').optional(),
  role: z.string().min(1, 'Pick a role.'),
  newsletter: z.boolean(),
  terms: z.boolean().refine(Boolean, 'You must accept the terms.'),
});

type Values = z.infer<typeof schema>;

const meta = { title: 'Form/FormFields', parameters: { layout: 'centered' } } satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every field is a thin wrapper over shadcn + react-hook-form: label, control, description and error in one component. */
export const Playground: Story = {
  render: () => {
    const form = useForm<Values>({
      resolver: zodResolver(schema),
      defaultValues: { username: 'ab', bio: '', role: '', newsletter: false, terms: false },
      mode: 'onChange',
    });

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => undefined)} className='w-96 space-y-4'>
          <TextField control={form.control} name='username' label='Username' placeholder='shadcn' blockSpace />
          <TextAreaField control={form.control} name='bio' label='Bio' description='Optional, up to 120 characters.' />
          <SelectField
            control={form.control}
            name='role'
            label='Role'
            placeholder='Select a role'
            options={[
              { label: 'User', value: 'user' },
              { label: 'Admin', value: 'admin' },
            ]}
          />
          <SwitchField control={form.control} name='newsletter' label='Subscribe to newsletter' />
          <CheckboxField control={form.control} name='terms' label='I accept the terms' />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    );
  },
};
