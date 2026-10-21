import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import { Calendar } from './calendar';

const meta = { title: 'UI/Calendar', component: Calendar } satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date(2026, 9, 21));

    return <Calendar mode='single' selected={date} onSelect={setDate} className='rounded-md border' />;
  },
};
