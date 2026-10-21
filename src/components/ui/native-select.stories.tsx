import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { NativeSelect, NativeSelectOption } from './native-select';

const meta = { title: 'UI/NativeSelect', component: NativeSelect } satisfies Meta<typeof NativeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <NativeSelect className='w-56'>
      <NativeSelectOption value=''>Select status</NativeSelectOption>
      <NativeSelectOption value='todo'>Todo</NativeSelectOption>
      <NativeSelectOption value='done'>Done</NativeSelectOption>
    </NativeSelect>
  ),
};
