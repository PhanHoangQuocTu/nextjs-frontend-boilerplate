import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './navigation-menu';

const meta = { title: 'UI/NavigationMenu', component: NavigationMenu, parameters: { layout: 'padded' } } satisfies Meta<
  typeof NavigationMenu
>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid w-72 gap-2 p-2'>
              <li>
                <NavigationMenuLink href='#'>Introduction</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href='#'>Installation</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href='#' className={navigationMenuTriggerStyle()}>
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};
