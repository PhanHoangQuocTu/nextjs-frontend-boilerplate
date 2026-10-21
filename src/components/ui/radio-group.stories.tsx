import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Label } from './label';
import { RadioGroup, RadioGroupItem } from './radio-group';

const meta = { title: 'UI/RadioGroup', component: RadioGroup } satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue='comfortable'>
      {['default', 'comfortable', 'compact'].map((value) => (
        <div key={value} className='flex items-center gap-2'>
          <RadioGroupItem value={value} id={value} />
          <Label htmlFor={value}>{value}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
};
