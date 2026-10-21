import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from './combobox';

const FRAMEWORKS = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'];

const meta = { title: 'UI/Combobox', component: Combobox } satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Combobox items={FRAMEWORKS}>
      <ComboboxInput placeholder='Select a framework' className='w-64' />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};
