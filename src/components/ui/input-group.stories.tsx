import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SearchIcon } from 'lucide-react';

import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from './input-group';

const meta = { title: 'UI/InputGroup', component: InputGroup } satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Search: Story = {
  render: () => (
    <InputGroup className='w-72'>
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder='Search...' />
    </InputGroup>
  ),
};

export const WithText: Story = {
  render: () => (
    <InputGroup className='w-72'>
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder='example.com' />
    </InputGroup>
  ),
};
