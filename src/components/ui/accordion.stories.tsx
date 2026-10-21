import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';

const meta = { title: 'UI/Accordion', component: Accordion } satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Accordion type='single' collapsible defaultValue='item-1' className='w-96'>
      <AccordionItem value='item-1'>
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>Yes. It comes with default styles that match the other components.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
