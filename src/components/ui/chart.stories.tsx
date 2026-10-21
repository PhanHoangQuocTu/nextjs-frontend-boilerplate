import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from './chart';

const DATA = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
];

const CONFIG = {
  desktop: { label: 'Desktop', color: 'var(--chart-1)' },
  mobile: { label: 'Mobile', color: 'var(--chart-2)' },
} satisfies ChartConfig;

const meta = { title: 'UI/Chart', component: ChartContainer } satisfies Meta<typeof ChartContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BarChartExample: Story = {
  args: { config: CONFIG, children: <></> },
  render: () => (
    <ChartContainer config={CONFIG} className='h-64 w-[32rem]'>
      <BarChart data={DATA} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis dataKey='month' tickLine={false} axisLine={false} tickFormatter={(value: string) => value.slice(0, 3)} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey='desktop' fill='var(--color-desktop)' radius={4} />
        <Bar dataKey='mobile' fill='var(--color-mobile)' radius={4} />
      </BarChart>
    </ChartContainer>
  ),
};
