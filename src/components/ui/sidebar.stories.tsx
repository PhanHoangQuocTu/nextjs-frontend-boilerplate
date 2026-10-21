import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { HomeIcon, InboxIcon, SettingsIcon } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from './sidebar';

const ITEMS = [
  { title: 'Home', icon: HomeIcon },
  { title: 'Inbox', icon: InboxIcon },
  { title: 'Settings', icon: SettingsIcon },
];

const meta = { title: 'UI/Sidebar', component: Sidebar, parameters: { layout: 'fullscreen' } } satisfies Meta<
  typeof Sidebar
>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <SidebarProvider className='min-h-[24rem]'>
      <Sidebar collapsible='none' className='border-r'>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarMenu>
              {ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={item.title === 'Home'}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className='flex h-12 items-center gap-2 border-b px-3'>
          <SidebarTrigger />
          <span className='text-sm'>Content</span>
        </header>
      </SidebarInset>
    </SidebarProvider>
  ),
};
