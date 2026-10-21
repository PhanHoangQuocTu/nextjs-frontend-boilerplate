import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './select';

const meta = { title: 'UI/Select', component: Select } satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className='w-56'>
        <SelectValue placeholder='Select a fruit' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          {['Apple', 'Banana', 'Blueberry'].map((fruit) => (
            <SelectItem key={fruit} value={fruit.toLowerCase()}>
              {fruit}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};
