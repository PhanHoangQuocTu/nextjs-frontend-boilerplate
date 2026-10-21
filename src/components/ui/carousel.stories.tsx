import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Card, CardContent } from './card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './carousel';

const meta = { title: 'UI/Carousel', component: Carousel } satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className='w-64'>
      <Carousel>
        <CarouselContent>
          {[1, 2, 3, 4, 5].map((n) => (
            <CarouselItem key={n}>
              <Card>
                <CardContent className='flex aspect-square items-center justify-center text-4xl'>{n}</CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};
