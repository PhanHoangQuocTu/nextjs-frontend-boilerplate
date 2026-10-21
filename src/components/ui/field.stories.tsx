import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSet } from './field';
import { Input } from './input';

const meta = { title: 'UI/Field', component: Field } satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FieldSet className='w-80'>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor='name'>Name</FieldLabel>
          <Input id='name' placeholder='Evil Rabbit' />
          <FieldDescription>Your public display name.</FieldDescription>
        </Field>
        <Field data-invalid>
          <FieldLabel htmlFor='email'>Email</FieldLabel>
          <Input id='email' aria-invalid defaultValue='nope' />
          <FieldError>Enter a valid email address.</FieldError>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};
