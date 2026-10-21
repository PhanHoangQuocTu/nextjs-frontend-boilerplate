import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { FadeIn, HStack, Show, VStack } from '.';

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className='rounded-md border bg-muted px-3 py-2 text-sm'>{children}</div>
);

const meta = { title: 'Utilities/Layout', parameters: { layout: 'padded' } } satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  render: () => (
    <VStack spacing={8}>
      <Box>One</Box>
      <Box>Two</Box>
      <Box>Three</Box>
    </VStack>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <HStack spacing={8} justify='between'>
      <Box>Left</Box>
      <Box>Middle</Box>
      <Box>Right</Box>
    </HStack>
  ),
};

export const Conditional: Story = {
  render: () => (
    <VStack spacing={8}>
      <Show when>
        <Box>Visible when `when` is true</Box>
      </Show>
      <Show when={false}>
        <Box>Never rendered</Box>
      </Show>
    </VStack>
  ),
};

export const FadeInExample: Story = {
  render: () => (
    <FadeIn>
      <Box>I fade in and slide up on mount</Box>
    </FadeIn>
  ),
};
